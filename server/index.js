import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemesPath = path.join(__dirname, 'schemes.json');
const schemes = JSON.parse(fs.readFileSync(schemesPath, 'utf-8'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

function normalizeValue(value) {
  if (value == null) return value;
  if (typeof value === 'string') return value.trim().toLowerCase();
  return value;
}

function valueMatches(expected, received) {
  if (expected == null) return false;
  if (Array.isArray(expected)) {
    const normalizedExpected = expected.map(normalizeValue);
    if (Array.isArray(received)) {
      const normalizedReceived = received.map(normalizeValue);
      return normalizedReceived.some((v) => normalizedExpected.includes(v));
    }
    return normalizedExpected.includes(normalizeValue(received));
  }
  if (typeof expected === 'string') {
    return normalizeValue(expected) === normalizeValue(received);
  }
  return expected === received;
}

function computeEligibility(user) {
  const results = [];

  for (const scheme of schemes) {
    const matchedCriteria = [];
    let matchedPoints = 0;
    let possiblePoints = 0;

    const criteria = scheme.eligibility || {};

    // Gender
    if (criteria.gender) {
      possiblePoints += 1;
      const genderMatch = valueMatches(criteria.gender, user.gender);
      if (genderMatch) {
        matchedPoints += 1;
        matchedCriteria.push('Gender');
      }
    }

    // Age
    if (criteria.age && (criteria.age.min != null || criteria.age.max != null)) {
      possiblePoints += 1;
      const min = criteria.age.min ?? -Infinity;
      const max = criteria.age.max ?? Infinity;
      if (typeof user.age === 'number' && user.age >= min && user.age <= max) {
        matchedPoints += 1;
        matchedCriteria.push('Age');
      }
    }

    // Location / State
    if (criteria.locations) {
      possiblePoints += 1;
      const allowed = criteria.locations.map((l) => l.toLowerCase());
      const isPanIndia = allowed.includes('pan-india');
      if (isPanIndia || allowed.includes(String(user.state || '').toLowerCase())) {
        matchedPoints += 1;
        matchedCriteria.push('Location');
      }
    }

    // Sector / Industry
    if (criteria.sectors) {
      possiblePoints += 1;
      if (valueMatches(criteria.sectors, user.sector)) {
        matchedPoints += 1;
        matchedCriteria.push('Sector');
      }
    }

    // Business Type
    if (criteria.businessTypes) {
      possiblePoints += 1;
      if (valueMatches(criteria.businessTypes, user.businessType)) {
        matchedPoints += 1;
        matchedCriteria.push('Business Type');
      }
    }

    // Years in Business
    if (criteria.yearsInBusiness && (criteria.yearsInBusiness.min != null || criteria.yearsInBusiness.max != null)) {
      possiblePoints += 1;
      const min = criteria.yearsInBusiness.min ?? -Infinity;
      const max = criteria.yearsInBusiness.max ?? Infinity;
      if (typeof user.yearsInBusiness === 'number' && user.yearsInBusiness >= min && user.yearsInBusiness <= max) {
        matchedPoints += 1;
        matchedCriteria.push('Years in Business');
      }
    }

    // Loan amount
    if (criteria.loanAmount && (criteria.loanAmount.min != null || criteria.loanAmount.max != null)) {
      possiblePoints += 1;
      const min = criteria.loanAmount.min ?? -Infinity;
      const max = criteria.loanAmount.max ?? Infinity;
      if (typeof user.loanAmount === 'number' && user.loanAmount >= min && user.loanAmount <= max) {
        matchedPoints += 1;
        matchedCriteria.push('Loan Amount');
      }
    }

    const percentage = possiblePoints > 0 ? Math.round((matchedPoints / possiblePoints) * 100) : 0;

    results.push({
      name: scheme.name,
      description: scheme.description,
      applyLink: scheme.applyLink,
      eligibilityPercentage: percentage,
      matchedCriteria,
      keyEligibility: scheme.keyEligibility || [],
    });
  }

  return results
    .filter((s) => s.eligibilityPercentage > 0)
    .sort((a, b) => b.eligibilityPercentage - a.eligibilityPercentage);
}

app.post('/api/schemes', (req, res) => {
  const {
    gender,
    age,
    state,
    sector,
    businessType,
    yearsInBusiness,
    loanAmount,
  } = req.body || {};

  if (!gender || age == null || !state || !sector || !businessType || yearsInBusiness == null || loanAmount == null) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const result = computeEligibility({
    gender,
    age: Number(age),
    state,
    sector,
    businessType,
    yearsInBusiness: Number(yearsInBusiness),
    loanAmount: Number(loanAmount),
  });

  res.json({
    count: result.length,
    schemes: result,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Asha Setu server running on port ${PORT}`);
});


