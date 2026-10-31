import { Router, Request, Response } from 'express';
import { db } from '../db/database.js';
import { validateAndCalculateExpiry, FoodCategory, StorageCondition } from '../rules/foodSafetyRules.js';
import { foodImageUpload } from '../middleware/upload.js';

export const donationRouter = Router();

// Helper to recalculate real-time expiry stats on read
function formatDonationWithLiveExpiry(row: any) {
  const now = new Date();
  const prepDate = new Date(row.prepared_at);
  const expDate = new Date(row.expiry_at);
  
  const msRemaining = expDate.getTime() - now.getTime();
  const hoursRemaining = Math.max(0, parseFloat((msRemaining / (1000 * 60 * 60)).toFixed(1)));
  
  const totalMs = expDate.getTime() - prepDate.getTime();
  const elapsedMs = now.getTime() - prepDate.getTime();
  const percentElapsed = Math.min(100, Math.max(0, Math.round((elapsedMs / totalMs) * 100)));

  // Format active duration string
  const activeHours = Math.floor(elapsedMs / (1000 * 60 * 60));
  const activeMins = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
  const activeDuration = `${activeHours}h ${activeMins}m active`;

  // Auto-expire check
  let currentSafetyStatus = row.safety_status;
  if (currentSafetyStatus === 'verified' && hoursRemaining <= 0) {
    currentSafetyStatus = 'expired';
    try {
      db.prepare('UPDATE food_donations SET safety_status = ?, updated_at = ? WHERE id = ?').run(
        'expired',
        now.toISOString(),
        row.id
      );
    } catch (err) {
      // ignore concurrent update
    }
  }

  let parsedItems = [];
  try {
    parsedItems = row.items_list ? JSON.parse(row.items_list) : [];
  } catch (e) {
    parsedItems = [row.title];
  }

  let parsedDietary = [];
  try {
    parsedDietary = row.dietary ? JSON.parse(row.dietary) : [];
  } catch (e) {
    parsedDietary = [];
  }

  return {
    ...row,
    hygiene_confirmed: Boolean(row.hygiene_confirmed),
    contamination_reported: Boolean(row.contamination_reported),
    donor_declaration: Boolean(row.donor_declaration),
    items_list: parsedItems,
    dietary: parsedDietary,
    hours_remaining: hoursRemaining,
    percent_elapsed: percentElapsed,
    active_duration: activeDuration,
    safety_status: currentSafetyStatus,
  };
}

/**
 * GET /api/donations - List all food donations with live expiry stats
 */
