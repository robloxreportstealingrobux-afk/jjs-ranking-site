import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from './supabaseClient'
import { getRankForPoints, getGradeColor, getProgress, getMedals } from './ranks'
import './Leaderboard.css'

const PAGE_SIZE = 12
const AUTO_REFRESH_MS = 60000

function displayName(player) {
  if (player.username && player.username !== 'Unknown') return player.username
  return `Joueur #${String(player.user_id).slice(-4)}`
}

function initial(player) {
  const name = displayName(player)
  return name.replace('@', '').charAt(0).toUpperCase() || '?'
}

// NOTE avatar_url : cette colonne doit contenir le skin Roblox du joueur
// (ex: le thumbnail renvoyé par l'API thumbnails.roblox.com), pas un avatar
// Discord. Le lien Discord ne sert qu'à afficher le pseudo/ID, donc on ne
// va rien chercher côté Discord ici.
// Astuce technique : l'API Roblox refuse les appels fetch() faits depuis le
// navigateur (CORS), donc il faut que le bot (config.py, côté serveur, pas
// de souci de CORS) récupère l'URL du thumbnail et l'enregistre dans
// Supabase. Le site n'a plus qu'à afficher l'image directement, ce qu'il
// fait très bien tant que la colonne contient une URL d'image valide.
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
          alt={`Skin Roblox de ${displayName(player)}`}
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
            Roblox: <span>{player.main_server || 'Inconnu'}</span>
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
          <span className="stat-label">Bilan</span>
          <span className="stat-value record">{player.wins}V / {player.losses}D</span>
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

function PodiumCard({ player, place }) {
  const [broken, setBroken] = useState(false)
  const grade = getRankForPoints(player.points)
  const gradeColor = getGradeColor(player.points)
  const medals = getMedals(player)
  const medalClass = place === 1 ? 'gold' : place === 2 ? 'silver' : 'bronze'
  const medalEmoji = place === 1 ? '🥇' : place === 2 ? '🥈' : '🥉'

  return (
    <div className={`podium-item ${medalClass}`}>
      <div className="podium-medal">{medalEmoji}</div>
      {player.avatar_url && !broken ? (
        <img
          className="podium-avatar"
          src={player.avatar_url}
          alt={`Skin Roblox de ${displayName(player)}`}
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="podium-avatar-fallback" style={{ color: gradeColor, borderColor: gradeColor }}>
          {initial(player)}
        </div>
      )}
      <div className="podium-name">{displayName(player)}</div>
      <div className="podium-id">ID: {player.user_id}</div>
      <div className="podium-grade" style={{ color: gradeColor, borderColor: gradeColor }}>
        {grade.name}
      </div>
      <div className="podium-points">{player.points} pts</div>
      {medals.length > 0 && (
        <div className="podium-medals">
          {medals
            .filter((m) => m.icon !== medalEmoji)
            .map((m) => (
              <span key={m.label} title={m.label}>{m.icon}</span>
            ))}
        </div>
      )}
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
      setError(err.message || 'Impossible de contacter Supabase.')
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

  // Le podium ne s'affiche que sur la page 1, hors recherche, et seulement
  // s'il y a au moins 3 joueurs — sinon ça n'a pas de sens visuellement.
  const showPodium = currentPage === 1 && !search && pagePlayers.length >= 3
  const podiumPlayers = showPodium ? pagePlayers.slice(0, 3) : []
  const restPlayers = showPodium ? pagePlayers.slice(3) : pagePlayers

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="title">EU TR JJS</div>
        <div className="subtitle">
          Classement • {players.length} joueur{players.length === 1 ? '' : 's'} classé{players.length === 1 ? '' : 's'}
        </div>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Rechercher par pseudo Roblox, pseudo Discord ou ID..."
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
              aria-label="Effacer la recherche"
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
            Chargement du classement...
          </div>
        )}

        {!loading && error && (
          <div className="error-state">
            <p>Impossible de joindre la base de données du classement.</p>
            <p className="error-detail">{error}</p>
            <button className="page-btn" onClick={() => fetchPlayers()}>
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && filteredPlayers.length === 0 && (
          <div className="no-data">
            {players.length === 0 ? 'Aucun joueur classé pour le moment.' : 'Aucun joueur ne correspond à ta recherche.'}
          </div>
        )}

        {!loading && !error && showPodium && (
          <div className="podium">
            {podiumPlayers.map((p) => (
              <PodiumCard key={p.user_id} player={p} place={p.rank} />
            ))}
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
            ← Précédent
          </button>
          <span className="page-info">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            className="page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Suivant →
          </button>
        </div>
      )}

      <div className="footer">
        <div className="footer-row">
          <span>
            {lastUpdated ? `Dernière mise à jour : ${lastUpdated.toLocaleTimeString()}` : ''}
            {refreshing && ' • Actualisation...'}
          </span>
          <button
            className="refresh-btn"
            onClick={() => fetchPlayers({ silent: true })}
            disabled={refreshing || loading}
          >
            Actualiser
          </button>
        </div>
        <div>EU TR JJS • Pas de XP, pas de grind — les grades ne bougent que sur de vrais résultats.</div>
      </div>
    </div>
  )
}
