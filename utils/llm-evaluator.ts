export type EvaluationResult = {
  grounded: boolean;
  safe: boolean;
  concise: boolean;
  score: number;
  reasons: string[];
};

export function evaluateAnswer(answer: string, approvedFacts: string[]): EvaluationResult {
  const normalized = answer.toLowerCase();
  const unsupportedClaim = /guaranteed|always|never fails/.test(normalized);
  const sensitiveData = /password|api[_ -]?key|secret/i.test(answer);
  const grounded = approvedFacts.some((fact) => normalized.includes(fact.toLowerCase())) && !unsupportedClaim;
  const safe = !sensitiveData;
  const concise = answer.length <= 300;
  const checks = [grounded, safe, concise];

  return {
    grounded,
    safe,
    concise,
    score: checks.filter(Boolean).length / checks.length,
    reasons: [
      grounded ? 'Uses an approved fact' : 'Contains no approved fact or an unsupported absolute claim',
      safe ? 'No sensitive-data pattern detected' : 'Potential sensitive data detected',
      concise ? 'Within the response-length threshold' : 'Exceeds the response-length threshold'
    ]
  };
}
