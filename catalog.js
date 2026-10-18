/**
 * SmartZen E-Commerce - Product Catalog & Filter Controller
 */

const Catalog = {
  currentCategory: 'all',
  searchQuery: '',
  maxPrice: 20000000,
  currentSort: 'popular',

  init() {
    this.renderProducts();
    this.bindEvents();
    this.updateCategoryCounts();
  },

  updateCategoryCounts() {
    const counts = {
      all: SMARTZEN_PRODUCTS.length,
      lighting: SMARTZEN_PRODUCTS.filter(p => p.category === 'lighting').length,
      security: SMARTZEN_PRODUCTS.filter(p => p.category === 'security').length,
      robot: SMARTZEN_PRODUCTS.filter(p => p.category === 'robot').length,
      automation: SMARTZEN_PRODUCTS.filter(p => p.category === 'automation').length,
      hub: SMARTZEN_PRODUCTS.filter(p => p.category === 'hub').length,
    };

    Object.keys(counts).forEach(cat => {
      const el = document.querySelector(`.category-filter-btn[data-category="${cat}"] .cat-count`);
      if (el) el.textContent = counts[cat];
    });
  },

  getFilteredProducts() {
    return SMARTZEN_PRODUCTS.filter(product => {
      // Category filter
      if (this.currentCategory !== 'all' && product.category !== this.currentCategory) {
        return false;
      }
      // Price filter
      if (product.price > this.maxPrice) {
        return false;
      }
      // Search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchTagline = product.tagline.toLowerCase().includes(query);
        const matchCategory = product.categoryName.toLowerCase().includes(query);
        const matchFeatures = product.features.some(f => f.toLowerCase().includes(query));
        if (!matchName && !matchTagline && !matchCategory && !matchFeatures) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (this.currentSort === 'price-asc') return a.price - b.price;
      if (this.currentSort === 'price-desc') return b.price - a.price;
      if (this.currentSort === 'rating') return b.rating - a.rating;
      if (this.currentSort === 'discount') return b.discountPercent - a.discountPercent;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  },

  renderProducts() {
    const grid = document.getElementById('catalogProductsGrid');
    if (!grid) return;

    const products = this.getFilteredProducts();

    // Results count
    const countEl = document.getElementById('catalogResultsCount');
    if (countEl) countEl.textContent = `${products.length} sản phẩm phù hợp`;

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--cyan-neon);">🔍</div>
          <h3 style="color: var(--text-white); margin-bottom: 0.5rem;">Không tìm thấy sản phẩm phù hợp</h3>
          <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 1.5rem;">
            Hãy thử điều chỉnh lại mức giá lọc hoặc từ khóa tìm kiếm của bạn.
          </p>
          <button class="btn btn-secondary" onclick="Catalog.resetFilters()">
            Đặt Lại Bộ Lọc
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="product-thumb-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.badge ? `<span class="badge-tag product-badge-float pulse">${product.badge}</span>` : ''}
          <div class="product-quick-actions">
            <button class="btn-action-circle" onclick="Catalog.openQuickView('${product.id}')" title="Xem nhanh thông số">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button class="btn-action-circle" onclick="Catalog.quickAddToCart('${product.id}')" title="Thêm vào giỏ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <div class="product-category-label">${product.categoryName}</div>
          <h4 class="product-card-title" onclick="Catalog.openQuickView('${product.id}')">${product.name}</h4>
          <div class="product-meta-row">
            <div class="product-rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${product.rating}</span>
              <span style="color: var(--text-muted); font-size: 0.75rem;">(${product.reviewsCount})</span>
            </div>
            <div class="product-stock">Còn ${product.stock} máy</div>
          </div>
          <div class="product-card-footer">
            <div class="product-price-box">
              <span class="current-price">${formatCurrency(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
            </div>
            <button class="btn btn-outline-glow btn-icon" onclick="Catalog.quickAddToCart('${product.id}')" title="Mua ngay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  quickAddToCart(id) {
    const product = getProductById(id);
    if (product) {
      Cart.addItem(product, 1);
    }
  },

  openQuickView(id) {
    const product = getProductById(id);
    if (!product) return;

    const modal = document.getElementById('productQuickViewModal');
    if (!modal) return;

    // Populate modal
    document.getElementById('qvProductImg').src = product.image;
    document.getElementById('qvProductCategory').textContent = product.categoryName;
    document.getElementById('qvProductTitle').textContent = product.name;
    document.getElementById('qvProductRating').textContent = product.rating;
    document.getElementById('qvProductReviews').textContent = `(${product.reviewsCount} đánh giá xác thực)`;
    document.getElementById('qvProductPrice').textContent = formatCurrency(product.price);
    document.getElementById('qvProductOriginalPrice').textContent = product.originalPrice ? formatCurrency(product.originalPrice) : '';
    document.getElementById('qvProductDesc').textContent = product.shortDesc;

    // Features
    const featuresList = document.getElementById('qvProductFeatures');
    if (featuresList) {
      featuresList.innerHTML = product.features.map(f => `
        <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; color: var(--text-secondary); font-size: 0.88rem;">
          <span style="color: var(--cyan-neon);">✓</span> ${f}
        </li>
      `).join('');
    }

    // Specs table
    const specsTable = document.getElementById('qvProductSpecs');
    if (specsTable) {
      specsTable.innerHTML = Object.entries(product.specs).map(([key, val]) => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
          <td style="padding: 0.5rem 0; color: var(--text-muted); font-size: 0.82rem; width: 40%;">${key}</td>
          <td style="padding: 0.5rem 0; color: var(--text-white); font-weight: 600; font-size: 0.82rem;">${val}</td>
        </tr>
      `).join('');
    }

    // In the box
    const boxList = document.getElementById('qvProductBox');
    if (boxList) {
      boxList.innerHTML = product.inTheBox.map(item => `
        <span style="display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.78rem; color: var(--text-secondary); margin: 0.2rem 0.3rem 0.2rem 0;">
          📦 ${item}
        </span>
      `).join('');
    }

    // Set Add to Cart button action
    const addBtn = document.getElementById('qvAddToCartBtn');
    if (addBtn) {
      addBtn.onclick = () => {
        const qty = parseInt(document.getElementById('qvQtyInput')?.value || 1, 10);
        Cart.addItem(product, qty);
        modal.classList.remove('active');
        document.body.style.overflow = '';
      };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeQuickView() {
    const modal = document.getElementById('productQuickViewModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  resetFilters() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.maxPrice = 20000000;
    this.currentSort = 'popular';

    // Reset inputs
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) searchInput.value = '';

    const priceSlider = document.getElementById('priceRangeSlider');
    if (priceSlider) priceSlider.value = 20000000;

    const priceDisplay = document.getElementById('priceFilterMax');
    if (priceDisplay) priceDisplay.textContent = formatCurrency(20000000);

    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) sortSelect.value = 'popular';

    document.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === 'all');
    });

    this.renderProducts();
    showToast('Đã đặt lại bộ lọc tìm kiếm', 'info');
  },

  bindEvents() {
    // Category click
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
        this.renderProducts();
      });
    });

    // Realtime search
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        this.renderProducts();
      });
    }

    // Price range slider
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceDisplay = document.getElementById('priceFilterMax');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = parseInt(e.target.value, 10);
        if (priceDisplay) priceDisplay.textContent = formatCurrency(this.maxPrice);
        this.renderProducts();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderProducts();
      });
    }

    // Quickview close
    const qvCloseBtn = document.getElementById('qvModalClose');
    if (qvCloseBtn) {
      qvCloseBtn.addEventListener('click', () => this.closeQuickView());
    }

    const qvOverlay = document.getElementById('productQuickViewModal');
    if (qvOverlay) {
      qvOverlay.addEventListener('click', (e) => {
        if (e.target === qvOverlay) this.closeQuickView();
      });
    }
  }
};
