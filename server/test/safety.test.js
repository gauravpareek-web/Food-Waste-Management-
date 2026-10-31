import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAndCalculateExpiry } from '../src/rules/foodSafetyRules.js';

test('1. Valid food donation passes all safety criteria', () => {
  const now = new Date();
  const prepTime = new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(); // 1 hr ago

  const result = validateAndCalculateExpiry({
    foodCategory: 'Curry',
    preparedAt: prepTime,
    storageCondition: 'Hot Holding',
    hygieneConfirmed: true,
    contaminationReported: false,
    hasFoodImage: true,
    donorDeclaration: true,
  });

  assert.equal(result.isValid, true);
  assert.equal(result.safetyStatus, 'verified');
  assert.equal(result.errors.length, 0);
  assert.equal(result.shelfLifeHours, 6);
  assert.ok(result.hoursRemaining > 4 && result.hoursRemaining <= 5);
});

test('2. Missing preparation time must be rejected', () => {
  const result = validateAndCalculateExpiry({
    foodCategory: 'Rice',
    preparedAt: '',
    storageCondition: 'Hot Holding',
    hygieneConfirmed: true,
    contaminationReported: false,
    hasFoodImage: true,
    donorDeclaration: true,
  });

  assert.equal(result.isValid, false);
  assert.equal(result.safetyStatus, 'rejected');
  assert.ok(result.errors.some((e) => e.includes('Preparation date and time is mandatory')));
});

test('3. Future preparation time must be rejected', () => {
  const futureTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // 2 hours in the future

  const result = validateAndCalculateExpiry({
    foodCategory: 'Roti',
    preparedAt: futureTime,
    storageCondition: 'Room Temperature',
    hygieneConfirmed: true,
    contaminationReported: false,
    hasFoodImage: true,
    donorDeclaration: true,
  });

  assert.equal(result.isValid, false);
  assert.equal(result.safetyStatus, 'rejected');
  assert.ok(result.errors.some((e) => e.includes('Preparation time cannot be in the future')));
});

test('4. Contaminated food must be strictly rejected', () => {
  const now = new Date();
  const prepTime = new Date(now.getTime() - 30 * 60 * 1000).toISOString();

  const result = validateAndCalculateExpiry({
    foodCategory: 'Vegetables',
    preparedAt: prepTime,
    storageCondition: 'Refrigerated',
    hygieneConfirmed: true,
    contaminationReported: true, // CONTAMINATED!
    hasFoodImage: true,
    donorDeclaration: true,
  });

  assert.equal(result.isValid, false);
  assert.equal(result.safetyStatus, 'rejected');
  assert.ok(result.errors.some((e) => e.includes('contamination')));
});

test('5. Expired food must not be listed as available', () => {
  // Rice left at room temperature prepared 4 hours ago (max safe limit is 2 hours)
  const expiredTime = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();

  const result = validateAndCalculateExpiry({
    foodCategory: 'Rice',
    preparedAt: expiredTime,
    storageCondition: 'Room Temperature', // 2h safe limit
    hygieneConfirmed: true,
    contaminationReported: false,
    hasFoodImage: true,
    donorDeclaration: true,
  });

  assert.equal(result.isValid, false);
  assert.equal(result.safetyStatus, 'rejected');
  assert.ok(result.errors.some((e) => e.includes('expired')));
});

test('6. Missing required photograph must prevent publishing', () => {
  const prepTime = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString();

  const result = validateAndCalculateExpiry({
    foodCategory: 'Bakery',
    preparedAt: prepTime,
    storageCondition: 'Room Temperature',
    hygieneConfirmed: true,
    contaminationReported: false,
    hasFoodImage: false, // NO PHOTO!
    donorDeclaration: true,
  });

  assert.equal(result.isValid, false);
  assert.equal(result.safetyStatus, 'rejected');
  assert.ok(result.errors.some((e) => e.includes('photograph')));
});

test('7. Missing hygiene confirmation or donor declaration must fail validation', () => {
  const prepTime = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString();

  const result = validateAndCalculateExpiry({
    foodCategory: 'Dairy',
    preparedAt: prepTime,
    storageCondition: 'Refrigerated',
    hygieneConfirmed: false, // Container not sanitized
    contaminationReported: false,
    hasFoodImage: true,
    donorDeclaration: false, // Declaration not accepted
  });

  assert.equal(result.isValid, false);
  assert.equal(result.safetyStatus, 'rejected');
  assert.ok(result.errors.some((e) => e.includes('container hygiene')));
  assert.ok(result.errors.some((e) => e.includes('Donor must declare')));
});
