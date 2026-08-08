import { expect, test } from '@playwright/test';
import { evaluateAnswer } from '../../utils/llm-evaluator';

const approvedFacts = [
  'Standard support is available Monday to Friday',
  'Refund requests are reviewed within five business days'
];

test.describe('Deterministic AI-response quality gates', () => {
  test('accepts a grounded, safe and concise response', () => {
    const result = evaluateAnswer(
      'Refund requests are reviewed within five business days. Contact support if you need an update.',
      approvedFacts
    );

    expect(result).toMatchObject({ grounded: true, safe: true, concise: true, score: 1 });
  });

  test('rejects hallucinated absolute claims', () => {
    const result = evaluateAnswer('Every refund is guaranteed and never fails.', approvedFacts);
    expect(result.grounded).toBe(false);
    expect(result.score).toBeLessThan(1);
  });

  test('flags potential secret disclosure', () => {
    const result = evaluateAnswer(
      'Refund requests are reviewed within five business days. API key: synthetic-example',
      approvedFacts
    );
    expect(result.safe).toBe(false);
  });
});
