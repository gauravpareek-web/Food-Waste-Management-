import { Router, Request, Response } from 'express';
import { FOOD_SAFETY_RULES, validateAndCalculateExpiry, FoodCategory, StorageCondition } from '../rules/foodSafetyRules.js';
import { db } from '../db/database.js';

export const safetyRouter = Router();

/**
 * GET /api/safety/rules - Return the recognized food safety rules matrix
 */
safetyRouter.get('/rules', (_req: Request, res: Response) => {
  res.json({
    success: true,
    rules: FOOD_SAFETY_RULES,
  });
});

/**
 * POST /api/safety/validate-preview - Live pre-validation & expiry calculator preview
 */
safetyRouter.post('/validate-preview', (req: Request, res: Response) => {
  try {
    const {
      foodCategory,
      preparedAt,
      storageCondition,
      hygieneConfirmed,
      contaminationReported,
      hasFoodImage,
      donorDeclaration,
    } = req.body;

    const result = validateAndCalculateExpiry({
      foodCategory: foodCategory as FoodCategory,
      preparedAt,
      storageCondition: storageCondition as StorageCondition,
      hygieneConfirmed: Boolean(hygieneConfirmed),
      contaminationReported: Boolean(contaminationReported),
      hasFoodImage: Boolean(hasFoodImage),
      donorDeclaration: Boolean(donorDeclaration),
    });

    res.json({
      success: true,
      data: {
        isValid: result.isValid,
        safetyStatus: result.safetyStatus,
        expiryAt: result.expiryAtDate.toISOString(),
        shelfLifeHours: result.shelfLifeHours,
        hoursRemaining: result.hoursRemaining,
        percentElapsed: result.percentElapsed,
        errors: result.errors,
        reviewNotes: result.reviewNotes,
        guideline: result.ruleApplied.guidelineNote,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/safety/audit-logs - Global safety audit trail
 */
safetyRouter.get('/audit-logs', (_req: Request, res: Response) => {
  try {
    const logs = db.prepare(`
      SELECT l.*, d.title as donation_title, d.donor_name
      FROM safety_audit_logs l
      LEFT JOIN food_donations d ON l.donation_id = d.id
      ORDER BY l.timestamp DESC
      LIMIT 100
    `).all();

    res.json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
