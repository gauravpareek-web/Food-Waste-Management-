/**
 * Food Safety & Hygiene Rules Engine
 * Configurable thresholds based on FSSAI surplus food regulations
 * and recognized food safety guidance (FDA Food Code / 2-hour-4-hour danger zone rules).
 */

export type FoodCategory =
  | 'Rice'
  | 'Roti'
  | 'Curry'
  | 'Vegetables'
  | 'Dairy'
  | 'Bakery'
  | 'Packaged Food'
  | 'Other';

export type StorageCondition =
  | 'Refrigerated'
  | 'Room Temperature'
  | 'Hot Holding';

export type SafetyStatus =
  | 'verified'
  | 'pending_review'
  | 'rejected'
  | 'expired';

export interface SafetyRuleConfig {
  maxSafeHours: number;
  requiresStrictReview: boolean;
  minTempCelsius?: number;
  maxTempCelsius?: number;
  guidelineNote: string;
}

/**
 * Configurable Food Safety Rules Matrix
 * Rule key format: `${category}:${storageCondition}`
 */
export const FOOD_SAFETY_RULES: Record<string, SafetyRuleConfig> = {
  // Rice / Starch (Bacillus cereus spore danger zone)
  'Rice:Hot Holding': {
    maxSafeHours: 4,
    requiresStrictReview: false,
    minTempCelsius: 60,
    guidelineNote: 'FSSAI Hot Holding: Keep above 60°C; consume within 4 hours of preparation.'
  },
  'Rice:Refrigerated': {
    maxSafeHours: 24,
    requiresStrictReview: false,
    maxTempCelsius: 5,
    guidelineNote: 'Rapidly cooled below 5°C within 2 hours; safe up to 24 hours.'
  },
  'Rice:Room Temperature': {
    maxSafeHours: 2,
    requiresStrictReview: true,
    guidelineNote: 'High risk of Bacillus cereus toxin formation. Strictly limit to 2 hours ambient.'
  },

  // Curry / Cooked Meals with Gravy
  'Curry:Hot Holding': {
    maxSafeHours: 6,
    requiresStrictReview: false,
    minTempCelsius: 60,
    guidelineNote: 'Continuous holding >60°C prevents bacterial growth up to 6 hours.'
  },
  'Curry:Refrigerated': {
    maxSafeHours: 24,
    requiresStrictReview: false,
    maxTempCelsius: 5,
    guidelineNote: 'Chilled below 5°C; safe for same-day/next-day redistribution up to 24 hours.'
  },
  'Curry:Room Temperature': {
    maxSafeHours: 2,
    requiresStrictReview: true,
    guidelineNote: 'Danger zone holding; must be collected and distributed within 2 hours.'
  },

  // Roti / Flatbreads
  'Roti:Room Temperature': {
    maxSafeHours: 8,
    requiresStrictReview: false,
    guidelineNote: 'Dry unleavened flatbreads in clean cloth/kraft paper safe for 8 hours ambient.'
  },
  'Roti:Hot Holding': {
    maxSafeHours: 4,
    requiresStrictReview: false,
    minTempCelsius: 60,
    guidelineNote: 'Held warm in insulated casserole; safe up to 4 hours.'
  },
  'Roti:Refrigerated': {
    maxSafeHours: 24,
    requiresStrictReview: false,
    maxTempCelsius: 5,
    guidelineNote: 'Cold storage in airtight packaging safe up to 24 hours.'
  },

  // Fresh Vegetables (Raw / Salads / Produce)
  'Vegetables:Refrigerated': {
    maxSafeHours: 48,
    requiresStrictReview: false,
    maxTempCelsius: 5,
    guidelineNote: 'Intact raw vegetables in cold store safe up to 48 hours.'
  },
  'Vegetables:Room Temperature': {
    maxSafeHours: 12,
    requiresStrictReview: false,
    guidelineNote: 'Whole uncut raw produce in ventilated ambient environment up to 12 hours.'
  },
  'Vegetables:Hot Holding': {
    maxSafeHours: 4,
    requiresStrictReview: true,
    minTempCelsius: 60,
    guidelineNote: 'Steamed/sauteed hot vegetables held >60°C up to 4 hours.'
  },

  // Dairy (Paneer, Milk sweets, curd items - Highly Perishable)
  'Dairy:Refrigerated': {
    maxSafeHours: 12,
    requiresStrictReview: false,
    maxTempCelsius: 4,
    guidelineNote: 'Strict cold-chain holding 2-4°C required for dairy surplus.'
  },
  'Dairy:Hot Holding': {
    maxSafeHours: 3,
    requiresStrictReview: true,
    minTempCelsius: 65,
    guidelineNote: 'Hot paneer/gravy dishes must maintain >65°C; max 3 hours.'
  },
  'Dairy:Room Temperature': {
    maxSafeHours: 1.5,
    requiresStrictReview: true,
    guidelineNote: 'Danger zone: High microbiological risk. Ambient holding strictly under 90 minutes.'
  },

  // Bakery (Breads, Rolls, Buns - Low moisture)
  'Bakery:Room Temperature': {
    maxSafeHours: 36,
    requiresStrictReview: false,
    guidelineNote: 'Dry baked items in parchment/sealed boxes safe up to 36 hours.'
  },
  'Bakery:Refrigerated': {
    maxSafeHours: 48,
    requiresStrictReview: false,
    maxTempCelsius: 5,
    guidelineNote: 'Refrigerated bakery surplus safe up to 48 hours.'
  },
  'Bakery:Hot Holding': {
    maxSafeHours: 4,
    requiresStrictReview: true,
    guidelineNote: 'Warm baked goods safe up to 4 hours.'
  },

  // Packaged Food
  'Packaged Food:Room Temperature': {
    maxSafeHours: 48,
    requiresStrictReview: false,
    guidelineNote: 'Factory sealed unopened food within declared expiry date.'
  },
  'Packaged Food:Refrigerated': {
    maxSafeHours: 48,
    requiresStrictReview: false,
    maxTempCelsius: 5,
    guidelineNote: 'Perishable packaged food within label date kept refrigerated.'
  },
  'Packaged Food:Hot Holding': {
    maxSafeHours: 4,
    requiresStrictReview: true,
    guidelineNote: 'Packaged hot food items held warm up to 4 hours.'
  },

  // Fallback for 'Other' or uncategorized
  'Other:Hot Holding': {
    maxSafeHours: 3,
    requiresStrictReview: true,
    minTempCelsius: 60,
    guidelineNote: 'Unclassified surplus hot holding requires manual safety review.'
  },
  'Other:Refrigerated': {
    maxSafeHours: 12,
    requiresStrictReview: true,
    maxTempCelsius: 5,
    guidelineNote: 'Unclassified refrigerated food requires inspection before distribution.'
  },
  'Other:Room Temperature': {
    maxSafeHours: 2,
    requiresStrictReview: true,
    guidelineNote: 'Unclassified ambient food has strict 2-hour maximum danger window.'
  }
};

