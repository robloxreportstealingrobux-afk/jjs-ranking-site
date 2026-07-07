// Mirrors cogs' ranks.py — keep the point thresholds in sync with the
// bot if you ever change them there. Only (name, minPoints) is needed
// here since the site doesn't touch Discord roles.
export const RANKS = [
  { name: 'Grade 5 Low', min: 0 },
  { name: 'Grade 5 High', min: 60 },
  { name: 'Grade 4 Low', min: 130 },
  { name: 'Grade 4 High', min: 210 },
  { name: 'Grade 3 Low', min: 300 },
  { name: 'Grade 3 High', min: 400 },
  { name: 'Grade 2 Low', min: 510 },
  { name: 'Grade 2 High', min: 630 },
  { name: 'Grade 1 Low', min: 760 },
  { name: 'Grade 1 High', min: 900 },
  { name: 'Special Grade', min: 1050 },
]

// One accent color per grade, running from muted purple up to gold —
// reuses the site's existing neon palette instead of inventing a new one.
export const GRADE_COLORS = [
  '#8a7ca8', // Grade 5 Low
  '#9B30FF', // Grade 5 High
  '#7B5CFF', // Grade 4 Low
  '#5C7CFF', // Grade 4 High
  '#00C2FF', // Grade 3 Low
  '#00FFD1', // Grade 3 High
  '#5CFF8F', // Grade 2 Low
  '#FFD400', // Grade 2 High
  '#FF9E2C', // Grade 1 Low
  '#FF2079', // Grade 1 High
  '#FFD700', // Special Grade
]

export function getRankIndexForPoints(points) {
  let idx = 0
  for (let i = 0; i < RANKS.length; i++) {
    if (points >= RANKS[i].min) idx = i
    else break
  }
  return idx
}

export function getRankForPoints(points) {
  return RANKS[getRankIndexForPoints(points)]
}

export function getGradeColor(points) {
  return GRADE_COLORS[getRankIndexForPoints(points)]
}

// Returns { percent, label } describing progress from the current
// grade's threshold to the next one, for the progress bar.
export function getProgress(points) {
  const idx = getRankIndexForPoints(points)
  const current = RANKS[idx]
  const next = RANKS[idx + 1]

  if (!next) {
    return { percent: 100, label: 'Max grade reached' }
  }

  const span = next.min - current.min
  const into = points - current.min
  const percent = Math.max(0, Math.min(100, Math.round((into / span) * 100)))
  const remaining = next.min - points

  return { percent, label: `${remaining} pts to ${next.name}` }
}

// Small medal/badge set for a player — purely cosmetic, derived from
// data we already have (rank, points, wins). Nothing here is stored;
// it's all recomputed on the fly so there's no schema change needed.
export function getMedals(player) {
  const medals = []
  const wrTotal = player.wins + player.losses
  const winrate = wrTotal ? player.wins / wrTotal : 0

  if (player.rank === 1) medals.push({ icon: '🥇', label: '1st place' })
  else if (player.rank === 2) medals.push({ icon: '🥈', label: '2nd place' })
  else if (player.rank === 3) medals.push({ icon: '🥉', label: '3rd place' })

  if (getRankForPoints(player.points).name === 'Special Grade') {
    medals.push({ icon: '👑', label: 'Special Grade' })
  }

  if (player.wins >= 100) medals.push({ icon: '🏆', label: '100+ wins' })
  else if (player.wins >= 50) medals.push({ icon: '🎖️', label: '50+ wins' })
  else if (player.wins >= 10) medals.push({ icon: '⭐', label: '10+ wins' })

  if (wrTotal >= 10 && winrate >= 0.7) {
    medals.push({ icon: '🔥', label: '70%+ winrate' })
  }

  return medals
}
