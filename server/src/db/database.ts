import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DB_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'zerowaste.sqlite');
export const db = new DatabaseSync(DB_PATH);

// Run migrations on startup
export function initDatabase() {
  // Pragmas for performance and foreign keys
  db.exec('PRAGMA foreign_keys = ON;');

  // Migration 1: Food Donations Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS food_donations (
      id TEXT PRIMARY KEY,
      donor_id TEXT NOT NULL,
      donor_name TEXT NOT NULL,
      donor_phone TEXT,
      donor_address TEXT,
      title TEXT NOT NULL,
      food_category TEXT NOT NULL,
      description TEXT,
      quantity TEXT NOT NULL,
      servings TEXT,
      items_list TEXT,
      prepared_at TEXT NOT NULL,
      storage_condition TEXT NOT NULL,
      storage_temp TEXT,
      hygiene_confirmed INTEGER NOT NULL DEFAULT 0,
      contamination_reported INTEGER NOT NULL DEFAULT 0,
      food_image TEXT NOT NULL,
      donor_declaration INTEGER NOT NULL DEFAULT 0,
      allergens TEXT,
      dietary TEXT,
      packaging TEXT,
      pickup_window TEXT,
      expiry_at TEXT NOT NULL,
      shelf_life_hours REAL NOT NULL,
      safety_status TEXT NOT NULL DEFAULT 'verified',
      safety_review_notes TEXT,
      claim_status TEXT NOT NULL DEFAULT 'available',
      claimed_by TEXT,
      distance TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Migration 2: Safety Audit Logs Table (proper relationship)
  db.exec(`
    CREATE TABLE IF NOT EXISTS safety_audit_logs (
      id TEXT PRIMARY KEY,
      donation_id TEXT NOT NULL,
      action TEXT NOT NULL,
      actor_role TEXT NOT NULL,
      actor_name TEXT NOT NULL,
      notes TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (donation_id) REFERENCES food_donations(id) ON DELETE CASCADE
    );
  `);

  // Seed sample initial donations if table is empty
  const countRow = db.prepare('SELECT COUNT(*) as count FROM food_donations').get() as { count: number };
  if (countRow.count === 0) {
    seedInitialDonations();
  }
}

function seedInitialDonations() {
  const insertDonation = db.prepare(`
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

  const now = new Date();
  
  // Sample 1: Cooked Meals (Rice + Curry)
  const prep1 = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
  const exp1 = new Date(prep1.getTime() + 6 * 60 * 60 * 1000); // 6 hr shelf life

  insertDonation.run(
    'DON-101',
    'USR-DON-01',
    'The Green Table Restaurant',
    '+1 (561) 555-0192',
    '125 Palm Street, West Palm Beach, FL',
    'Cooked Meals (Paneer Curry & Basmati Rice)',
    'Curry',
    'Freshly prepared hot banquet lunch, untouched in heated steam pans, strictly unserved surplus meeting FSSAI surplus-food safety standards.',
    '35 portions',
    'Feeds ~35 adults',
    JSON.stringify(['Shahi Paneer Curry (15 L)', 'Steamed Jeera Basmati Rice (20 kg)', 'Whole Wheat Rotis (70 pcs)', 'Fresh Cucumber Salad']),
    prep1.toISOString(),
    'Hot Holding',
    '68°C verified (>65°C)',
    1,
    0,
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    1,
    'Dairy (Paneer & Butter)',
    JSON.stringify(['Vegetarian', 'Nut-Free', 'Fresh Cooked']),
    'Sealed food-grade stainless thermal containers',
    '01:30 PM - 03:00 PM',
    exp1.toISOString(),
    6.0,
    'verified',
    'Verified by Chef Michael. Continuous hot-holding maintained at 68°C. Safe for human redistribution.',
    'available',
    null,
    '2.4 km',
    prep1.toISOString(),
    now.toISOString()
  );

  // Sample 2: Fresh Vegetables Box
  const prep2 = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const exp2 = new Date(prep2.getTime() + 48 * 60 * 60 * 1000);

  insertDonation.run(
    'DON-102',
    'USR-DON-01',
    'The Green Table Restaurant',
    '+1 (561) 555-0192',
    '125 Palm Street, West Palm Beach, FL',
    'Fresh Farm Vegetable Box',
    'Vegetables',
    'Assorted farm-fresh organic vegetables packed directly from kitchen stock, pre-washed, unchopped, and temperature-controlled.',
    '15 kg',
    'Feeds ~45 people',
    JSON.stringify(['Organic Spinach (4 kg)', 'Carrots & Cucumbers (5 kg)', 'Bell Peppers (3 kg)', 'Fresh Tomatoes (3 kg)']),
    prep2.toISOString(),
    'Refrigerated',
    '3.2°C logged (2-4°C)',
    1,
    0,
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    1,
    'None',
    JSON.stringify(['100% Vegetarian', 'Raw Fresh Produce', 'Gluten-Free']),
    'Moisture-controlled ventilated food crates',
    '10:00 AM - 12:00 PM',
    exp2.toISOString(),
    48.0,
    'verified',
    'Cold chain maintained. Raw produce inspected for zero spoilage.',
    'available',
    null,
    '4.2 km',
    prep2.toISOString(),
    now.toISOString()
  );

  // Sample 3: Artisan Bakery Loaves
  const prep3 = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  const exp3 = new Date(prep3.getTime() + 36 * 60 * 60 * 1000);

  insertDonation.run(
    'DON-103',
    'USR-DON-02',
    'Palm Beach Bakery',
    '+1 (561) 555-0143',
    '310 Royal Poinciana Way, Palm Beach, FL',
    'Artisan Bakery & Morning Breads',
    'Bakery',
    'Same-day baked artisan sourdough loaves, baguettes, and dinner rolls from morning bake cycle, properly wrapped in parchment bags.',
    '10 boxes',
    'Feeds ~50-60 people',
    JSON.stringify(['Sourdough Loaves (6)', 'Whole Grain Baguettes (8)', 'Multigrain Dinner Rolls (40 pcs)']),
    prep3.toISOString(),
    'Room Temperature',
    '22°C ambient',
    1,
    0,
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    1,
    'Gluten (Wheat)',
    JSON.stringify(['Vegetarian', 'Eggless', 'No Preservatives']),
    'Food-safe kraft paper bags & sealed cartons',
    '04:00 PM - 06:00 PM',
    exp3.toISOString(),
    36.0,
    'verified',
    'Dry room temperature holding. Low moisture, no bacterial risk.',
    'available',
    null,
    '4.0 km',
    prep3.toISOString(),
    now.toISOString()
  );

  // Initial Safety Audit Logs
  const insertLog = db.prepare(`
    INSERT INTO safety_audit_logs (id, donation_id, action, actor_role, actor_name, notes, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertLog.run(
    'LOG-001',
    'DON-101',
    'CHECKLIST_VERIFIED',
    'donor',
    'Chef Michael',
    'Food safety checklist completed. Storage temperature verified >65°C. Safe surplus confirmed.',
    prep1.toISOString()
  );

  insertLog.run(
    'LOG-002',
    'DON-102',
    'CHECKLIST_VERIFIED',
    'donor',
    'Chef Michael',
    'Cold chain verified 3.2°C. Zero contamination reported.',
    prep2.toISOString()
  );

  insertLog.run(
    'LOG-003',
    'DON-103',
    'CHECKLIST_VERIFIED',
    'donor',
    'Master Baker David',
    'Bake quality and hygiene verified. Wrapped in food-grade kraft bags.',
    prep3.toISOString()
  );
}
