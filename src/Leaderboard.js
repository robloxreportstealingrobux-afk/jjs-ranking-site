import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from './supabaseClient'
import { getRankForPoints, getGradeColor, getProgress } from './ranks'
import './Leaderboard.css'

const PAGE_SIZE = 12
const AUTO_REFRESH_MS = 60000

function PlayerCard({ player }) {
  const grade = getRankForPoints(player.points)
  const gradeColor = getGradeColor(player.points)
  const progress = getProgress(player.points)
  const wrTotal = player.wins + player.losses
  const winrate = wrTotal ? `${Math.round((player.wins / wrTotal) * 100)}%` : 'N/A'

  return (
    <div className="player-card">
      <div className="rank-badge">#{player.rank}</div>
      <div
        className="grade-badge"
        style={{ background: gradeColor }}
      >
        {grade.name}
      </div>

      <div className="player-info">
        <div className="discord-name">
          <a
            href={`https://discord.com/users/${player.user_id}`}
            target="_blank"
            rel="noreferrer"
          >
            Discord: {player.user_id}
          </a>
        </div>
        <div className="roblox-name">
          Roblox: <span>{player.main_server || 'Unknown'}</span>
        </div>
      </div>

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
        .select('user_id, points, main_server, wins, losses')
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
        String(p.user_id).includes(q)
    )
  }, [players, search])

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagePlayers = filteredPlayers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="header-content">
          <div className="title">EU TR JJS</div>
          <div className="subtitle">
            Leaderboard • {players.length} player{players.length === 1 ? '' : 's'} ranked
          </div>
        </div>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Search by Roblox name or Discord ID..."
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
            <p>⚠️ Couldn't reach the leaderboard database.</p>
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

        {!loading && !error && filteredPlayers.length > 0 && (
          <div className="players-grid">
            {pagePlayers.map((p) => (
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
            {lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
              : ''}
            {refreshing && ' • Refreshing...'}
          </span>
          <button
            className="refresh-btn"
            onClick={() => fetchPlayers({ silent: true })}
            disabled={refreshing || loading}
          >
            🔄 Refresh Now
          </button>
        </div>
        <div>EU TR JJS • No XP, no grind — grades only move from real match results.</div>
      </div>
    </div>
  )
}
