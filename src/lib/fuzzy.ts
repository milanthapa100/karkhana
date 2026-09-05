export type FuzzyScore = { score: number; start: number };

function fuzzyMatch(query: string, text: string): FuzzyScore | null {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q || q.length > t.length) return null;

  let qi = 0;
  let score = 0;
  let start = -1;
  let prev = -1;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t.charCodeAt(ti) !== q.charCodeAt(qi)) continue;
    if (prev >= 0) {
      score += (ti - prev - 1) * 2;
    }
    if (start === -1) start = ti;
    prev = ti;
    qi++;
  }

  if (qi < q.length) return null;
  return { score: score + start, start };
}

export type FuzzyCandidate = { text: string; weight?: number };

export function bestFuzzyScore(
  query: string,
  candidates: FuzzyCandidate[],
): FuzzyScore | null {
  let best: FuzzyScore | null = null;
  for (const c of candidates) {
    const m = fuzzyMatch(query, c.text);
    if (!m) continue;
    const weighted = m.score + (c.weight ?? 0);
    if (!best || weighted < best.score) {
      best = { score: weighted, start: m.start };
    }
  }
  return best;
}