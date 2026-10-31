import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';
import { db } from '../src/db/database.js';

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('API 1: GET /api/donations returns seeded verified donations', async () => {
  const res = await fetch(`${baseUrl}/api/donations`);
  const data = await res.json();

  assert.equal(res.status, 200);
  assert.equal(data.success, true);
  assert.ok(data.data.length >= 3);
  assert.ok(data.data[0].safety_status);
  assert.ok(data.data[0].expiry_at);
});

test('API 2: POST /api/donations rejects future preparation time', async () => {
  const futurePrep = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString();

  const res = await fetch(`${baseUrl}/api/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Future Hot Rice',
      food_category: 'Rice',
      quantity: '10 kg',
      prepared_at: futurePrep,
      storage_condition: 'Hot Holding',
      hygiene_confirmed: true,
      contamination_reported: false,
      donor_declaration: true,
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    }),
  });

  const data = await res.json();
  assert.equal(res.status, 400);
  assert.equal(data.success, false);
  assert.ok(data.errors.some((e) => e.includes('future')));
});

test('API 3: POST /api/donations rejects contamination reported', async () => {
  const prep = new Date(Date.now() - 30 * 60 * 1000).toISOString();

  const res = await fetch(`${baseUrl}/api/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Dropped Curry Container',
      food_category: 'Curry',
      quantity: '15 portions',
      prepared_at: prep,
      storage_condition: 'Hot Holding',
      hygiene_confirmed: true,
      contamination_reported: true, // Contamination!
      donor_declaration: true,
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    }),
  });

  const data = await res.json();
  assert.equal(res.status, 400);
  assert.equal(data.success, false);
  assert.ok(data.errors.some((e) => e.includes('contamination')));
});

test('API 4: POST /api/donations creates valid donation and logs safety audit', async () => {
  const prep = new Date(Date.now() - 45 * 60 * 1000).toISOString();

  const res = await fetch(`${baseUrl}/api/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Fresh Dal Makhani & Rotis',
      food_category: 'Curry',
      quantity: '20 portions',
      servings: 'Feeds ~20 people',
      items_list: 'Dal Makhani, Butter Roti, Jeera Rice',
      prepared_at: prep,
      storage_condition: 'Hot Holding',
      storage_temp: '67°C',
      hygiene_confirmed: true,
      contamination_reported: false,
      donor_declaration: true,
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      allergens: 'Dairy',
      dietary: 'Vegetarian',
      packaging: 'Thermal Stainless Steel Carrier',
      pickup_window: '12:00 PM - 02:00 PM',
    }),
  });

  const data = await res.json();
  assert.equal(res.status, 201);
  assert.equal(data.success, true);
  assert.equal(data.data.safety_status, 'verified');
  assert.ok(data.data.id);

  // Check safety audit log
  const auditLogs = db.prepare('SELECT * FROM safety_audit_logs WHERE donation_id = ?').all(data.data.id);
  assert.ok(auditLogs.length >= 1);
  assert.equal(auditLogs[0].action, 'DONATION_CREATED_SAFETY_VERIFIED');
});

test('API 5: POST /api/donations/:id/safety-review allows NGO to reject with safety notes', async () => {
  // Reject DON-101 for safety concerns
  const res = await fetch(`${baseUrl}/api/donations/DON-101/safety-review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'REJECT',
      reviewer_name: 'Priya Sharma (Hope Foundation)',
      reviewer_role: 'ngo_inspector',
      notes: 'Container seal broken on volunteer inspection, temperature dropped below 50°C.',
    }),
  });

  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.success, true);
  assert.equal(data.data.safety_status, 'rejected');
  assert.equal(data.data.claim_status, 'cancelled');

  // Verify DB state
  const row = db.prepare('SELECT * FROM food_donations WHERE id = ?').get('DON-101');
  assert.equal(row.safety_status, 'rejected');
});

test('API 6: Unauthorized / invalid action safety review fails', async () => {
  const res = await fetch(`${baseUrl}/api/donations/DON-102/safety-review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'ILLEGAL_ACTION',
      reviewer_name: 'Anonymous',
      notes: 'test',
    }),
  });

  assert.equal(res.status, 400);
});
