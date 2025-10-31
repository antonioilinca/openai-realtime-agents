/**
 * UI manager controls menus, HUD updates, and local storage integration for
 * leaderboard and skin unlocks.
 */
export class UIManager {
  constructor() {
    this.hudRoot = document.getElementById('hud');
    this.menus = document.querySelectorAll('.menu');
    this.currentMenu = document.querySelector('#main-menu');
    this.skinsGrid = document.querySelector('.skins-grid');
    this.summaryNode = document.querySelector('#post-menu .summary');
    this.leaderboardNode = document.querySelector('.leaderboard-list');
    this.musicVolumeSlider = document.getElementById('music-volume');
    this.fxVolumeSlider = document.getElementById('fx-volume');
    this.multiplayerToggle = document.getElementById('multiplayer-toggle');
    this.hudRoot.innerHTML = '';
    this.createHud();
    this.bindMenuButtons();
  }

  /** Build HUD layout dynamically to keep markup minimal */
  createHud() {
    this.topRow = document.createElement('div');
    this.bottomRow = document.createElement('div');
    this.topRow.className = 'top-row';
    this.bottomRow.className = 'bottom-row';

    this.scorePanel = document.createElement('div');
    this.scorePanel.className = 'panel score';
    this.scorePanel.textContent = 'Score: 0';

    this.levelPanel = document.createElement('div');
    this.levelPanel.className = 'panel level';
    this.levelPanel.textContent = 'Level 1';

    this.comboPanel = document.createElement('div');
    this.comboPanel.className = 'panel combo';
    this.comboPanel.innerHTML = '<span>Combo x1</span>';

    this.powerPanel = document.createElement('div');
    this.powerPanel.className = 'panel power-ups';

    this.messagePanel = document.createElement('div');
    this.messagePanel.className = 'panel message';
    this.messagePanel.textContent = 'Swipe or use arrow keys to move.';

    this.topRow.appendChild(this.scorePanel);
    this.topRow.appendChild(this.levelPanel);
    this.bottomRow.appendChild(this.comboPanel);
    this.bottomRow.appendChild(this.powerPanel);

    this.hudRoot.appendChild(this.topRow);
    this.hudRoot.appendChild(this.bottomRow);
    this.hudRoot.appendChild(this.messagePanel);
  }

  /** Attach listeners for each button in the menus */
  bindMenuButtons() {
    document.querySelectorAll('button[data-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
        this.onAction?.(action);
      });
    });
  }

  /** Register callback for UI actions */
  on(handler) {
    this.onAction = handler;
  }

  /**
   * Update HUD components.
   * @param {object} data - current game stats
   */
  updateHud(data) {
    this.scorePanel.textContent = `Score: ${data.score}`;
    this.levelPanel.textContent = `Level ${data.level}`;
    this.comboPanel.innerHTML = `<span>Combo x${data.combo.multiplier.toFixed(1)}</span>`;

    this.updatePowerUps(data.powerUps);
    this.messagePanel.textContent = data.message;
  }

  /** Render active power-ups with progress bars */
  updatePowerUps(powerUps) {
    this.powerPanel.innerHTML = '';
    powerUps.forEach((power) => {
      const node = document.createElement('div');
      node.className = 'power-up-indicator';
      node.innerHTML = `
        <span>${power.label}</span>
        <div class="power-up-progress" style="--progress:${power.remaining / power.duration}"></div>
      `;
      const progress = Math.max(0, Math.min(1, power.remaining / power.duration));
      const progressNode = node.querySelector('.power-up-progress');
      progressNode.style.setProperty('--progress', progress.toString());
      this.powerPanel.appendChild(node);
    });
  }

  /** Display message text */
  setMessage(text) {
    this.messagePanel.textContent = text;
  }

  /**
   * Toggle menu visibility.
   * @param {string} id - id of the menu to show
   */
  showMenu(id) {
    this.menus.forEach((menu) => menu.classList.remove('active'));
    const next = document.getElementById(id);
    if (next) {
      next.classList.add('active');
      this.currentMenu = next;
    }
  }

  /** Hide menus entirely (for in-game) */
  hideMenus() {
    this.menus.forEach((menu) => menu.classList.remove('active'));
  }

  /** Populate skin list with unlock thresholds */
  renderSkins(skins, score) {
    this.skinsGrid.innerHTML = '';
    Object.keys(skins).forEach((id) => {
      const skin = skins[id];
      if (skin.hidden) return;
      const card = document.createElement('div');
      card.className = 'skin-card';
      if (score < skin.unlockScore) card.classList.add('locked');
      card.innerHTML = `
        <h3>${skin.name}</h3>
        <p>Unlock at ${skin.unlockScore} pts</p>
        <div class="preview"></div>
      `;
      const preview = card.querySelector('.preview');
      skin.colors.forEach((color) => {
        const span = document.createElement('span');
        span.style.background = color;
        preview.appendChild(span);
      });
      card.addEventListener('click', () => {
        if (score >= skin.unlockScore) {
          this.onAction?.('select-skin', id);
        }
      });
      this.skinsGrid.appendChild(card);
    });
  }

  /** Update leaderboard using localStorage */
  updateLeaderboard(entries) {
    this.leaderboardNode.innerHTML = '';
    entries
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .forEach((entry) => {
        const item = document.createElement('li');
        item.textContent = `${entry.name} — ${entry.score}`;
        this.leaderboardNode.appendChild(item);
      });
  }

  /** Update settings controls state */
  setSettings({ musicVolume, fxVolume, multiplayer }) {
    this.musicVolumeSlider.value = musicVolume;
    this.fxVolumeSlider.value = fxVolume;
    this.multiplayerToggle.checked = multiplayer;
  }

  /** Provide access to settings controls */
  getSettingsControls() {
    return {
      music: this.musicVolumeSlider,
      fx: this.fxVolumeSlider,
      multiplayer: this.multiplayerToggle
    };
  }

  /** Display post-game summary */
  showSummary({ score, level, comboPeak }) {
    this.summaryNode.innerHTML = `
      <p><strong>Score:</strong> ${score}</p>
      <p><strong>Level Reached:</strong> ${level}</p>
      <p><strong>Max Combo:</strong> x${comboPeak.toFixed(1)}</p>
    `;
    this.showMenu('post-menu');
  }
}