export interface SafetyValidationInput {
  foodCategory: FoodCategory;
  preparedAt: string; // ISO date string or YYYY-MM-DDTHH:mm
  storageCondition: StorageCondition;
  hygieneConfirmed: boolean;
  contaminationReported: boolean;
  hasFoodImage: boolean;
  donorDeclaration: boolean;
}

export interface SafetyValidationResult {
  isValid: boolean;
  safetyStatus: SafetyStatus;
  preparedAtDate: Date;
  expiryAtDate: Date;
  shelfLifeHours: number;
  hoursRemaining: number;
  percentElapsed: number;
  errors: string[];
  reviewNotes: string[];
  ruleApplied: SafetyRuleConfig;
}

/**
 * Validate food safety checklist and calculate exact scientific expiry
 */
export function validateAndCalculateExpiry(input: SafetyValidationInput): SafetyValidationResult {
  const errors: string[] = [];
  const reviewNotes: string[] = [];
  const now = new Date();

  // 1. Mandatory Field Checks
  if (!input.foodCategory) {
    errors.push('Food category is required.');
  }
  if (!input.storageCondition) {
    errors.push('Storage condition is required.');
  }
  if (!input.preparedAt) {
    errors.push('Preparation date and time is mandatory.');
  }

  // Parse Preparation Time
  const prepDate = new Date(input.preparedAt);
  if (isNaN(prepDate.getTime())) {
    errors.push('Invalid preparation date and time format.');
  } else {
    // 2. Future Preparation Time Check
    // Allow a small 2-minute buffer for clock drift
    if (prepDate.getTime() > now.getTime() + 2 * 60 * 1000) {
      errors.push('Preparation time cannot be in the future.');
    }
  }

  // 3. Contamination Check (Strict rejection)
  if (input.contaminationReported) {
    errors.push('Food has been reported as exposed to contamination. Redistribution is strictly prohibited by FSSAI.');
  }

  // 4. Container Hygiene Check
  if (!input.hygieneConfirmed) {
    errors.push('Food container hygiene and sanitization must be confirmed before listing.');
  }

  // 5. Mandatory Image Check
  if (!input.hasFoodImage) {
    errors.push('A photograph of the surplus food batch is mandatory for safety verification.');
  }

  // 6. Donor Declaration
  if (!input.donorDeclaration) {
    errors.push('Donor must declare and confirm that the safety information is accurate and food is untouched surplus.');
  }

  // Look up recognized Food Safety Rule
  const ruleKey = `${input.foodCategory}:${input.storageCondition}`;
  const rule = FOOD_SAFETY_RULES[ruleKey] || FOOD_SAFETY_RULES['Other:Room Temperature'];

  let shelfLifeHours = rule.maxSafeHours;
  let expiryDate = new Date();
  let hoursRemaining = 0;
  let percentElapsed = 100;

  if (!isNaN(prepDate.getTime())) {
    expiryDate = new Date(prepDate.getTime() + shelfLifeHours * 60 * 60 * 1000);
    const msRemaining = expiryDate.getTime() - now.getTime();
    hoursRemaining = Math.max(0, parseFloat((msRemaining / (1000 * 60 * 60)).toFixed(1)));
    const totalMs = expiryDate.getTime() - prepDate.getTime();
    const elapsedMs = now.getTime() - prepDate.getTime();
    percentElapsed = Math.min(100, Math.max(0, Math.round((elapsedMs / totalMs) * 100)));

    // 7. Expired Food Check
    if (expiryDate.getTime() <= now.getTime()) {
      errors.push(`Food safe shelf-life expired on ${expiryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Expired food cannot be listed.`);
    }
  }

  // Determine Safety Status
  let safetyStatus: SafetyStatus = 'verified';

  if (errors.length > 0) {
    if (input.contaminationReported || (!isNaN(prepDate.getTime()) && expiryDate.getTime() <= now.getTime())) {
      safetyStatus = 'rejected';
      reviewNotes.push(`Rejected on safety grounds: ${errors.join('; ')}`);
    } else {
      safetyStatus = 'rejected';
      reviewNotes.push(`Validation failed: ${errors.join('; ')}`);
    }
  } else if (rule.requiresStrictReview || input.foodCategory === 'Other') {
    safetyStatus = 'pending_review';
    reviewNotes.push(`Marked for coordinator review per food safety guideline: ${rule.guidelineNote}`);
  } else {
    safetyStatus = 'verified';
    reviewNotes.push(`Food safety checklist verified per standard: ${rule.guidelineNote}`);
  }

  return {
    isValid: errors.length === 0,
    safetyStatus,
    preparedAtDate: isNaN(prepDate.getTime()) ? now : prepDate,
    expiryAtDate: expiryDate,
    shelfLifeHours,
    hoursRemaining,
    percentElapsed,
    errors,
    reviewNotes,
    ruleApplied: rule,
  };
}
