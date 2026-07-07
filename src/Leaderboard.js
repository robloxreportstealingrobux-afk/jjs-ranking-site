import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from './supabaseClient'
import { getRankForPoints, getGradeColor, getProgress, getMedals } from './ranks'
import './Leaderboard.css'

const PAGE_SIZE = 12
const AUTO_REFRESH_MS = 60000

function displayName(player) {
  if (player.username && player.username !== 'Unknown') return player.username
  return `Player #${String(player.user_id).slice(-4)}`
}

function initial(player) {
  const name = displayName(player)
  return name.replace('@', '').charAt(0).toUpperCase() || '?'
}

// NOTE on avatar_url: this column should hold the player's Roblox skin
// (e.g. the thumbnail returned by the thumbnails.roblox.com API), not a
// Discord avatar. The Discord link is only used for the username/ID here.
// Technical note: the Roblox API blocks fetch() calls made directly from
// the browser (CORS), so the bot (config.py, server-side, no CORS issue)
// needs to fetch the thumbnail URL and save it into Supabase. The site
// just displays the image directly, which works fine as long as the
// column holds a valid image URL.
function Avatar({ player, gradeColor, rank }) {
  const [broken, setBroken] = useState(false)
  const topThree = rank <= 3
  const ringClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : ''

  return (
    <div className={`avatar-wrap ${topThree ? 'avatar-top3 ' + ringClass : ''}`}>
      {player.avatar_url && !broken ? (
        <img
          className="avatar"
          src={player.avatar_url}
          alt={`Roblox skin of ${displayName(player)}`}
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="avatar avatar-fallback" style={{ color: gradeColor, borderColor: gradeColor }}>
          {initial(player)}
        </div>
      )}
      <span className="rank-pill">#{rank}</span>
    </div>
  )
}

function MedalsRow({ player }) {
  const medals = getMedals(player)
  if (medals.length === 0) return null
  return (
    <div className="medals-row">
      {medals.map((m) => (
        <span className="medal-chip" key={m.label} title={m.label}>
          {m.icon} {m.label}
        </span>
      ))}
    </div>
  )
}

function PlayerCard({ player }) {
  const grade = getRankForPoints(player.points)
  const gradeColor = getGradeColor(player.points)
  const progress = getProgress(player.points)
  const wrTotal = player.wins + player.losses
  const winrate = wrTotal ? `${Math.round((player.wins / wrTotal) * 100)}%` : 'N/A'

  return (
    <div className="player-card" style={{ '--grade-color': gradeColor }}>
      <div className="grade-badge" style={{ color: gradeColor, borderColor: gradeColor }}>
        {grade.name}
      </div>

      <div className="player-header">
        <Avatar player={player} gradeColor={gradeColor} rank={player.rank} />
        <div className="player-info">
          <div className="discord-name">{displayName(player)}</div>
          <div className="discord-id">ID: {player.user_id}</div>
          <div className="roblox-name">
            Roblox: <span>{player.main_server || 'Unknown'}</span>
          </div>
        </div>
      </div>

      <MedalsRow player={player} />

      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Points</span>
          <span className="stat-value points">{player.points}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Record</span>
          <span className="stat-value record">{player.wins}W / {player.losses}L</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Winrate</span>
          <span className="stat-value winrate">{winrate}</span>
        </div>
      </div>

      <div className="progress-label">{progress.label}</div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress.percent}%`, background: gradeColor, color: gradeColor }}
        />
      </div>
    </div>
  )
}



export default function Leaderboard() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchPlayers = useCallback(async ({ silent } = {}) => {
    if (silent) setRefreshing(true)
    else setLoading(true)
    setError(null)

    try {
      const { data, error: supabaseError } = await supabase
        .from('players')
        .select('user_id, points, main_server, wins, losses, username, avatar_url')
        .order('points', { ascending: false })

      if (supabaseError) throw supabaseError

      const ranked = (data || []).map((p, i) => ({ ...p, rank: i + 1 }))
      setPlayers(ranked)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message || 'Failed to reach Supabase.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchPlayers()
    const interval = setInterval(() => fetchPlayers({ silent: true }), AUTO_REFRESH_MS)
    return () => clearInterval(interval)
  }, [fetchPlayers])

  const filteredPlayers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return players
    return players.filter(
      (p) =>
        (p.main_server || '').toLowerCase().includes(q) ||
        (p.username || '').toLowerCase().includes(q) ||
        String(p.user_id).includes(q)
    )
  }, [players, search])

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagePlayers = filteredPlayers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  // Podium only shows on page 1, outside of search, and only if there are
  // at least 3 players — otherwise it wouldn't make visual sense.
  const restPlayers = pagePlayers

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="title">TR JJS</div>
        <div className="subtitle">
          Leaderboard • {players.length} player{players.length === 1 ? '' : 's'} ranked
        </div>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Search by Roblox name, Discord name, or ID..."
            value={search}
            onChange={handleSearchChange}
          />
          {search && (
            <button
              className="clear-search-btn"
              onClick={() => {
                setSearch('')
                setPage(1)
              }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="leaderboard">
        {loading && (
          <div className="loading">
            <div className="spinner" />
            Loading leaderboard...
          </div>
        )}

        {!loading && error && (
          <div className="error-state">
            <p>Couldn't reach the leaderboard database.</p>
            <p className="error-detail">{error}</p>
            <button className="page-btn" onClick={() => fetchPlayers()}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredPlayers.length === 0 && (
          <div className="no-data">
            {players.length === 0 ? 'No players yet. Be the first to get ranked!' : 'No players match your search.'}
          </div>
        )}

        {!loading && !error && restPlayers.length > 0 && (
          <div className="players-grid">
            {restPlayers.map((p) => (
              <PlayerCard key={p.user_id} player={p} />
            ))}
          </div>
        )}
      </div>

      {!loading && !error && filteredPlayers.length > PAGE_SIZE && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next →
          </button>
        </div>
      )}

      <div className="footer">
        <div className="footer-row">
          <span>
            {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : ''}
            {refreshing && ' • Refreshing...'}
          </span>
          <button
            className="refresh-btn"
            onClick={() => fetchPlayers({ silent: true })}
            disabled={refreshing || loading}
          >
            Refresh Now
          </button>
        </div>
        <div>EU TR JJS • No XP, no grind — grades only move from real match results.</div>
      </div>
    </div>
  )
}
