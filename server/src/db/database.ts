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
  
  // Sample 1: Rajma Masala & Steamed Jeera Basmati Rice
  const prep1 = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
  const exp1 = new Date(prep1.getTime() + 6 * 60 * 60 * 1000); // 6 hr shelf life

  insertDonation.run(
    'DON-101',
    'USR-DON-01',
    'The Green Table Restaurant',
    '+1 (561) 555-0192',
    '125 Palm Street, West Palm Beach, FL',
    'Rajma Masala & Steamed Jeera Basmati Rice',
    'Curry',
    'Slow-cooked authentic Punjabi rajma masala with aromatic jeera basmati rice, warm phulkas, and fresh salad packed in insulated thermal trays.',
    '40 kg',
    'Feeds ~50 people',
    JSON.stringify(['Punjabi Rajma Masala (18 L)', 'Steamed Jeera Basmati Rice (25 kg)', 'Whole Wheat Phulkas (80 pcs)', 'Pickled Spiced Salad (5 kg)']),
    prep1.toISOString(),
    'Hot Holding',
    '68.5°C verified (>65°C)',
    1,
    0,
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    1,
    'None',
    JSON.stringify(['100% Vegetarian', 'High Protein', 'Gluten-Free Option']),
    'Moisture-controlled insulated stainless thermal containers',
    '10:00 AM - 12:00 PM',
    exp1.toISOString(),
    6.0,
    'verified',
    'Verified by Chef Michael. Continuous hot-holding maintained at 68.5°C. Safe for human redistribution.',
    'available',
    null,
    '2.4 km',
    prep1.toISOString(),
    now.toISOString()
  );

  // Sample 2: Kesar Rasmalai & Gulab Jamun Sweet Trays
  const prep2 = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const exp2 = new Date(prep2.getTime() + 24 * 60 * 60 * 1000);

  insertDonation.run(
    'DON-102',
    'USR-DON-01',
    'Sunrise Sweets & Banquet',
    '+1 (561) 555-0178',
    '88 Clematis St, West Palm Beach, FL',
    'Kesar Rasmalai & Gulab Jamun Sweet Trays',
    'Dairy',
    'Freshly prepared saffron-infused cottage cheese dumplings in rich pistachio rabri alongside soft warm gulab jamuns, packed in hygienic refrigerated sweet crates.',
    '100 portions',
    'Feeds ~60-70 people',
    JSON.stringify(['Kesar Pistachio Rasmalai (60 portions)', 'Warm Gulab Jamun Trays (40 portions)', 'Cardamom Syrup Drizzle']),
    prep2.toISOString(),
    'Refrigerated',
    '3.0°C verified (2-4°C)',
    1,
    0,
    'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80',
    1,
    'Dairy (Milk, Pistachio & Almond)',
    JSON.stringify(['Vegetarian', 'Zero Preservatives', 'Cold Chain Certified']),
    'Sealed food-grade sweet containers (Cold Chain)',
    '01:30 PM - 03:00 PM',
    exp2.toISOString(),
    24.0,
    'verified',
    'Cold chain maintained at 3.0°C. Pure dairy sweets verified untouched banquet surplus.',
    'available',
    null,
    '3.1 km',
    prep2.toISOString(),
    now.toISOString()
  );

  // Sample 3: Dal Makhani & Whole Wheat Naan Meal Baskets
  const prep3 = new Date(now.getTime() - 4 * 60 * 60 * 1000);
  const exp3 = new Date(prep3.getTime() + 6 * 60 * 60 * 1000);

  insertDonation.run(
    'DON-103',
    'USR-DON-02',
    'Royal Heritage Kitchen',
    '+1 (561) 555-0143',
    '310 Royal Poinciana Way, Palm Beach, FL',
    'Dal Makhani & Whole Wheat Naan Meal Baskets',
    'Curry',
    'Creamy slow-simmered black lentil dal makhani with clay-oven baked tandoori naans and fresh jeera pulao, untouched banquet surplus kept hot.',
    '45 portions',
    'Feeds ~50-60 people',
    JSON.stringify(['Dal Makhani Slow Simmered (20 L)', 'Tandoori Whole Wheat Naan (90 pcs)', 'Jeera Green Pea Pulao (20 kg)', 'Tangy Mint Chutney (4 L)']),
    prep3.toISOString(),
    'Hot Holding',
    '69.0°C verified (>65°C)',
    1,
    0,
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    1,
    'Dairy & Gluten',
    JSON.stringify(['Vegetarian', 'Fresh Cooked', 'High Energy']),
    'Thermal insulated transport cambros',
    '04:00 PM - 06:00 PM',
    exp3.toISOString(),
    6.0,
    'verified',
    'Verified hot holding at 69.0°C. Compliant with safe redistribution protocols.',
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
