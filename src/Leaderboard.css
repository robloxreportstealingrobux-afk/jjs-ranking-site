.leaderboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 20px 20px;
  min-height: 100vh;
}

/* ============= HEADER ============= */
.header {
  text-align: center;
  padding-bottom: 30px;
  margin-bottom: 44px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.title {
  font-family: 'Sora', 'Inter', sans-serif;
  font-size: 3.4rem;
  font-weight: 800;
  letter-spacing: 3px;
  background: linear-gradient(120deg, #fff 30%, #b9a6ff 55%, #00FFD1 85%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 10px;
  text-shadow: 0 0 40px rgba(155, 48, 255, 0.25);
}

.subtitle {
  font-size: 0.92rem;
  color: #8a8a94;
  font-weight: 500;
  letter-spacing: 2.5px;
  text-transform: uppercase;
}

/* ============= SEARCH ============= */
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 44px;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 15px 44px 15px 22px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: #fff;
  font-size: 15px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: rgba(0, 255, 209, 0.5);
  background: rgba(255, 255, 255, 0.05);
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

/* ============= PODIUM (top 3) ============= */
.podium {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 18px;
  margin-bottom: 56px;
  flex-wrap: wrap;
}

.podium-item {
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 26px 18px 20px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015));
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  position: relative;
  animation: podium-in 0.5s ease both;
}

.podium-item.gold { order: 2; padding-top: 34px; box-shadow: 0 0 50px rgba(255, 215, 0, 0.12); }
.podium-item.silver { order: 1; }
.podium-item.bronze { order: 3; }

.podium-item.gold { border-color: rgba(255, 215, 0, 0.35); }
.podium-item.silver { border-color: rgba(199, 201, 209, 0.3); }
.podium-item.bronze { border-color: rgba(205, 127, 50, 0.3); }

@keyframes podium-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.podium-medal {
  font-size: 2.4rem;
  line-height: 1;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.15));
}

.podium-avatar {
  width: 78px;
  height: 78px;
  border-radius: 18px;
  object-fit: cover;
  margin-bottom: 12px;
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.podium-avatar-fallback {
  width: 78px;
  height: 78px;
  border-radius: 18px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.8rem;
  background: rgba(255, 255, 255, 0.04);
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.podium-name {
  font-family: 'Sora', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.podium-id {
  font-size: 0.68rem;
  color: #6a6a72;
  margin-top: 2px;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}

.podium-grade {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 50px;
  border: 1px solid;
  margin-bottom: 10px;
}

.podium-points {
  font-size: 1.5rem;
  font-weight: 800;
  color: #00FFD1;
  margin-bottom: 6px;
}

.podium-medals {
  display: flex;
  gap: 5px;
  font-size: 1rem;
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
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.008));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
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
  .player-card, .podium-item { animation: none; }
}

.player-card:hover {
  transform: translateY(-4px);
  border-color: var(--grade-color, rgba(255, 255, 255, 0.2));
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.55), 0 0 0 1px var(--grade-color, transparent) inset;
}

/* Grade Badge — outline pill blended into the dark card */
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

/* Header row: avatar (skin Roblox) + noms */
.player-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 6px;
  margin-bottom: 18px;
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
  border-radius: 14px;
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
.player-info {
  min-width: 0;
}

.discord-name {
  font-family: 'Sora', 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.discord-id {
  font-size: 0.7rem;
  color: #55555c;
  margin-top: 2px;
  letter-spacing: 0.2px;
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
  margin-bottom: 14px;
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

/* Medailles */
.medals-row {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.medal-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 50px;
  padding: 3px 9px;
  cursor: default;
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
  background: rgba(255, 255, 255, 0.02);
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

  .podium {
    gap: 12px;
  }

  .podium-item {
    width: 100%;
    max-width: 280px;
  }

  .podium-item.gold, .podium-item.silver, .podium-item.bronze {
    order: initial;
  }
}
