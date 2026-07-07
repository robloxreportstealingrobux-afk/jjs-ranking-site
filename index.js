.leaderboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

/* ============= HEADER ============= */
.header {
  text-align: center;
  padding-bottom: 28px;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.title {
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: #fff;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 0.95rem;
  color: #7a7a84;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ============= SEARCH ============= */
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 15px 44px 15px 22px;
  background: #0b0b0d;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: rgba(0, 255, 209, 0.5);
  box-shadow: 0 0 0 3px rgba(0, 255, 209, 0.08);
}

.search-input::placeholder {
  color: #55555c;
}

.clear-search-btn {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6a6a72;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px;
  line-height: 1;
  transition: color 0.2s ease;
}

.clear-search-btn:hover {
  color: #FF2079;
}

/* ============= LEADERBOARD ============= */
.leaderboard {
  margin-bottom: 40px;
}

.loading, .no-data {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.05rem;
  color: #6a6a72;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.08);
  border-top-color: #9B30FF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 60px 20px;
  color: #FF2079;
}

.error-state .error-detail {
  color: #6a6a72;
  font-size: 0.85rem;
  margin: 10px 0 20px;
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* ============= PLAYER CARD ============= */
.player-card {
  background: #0a0a0c;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 22px;
  position: relative;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  animation: card-in 0.35s ease both;
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .player-card { animation: none; }
}

.player-card:hover {
  transform: translateY(-4px);
  border-color: var(--grade-color, rgba(255, 255, 255, 0.2));
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

/* Grade Badge — outline pill blended into the dark card instead of a solid neon block */
.grade-badge {
  position: absolute;
  top: 18px;
  right: 18px;
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.72rem;
  font-weight: 700;
  border: 1px solid;
  background: rgba(255, 255, 255, 0.03);
  letter-spacing: 0.5px;
  max-width: 50%;
  text-align: center;
}

/* Header row: avatar + names */
.player-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 6px;
  margin-bottom: 20px;
  padding-right: 70px;
}

.avatar-wrap {
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  font-weight: 800;
  font-size: 1.2rem;
  border-width: 2px;
  border-style: solid;
}

.avatar-top3 .avatar {
  border-width: 2px;
}

.avatar-top3.gold .avatar { border-color: #FFD700; }
.avatar-top3.silver .avatar { border-color: #C7C9D1; }
.avatar-top3.bronze .avatar { border-color: #CD7F32; }

.rank-pill {
  position: absolute;
  bottom: -4px;
  right: -6px;
  background: #050506;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 20px;
  line-height: 1.2;
}

/* Player Info */
.discord-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.roblox-name {
  font-size: 0.85rem;
  color: #7a7a84;
  margin-top: 3px;
}

.roblox-name span {
  color: #00FFD1;
  font-weight: 600;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.02);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-label {
  display: block;
  font-size: 0.68rem;
  color: #6a6a72;
  text-transform: uppercase;
  margin-bottom: 4px;
  letter-spacing: 0.8px;
}

.stat-value {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #e8e8ea;
}

.stat-value.points {
  color: #00FFD1;
  font-size: 1.2rem;
}

.stat-value.record {
  color: #FFD400;
}

.stat-value.winrate {
  color: #FF2079;
}

/* Progress Bar */
.progress-label {
  font-size: 0.7rem;
  color: #6a6a72;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-bar {
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.4s ease;
}

/* ============= PAGINATION ============= */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 10px 22px;
  background: transparent;
  color: #e8e8ea;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: rgba(0, 255, 209, 0.5);
  color: #00FFD1;
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.9rem;
  color: #7a7a84;
  font-weight: 600;
}

/* ============= FOOTER ============= */
.footer {
  text-align: center;
  padding: 28px 20px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #55555c;
  font-size: 0.85rem;
}

.footer-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  color: #7a7a84;
}

.refresh-btn {
  padding: 7px 16px;
  background: transparent;
  border: 1px solid rgba(0, 255, 209, 0.3);
  color: #00FFD1;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(0, 255, 209, 0.08);
  border-color: rgba(0, 255, 209, 0.6);
}

.refresh-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ============= RESPONSIVE ============= */
@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 0.8rem;
  }

  .players-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .pagination {
    gap: 10px;
  }
}
