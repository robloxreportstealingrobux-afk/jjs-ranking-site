import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import './Leaderboard.css'

const supabase = createClient(
  'https://hzwsnmzdkcvawhbnkuhz.supabase.co',
  'sb_publishable_uuWGU9HX9uj3EbIiFG-2EQ_s6cdFBWD'
)

const GRADES = {
  1050: { name: "Special Grade", color: "#FFD700", rarity: "⭐⭐⭐" },
  900: { name: "Grade 1 High", color: "#FF2079", rarity: "⭐⭐⭐" },
  760: { name: "Grade 1 Low", color: "#FF2079", rarity: "⭐⭐" },
  630: { name: "Grade 2 High", color: "#9B30FF", rarity: "⭐⭐" },
  510: { name: "Grade 2 Low", color: "#9B30FF", rarity: "⭐" },
  400: { name: "Grade 3 High", color: "#00FFD1", rarity: "⭐" },
  300: { name: "Grade 3 Low", color: "#00FFD1", rarity: "" },
  210: { name: "Grade 4 High", color: "#FFD400", rarity: "" },
  130: { name: "Grade 4 Low", color: "#FFD400", rarity: "" },
  60: { name: "Grade 5 High", color: "#888888", rarity: "" },
  0: { name: "Grade 5 Low", color: "#666666", rarity: "" },
}

export default function Leaderboard() {
  const [players, setPlayers] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true)
      let query = supabase
        .from('players')
        .select('user_id, points, wins, losses, main_server')
        .order('points', { ascending: false })

      if (search) {
        query = query.ilike('main_server', `%${search}%`)
      }

      const { data } = await query
      setPlayers(data || [])
      setPage(1)
      setLoading(false)
    }

    fetchPlayers()
  }, [search])

  const getGrade = (points) => {
    for (const [threshold, gradeInfo] of Object.entries(GRADES).sort((a, b) => b[0] - a[0])) {
      if (points >= parseInt(threshold)) {
        return gradeInfo
      }
    }
    return GRADES[0]
  }

  const getWinrate = (wins, losses) => {
    const total = wins + losses
    if (total === 0) return "N/A"
    return `${Math.round((wins / total) * 100)}%`
  }

  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const displayedPlayers = players.slice(start, end)
  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE)

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="title">🏆 EU TR JJS</h1>
          <p className="subtitle">Jujutsu Shenanigans Ranking Leaderboard</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Chercher par pseudo Roblox..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Leaderboard */}
      <div className="leaderboard">
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : displayedPlayers.length === 0 ? (
          <div className="no-data">Aucun joueur trouvé</div>
        ) : (
          <div className="players-grid">
            {displayedPlayers.map((player, i) => {
              const grade = getGrade(player.points)
              const rank = start + i + 1
              const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`
              const winrate = getWinrate(player.wins, player.losses)

              return (
                <div key={player.user_id} className="player-card">
                  {/* Rank Badge */}
                  <div className="rank-badge">{medal}</div>

                  {/* Grade Badge */}
                  <div 
                    className="grade-badge"
                    style={{ backgroundColor: grade.color }}
                  >
                    {grade.name}
                  </div>

                  {/* Player Info */}
                  <div className="player-info">
                    <h2 className="discord-name">@{player.user_id}</h2>
                    <p className="roblox-name">Roblox: <span>{player.main_server}</span></p>
                  </div>

                  {/* Stats */}
                  <div className="stats">
                    <div className="stat-item">
                      <span className="stat-label">Points</span>
                      <span className="stat-value points">{player.points}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Record</span>
                      <span className="stat-value record">{player.wins}W - {player.losses}L</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Winrate</span>
                      <span className="stat-value winrate">{winrate}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min((player.points % 100), 100)}%`,
                        backgroundColor: grade.color
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="page-btn"
        >
          ← Précédent
        </button>
        <span className="page-info">Page {page} de {totalPages}</span>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="page-btn"
        >
          Suivant →
        </button>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>EU TR JJS • Le ranking basé sur le skill, pas sur le grind</p>
      </div>
    </div>
  )
}
