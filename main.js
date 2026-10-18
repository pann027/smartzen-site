/**
 * SmartZen E-Commerce - Main Application Logic
 */

// Global Toast System
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;

  let icon = '⚡';
  if (type === 'success') icon = '✓';
  if (type === 'warning') icon = '⚠️';
  if (type === 'danger') icon = '✕';

  toast.innerHTML = `
    <span style="font-weight: 800; color: var(--cyan-neon);">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-30px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Render Combos Section
function renderCombosSection() {
  const container = document.getElementById('combosGrid');
  if (!container) return;

  container.innerHTML = SMARTZEN_COMBOS.map(combo => `
    <div class="combo-card glass-card" data-combo-id="${combo.id}">
      <div class="combo-image-wrap">
        <img src="${combo.image}" alt="${combo.title}" loading="lazy">
        <span class="badge-tag combo-badge-floating pulse">${combo.badge}</span>
        <span class="combo-savings-pill">Tiết kiệm ${formatCurrency(combo.savings)}</span>
      </div>
      <div class="combo-body">
        <div class="combo-target">${combo.targetSpace} • ${combo.suitableArea}</div>
        <h3 class="combo-title">${combo.title}</h3>
        <p class="combo-desc">${combo.description}</p>

        <div class="combo-items-list">
          <div class="combo-items-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            Bộ thiết bị đồng bộ đi kèm:
          </div>
          <ul>
            ${combo.includedItems.map(item => `
              <li>
                <span>${item.name}</span>
                <span class="qty">x${item.qty}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="combo-footer">
          <div class="combo-pricing">
            <span class="combo-current-price">${formatCurrency(combo.price)}</span>
            <span class="combo-original-price">${formatCurrency(combo.originalPrice)}</span>
          </div>
          <div style="display: flex; gap: 0.6rem;">
            <button class="btn btn-secondary" onclick="openComboDetailModal('${combo.id}')" title="Xem chi tiết">
              Chi Tiết
            </button>
            <button class="btn btn-primary" onclick="Cart.addCombo(getComboById('${combo.id}'))">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Chọn Combo
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Combo Detail Modal
function openComboDetailModal(comboId) {
  const combo = getComboById(comboId);
  if (!combo) return;

  const modal = document.getElementById('comboDetailModal');
  if (!modal) return;

  document.getElementById('comboModalImg').src = combo.image;
  document.getElementById('comboModalBadge').textContent = combo.badge;
  document.getElementById('comboModalTitle').textContent = combo.title;
  document.getElementById('comboModalSubtitle').textContent = combo.subtitle;
  document.getElementById('comboModalDesc').textContent = combo.description;
  document.getElementById('comboModalPrice').textContent = formatCurrency(combo.price);
  document.getElementById('comboModalOriginalPrice').textContent = formatCurrency(combo.originalPrice);
  document.getElementById('comboModalSavings').textContent = `Tiết kiệm ngay ${formatCurrency(combo.savings)}`;

  // Included Items
  const itemsList = document.getElementById('comboModalItems');
  if (itemsList) {
    itemsList.innerHTML = combo.includedItems.map(item => `
      <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
        <span style="color: var(--text-white);">• ${item.name}</span>
        <span class="qty" style="color: var(--cyan-neon); font-weight: 700;">x${item.qty}</span>
      </li>
    `).join('');
  }

  // Perks
  const perksList = document.getElementById('comboModalPerks');
  if (perksList) {
    perksList.innerHTML = combo.perks.map(perk => `
      <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; color: var(--text-secondary); font-size: 0.85rem;">
        <span style="color: var(--status-success);">✓</span> ${perk}
      </li>
    `).join('');
  }

  // Buy button
  const buyBtn = document.getElementById('comboModalBuyBtn');
  if (buyBtn) {
    buyBtn.onclick = () => {
      Cart.addCombo(combo);
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeComboModal() {
  const modal = document.getElementById('comboDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Mobile Menu Navigation
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

// Sticky Header & Active Nav on Scroll
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scrollspy active state
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderCombosSection();
  initMobileMenu();
  initScrollEffects();

  // Initialize Submodules
  Cart.init();
  Catalog.init();
  DifyChatbot.init();
  SurveyController.init();

  console.log('SmartZen E-Commerce Platform loaded successfully!');
});