donationRouter.get('/', (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;
    let query = 'SELECT * FROM food_donations WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'All') {
      query += ' AND food_category = ?';
      params.push(category);
    }
    if (status) {
      query += ' AND safety_status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';
    const rows = db.prepare(query).all(...params);
    const enriched = rows.map(formatDonationWithLiveExpiry);

    res.json({
      success: true,
      count: enriched.length,
      data: enriched,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/donations/:id - Get a single donation with its audit logs
 */
donationRouter.get('/:id', (req: Request, res: Response): any => {
  try {
    const id = String(req.params.id);
    const row = db.prepare('SELECT * FROM food_donations WHERE id = ?').get(id);
    if (!row) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    const auditLogs = db.prepare(
      'SELECT * FROM safety_audit_logs WHERE donation_id = ? ORDER BY timestamp DESC'
    ).all(id);

    res.json({
      success: true,
      data: {
        ...formatDonationWithLiveExpiry(row),
        audit_logs: auditLogs,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/donations - Create a new food donation with mandatory safety checklist
 */
donationRouter.post('/', foodImageUpload.single('food_image_file'), (req: Request, res: Response): any => {
  try {
    const {
      donor_id = 'USR-DON-01',
      donor_name = 'The Green Table Restaurant',
      donor_phone = '+1 (561) 555-0192',
      donor_address = '125 Palm Street, West Palm Beach, FL',
      title,
      food_category,
      description,
      quantity,
      servings,
      items_list,
      prepared_at,
      storage_condition,
      storage_temp,
      hygiene_confirmed,
      contamination_reported,
      donor_declaration,
      image_url,
      allergens,
      dietary,
      packaging,
      pickup_window,
    } = req.body;

    // Determine final image path
    let foodImage = image_url;
    if (req.file) {
      foodImage = `/uploads/${req.file.filename}`;
    }

    const isHygieneConfirmed = hygiene_confirmed === 'true' || hygiene_confirmed === true || hygiene_confirmed === 1;
    const isContaminationReported = contamination_reported === 'true' || contamination_reported === true || contamination_reported === 1;
    const isDonorDeclaration = donor_declaration === 'true' || donor_declaration === true || donor_declaration === 1;

    // 1. Validate using our strict food safety rules engine
    const safetyCheck = validateAndCalculateExpiry({
      foodCategory: food_category as FoodCategory,
      preparedAt: prepared_at,
      storageCondition: storage_condition as StorageCondition,
      hygieneConfirmed: isHygieneConfirmed,
      contaminationReported: isContaminationReported,
      hasFoodImage: Boolean(foodImage && foodImage.trim().length > 0),
      donorDeclaration: isDonorDeclaration,
    });

    if (!safetyCheck.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Food Safety Validation Failed',
        errors: safetyCheck.errors,
        safety_status: safetyCheck.safetyStatus,
        review_notes: safetyCheck.reviewNotes,
      });
    }

    const id = `DON-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();

    let itemsJson = '[]';
    if (typeof items_list === 'string') {
      try {
        itemsJson = JSON.stringify(JSON.parse(items_list));
      } catch (e) {
        itemsJson = JSON.stringify(items_list.split(',').map((s: string) => s.trim()).filter(Boolean));
      }
    } else if (Array.isArray(items_list)) {
      itemsJson = JSON.stringify(items_list);
    }

    let dietaryJson = '[]';
    if (typeof dietary === 'string') {
      try {
        dietaryJson = JSON.stringify(JSON.parse(dietary));
      } catch (e) {
        dietaryJson = JSON.stringify(dietary.split(',').map((s: string) => s.trim()).filter(Boolean));
      }
    } else if (Array.isArray(dietary)) {
      dietaryJson = JSON.stringify(dietary);
    }

    // Insert into database
    const insert = db.prepare(`
      INSERT INTO food_donations (
        id, donor_id, donor_name, donor_phone, donor_address,
        title, food_category, description, quantity, servings, items_list,
        prepared_at, storage_condition, storage_temp, hygiene_confirmed,
        contamination_reported, food_image, donor_declaration, allergens,
        dietary, packaging, pickup_window, expiry_at, shelf_life_hours,
        safety_status, safety_review_notes, claim_status, claimed_by, distance,
        created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?
      )
    `);

    const initialReviewNotes = safetyCheck.reviewNotes.join('; ');

    insert.run(
      id,
      donor_id,
      donor_name,
      donor_phone,
      donor_address,
      title || `${food_category} Surplus Batch`,
      food_category,
      description || 'Fresh surplus food prepared under commercial hygiene protocols.',
      quantity || '10 kg',
      servings || `Feeds ~${quantity || '25'} portions`,
      itemsJson,
      safetyCheck.preparedAtDate.toISOString(),
      storage_condition,
      storage_temp || (storage_condition === 'Hot Holding' ? '>65°C maintained' : storage_condition === 'Refrigerated' ? '2-4°C chilled' : 'Ambient room temp'),
      isHygieneConfirmed ? 1 : 0,
      isContaminationReported ? 1 : 0,
      foodImage,
      isDonorDeclaration ? 1 : 0,
      allergens || 'None reported',
      dietaryJson,
      packaging || 'Food-Grade Sealed Containers',
      pickup_window || 'Next 2 Hours',
      safetyCheck.expiryAtDate.toISOString(),
      safetyCheck.shelfLifeHours,
      safetyCheck.safetyStatus,
      initialReviewNotes,
      'available',
      null,
      '2.5 km',
      now,
      now
    );

    // Audit Log Entry
    const logId = `LOG-${Date.now().toString().slice(-6)}`;
    db.prepare(`
      INSERT INTO safety_audit_logs (id, donation_id, action, actor_role, actor_name, notes, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      logId,
      id,
      'DONATION_CREATED_SAFETY_VERIFIED',
      'donor',
      donor_name,
      initialReviewNotes,
      now
    );

    const savedRow = db.prepare('SELECT * FROM food_donations WHERE id = ?').get(id);

    res.status(201).json({
      success: true,
      message: 'Donation successfully published and passed safety checklist verification.',
      data: formatDonationWithLiveExpiry(savedRow),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/donations/:id/safety-review
 * Allows an authorized NGO coordinator or inspector to review or reject a donation on safety grounds
 */
donationRouter.post('/:id/safety-review', (req: Request, res: Response): any => {
  try {
    const id = String(req.params.id);
    const { action, reviewer_name, reviewer_role, notes } = req.body;
    const normalizedAction = String(action || '').toUpperCase();
    const donation = db.prepare('SELECT * FROM food_donations WHERE id = ?').get(id) as any;

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (!['APPROVE', 'REJECT', 'FLAG_REQUIRES_INSPECTION'].includes(normalizedAction)) {
      return res.status(400).json({ success: false, message: 'Invalid action. Allowed: APPROVE, REJECT, FLAG_REQUIRES_INSPECTION' });
    }

    if (!notes || notes.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Safety review notes are mandatory when modifying safety status.' });
    }

    let newStatus = donation.safety_status;
    let newClaimStatus = donation.claim_status;

    if (normalizedAction === 'REJECT') {
      newStatus = 'rejected';
      newClaimStatus = 'cancelled';
    } else if (normalizedAction === 'APPROVE') {
      newStatus = 'verified';
    } else if (normalizedAction === 'FLAG_REQUIRES_INSPECTION') {
      newStatus = 'pending_review';
    }

    const now = new Date().toISOString();
    const updatedNotes = donation.safety_review_notes ? `${donation.safety_review_notes} | [${now}] ${reviewer_role} ${reviewer_name}: ${notes}` : `[${now}] ${reviewer_role} ${reviewer_name}: ${notes}`;

    db.prepare(`
      UPDATE food_donations
      SET safety_status = ?, claim_status = ?, safety_review_notes = ?, updated_at = ?
      WHERE id = ?
    `).run(newStatus, newClaimStatus, updatedNotes, now, id);

    // Record audit log
    const logId = `LOG-${Date.now().toString().slice(-6)}`;
    db.prepare(`
      INSERT INTO safety_audit_logs (id, donation_id, action, actor_role, actor_name, notes, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      logId,
      id,
      `SAFETY_REVIEW_${normalizedAction}`,
      reviewer_role || 'ngo_coordinator',
      reviewer_name || 'Verified Inspector',
      notes,
      now
    );

    const updatedRow = db.prepare('SELECT * FROM food_donations WHERE id = ?').get(id);

    res.json({
      success: true,
      message: `Safety status updated to ${newStatus}.`,
      data: formatDonationWithLiveExpiry(updatedRow),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/donations/:id/claim
 * Allows an authorized NGO to claim an active surplus donation
 */
donationRouter.post('/:id/claim', (req: Request, res: Response): any => {
  try {
    const id = String(req.params.id);
    const { ngo_name, claimed_by, beneficiary_facility, pickup_notes, notes } = req.body;
    const finalClaimedBy = claimed_by || ngo_name || 'Hope Foundation';
    const donation = db.prepare('SELECT * FROM food_donations WHERE id = ?').get(id) as any;

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (donation.safety_status === 'rejected' || donation.safety_status === 'expired') {
      return res.status(400).json({
        success: false,
        message: `Cannot claim donation: It has safety status '${donation.safety_status}'.`,
      });
    }

    if (donation.claim_status !== 'available') {
      return res.status(400).json({
        success: false,
        message: `Donation is already in status '${donation.claim_status}'.`,
      });
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE food_donations
      SET claim_status = 'claimed', claimed_by = ?, updated_at = ?
      WHERE id = ?
    `).run(finalClaimedBy, now, id);

    // Audit Log
    const logId = `LOG-${Date.now().toString().slice(-6)}`;
    db.prepare(`
      INSERT INTO safety_audit_logs (id, donation_id, action, actor_role, actor_name, notes, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      logId,
      id,
      'DONATION_CLAIMED',
      'ngo',
      finalClaimedBy,
      `Claimed for ${beneficiary_facility || 'Community Center'}. Notes: ${pickup_notes || notes || 'None'}`,
      now
    );

    const updatedRow = db.prepare('SELECT * FROM food_donations WHERE id = ?').get(id);

    res.json({
      success: true,
      message: 'Donation claimed successfully.',
      data: formatDonationWithLiveExpiry(updatedRow),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
