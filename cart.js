/**
 * SmartZen E-Commerce - Cart & Checkout System
 */

const Cart = {
  items: [],
  voucherDiscount: 0,
  activeVoucherCode: '',

  init() {
    this.loadFromStorage();
    this.render();
    this.bindEvents();
  },

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('smartzen_cart');
      if (saved) {
        this.items = JSON.parse(saved);
      }
      const savedVoucher = localStorage.getItem('smartzen_voucher');
      if (savedVoucher) {
        const vData = JSON.parse(savedVoucher);
        this.voucherDiscount = vData.discount || 0;
        this.activeVoucherCode = vData.code || '';
      }
    } catch (e) {
      console.warn('Cannot load cart from localStorage', e);
      this.items = [];
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem('smartzen_cart', JSON.stringify(this.items));
      localStorage.setItem('smartzen_voucher', JSON.stringify({
        code: this.activeVoucherCode,
        discount: this.voucherDiscount
      }));
    } catch (e) {
      console.warn('Cannot save cart to localStorage', e);
    }
  },

  addItem(product, qty = 1) {
    if (!product) return;
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty,
        category: product.categoryName || 'Thiết bị'
      });
    }
    this.saveToStorage();
    this.render();
    this.openDrawer();
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  },

  addCombo(combo) {
    if (!combo) return;
    const comboId = `combo-${combo.id}`;
    const existing = this.items.find(item => item.id === comboId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({
        id: comboId,
        name: combo.title,
        price: combo.price,
        image: combo.image,
        qty: 1,
        category: 'Combo Trọn Gói'
      });
    }
    this.saveToStorage();
    this.render();
    this.openDrawer();
    showToast(`Đã thêm trọn bộ "${combo.title}" vào giỏ hàng!`, 'success');
  },

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(id);
      return;
    }
    this.saveToStorage();
    this.render();
  },

  removeItem(id) {
    const item = this.items.find(i => i.id === id);
    this.items = this.items.filter(i => i.id !== id);
    this.saveToStorage();
    this.render();
    if (item) {
      showToast(`Đã xóa "${item.name}" khỏi giỏ hàng`, 'info');
    }
  },

  clearCart() {
    this.items = [];
    this.voucherDiscount = 0;
    this.activeVoucherCode = '';
    this.saveToStorage();
    this.render();
  },

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  getDiscountAmount() {
    const subtotal = this.getSubtotal();
    return Math.round(subtotal * (this.voucherDiscount / 100));
  },

  getTotal() {
    return Math.max(0, this.getSubtotal() - this.getDiscountAmount());
  },

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  applyVoucher(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'SMARTZEN2026' || cleanCode === 'AI2026' || cleanCode === 'TECHZEN') {
      this.voucherDiscount = 10;
      this.activeVoucherCode = cleanCode;
      this.saveToStorage();
      this.render();
      showToast(`Áp dụng mã ${cleanCode} thành công! Giảm ngay 10%`, 'success');
      return true;
    } else if (cleanCode === 'VIPZEN') {
      this.voucherDiscount = 15;
      this.activeVoucherCode = cleanCode;
      this.saveToStorage();
      this.render();
      showToast(`Mã VIPZEN áp dụng thành công! Giảm ngay 15%`, 'success');
      return true;
    } else {
      showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn!', 'danger');
      return false;
    }
  },

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  render() {
    // Badges update
    const badgeElements = document.querySelectorAll('.cart-badge');
    const totalCount = this.getTotalCount();
    badgeElements.forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    // Drawer items container
    const itemsContainer = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const discountEl = document.getElementById('cartDiscount');
    const totalEl = document.getElementById('cartTotal');
    const discountRow = document.getElementById('cartDiscountRow');
    const emptyState = document.getElementById('cartEmptyState');
    const cartFooter = document.getElementById('cartDrawerFooter');

    if (!itemsContainer) return;

    if (this.items.length === 0) {
      itemsContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'flex';

    itemsContainer.innerHTML = this.items.map(item => `
      <div class="cart-item-card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h5>${item.name}</h5>
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
          <div class="cart-qty-picker">
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}', -1)" title="Giảm số lượng">-</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}', 1)" title="Tăng số lượng">+</button>
          </div>
        </div>
        <button class="btn-action-circle" onclick="Cart.removeItem('${item.id}')" title="Xóa khỏi giỏ" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.3);">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `).join('');

    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    const total = this.getTotal();

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (totalEl) totalEl.textContent = formatCurrency(total);

    if (discountRow) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        if (discountEl) discountEl.textContent = `-${formatCurrency(discount)} (${this.voucherDiscount}%)`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  },

  bindEvents() {
    // Cart open trigger
    document.querySelectorAll('.cart-btn-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close button
    const closeBtn = document.getElementById('cartDrawerClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    // Overlay click
    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeDrawer());
    }

    // Voucher form
    const voucherBtn = document.getElementById('applyVoucherBtn');
    const voucherInput = document.getElementById('voucherInput');
    if (voucherBtn && voucherInput) {
      voucherBtn.addEventListener('click', () => {
        this.applyVoucher(voucherInput.value);
      });
      voucherInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.applyVoucher(voucherInput.value);
        }
      });
    }

    // Checkout button
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.items.length === 0) {
          showToast('Giỏ hàng đang trống!', 'warning');
          return;
        }
        this.closeDrawer();
        openCheckoutModal();
      });
    }
  }
};

/**
 * Checkout Modal & Payment Processing
 */
function openCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  const total = Cart.getTotal();
  const checkoutTotalEl = document.getElementById('checkoutModalTotal');
  if (checkoutTotalEl) checkoutTotalEl.textContent = formatCurrency(total);

  // Set default QR amount and order code
  const orderCode = 'SZ' + Math.floor(100000 + Math.random() * 900000);
  const orderCodeEl = document.getElementById('checkoutOrderCode');
  if (orderCodeEl) orderCodeEl.textContent = orderCode;

  // Generate VietQR URL: Vietinbank / MBBank / Techcombank format
  // https://img.vietqr.io/image/970422-0398888999-compact2.png?amount=XXX&addInfo=SZ123456&accountName=SMARTZEN%20VIETNAM
  const qrImg = document.getElementById('vietqrImage');
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=2|99|0908888999|SmartZen%20Technologies|info@smartzen.vn|0|0|${total}|${orderCode}|transfer_myqr`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function processPaymentSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fullName = form.querySelector('[name="checkout_name"]').value.trim();
  const phone = form.querySelector('[name="checkout_phone"]').value.trim();
  const address = form.querySelector('[name="checkout_address"]').value.trim();
  const paymentMethod = form.querySelector('[name="payment_method"]:checked')?.value || 'vietqr';

  if (!fullName || !phone || !address) {
    showToast('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ giao hàng!', 'warning');
    return;
  }

  const orderCode = document.getElementById('checkoutOrderCode')?.textContent || 'SZ889921';
  const total = Cart.getTotal();

  // Close checkout modal and show success screen
  closeCheckoutModal();
  Cart.clearCart();

  showOrderSuccessModal({
    orderCode: orderCode,
    fullName: fullName,
    phone: phone,
    address: address,
    total: total,
    paymentMethod: paymentMethod
  });
}

function showOrderSuccessModal(orderData) {
  const modal = document.getElementById('orderSuccessModal');
  if (!modal) {
    showToast(`Đặt hàng thành công! Mã đơn: ${orderData.orderCode}`, 'success');
    return;
  }

  document.getElementById('successOrderCode').textContent = orderData.orderCode;
  document.getElementById('successCustomerName').textContent = orderData.fullName;
  document.getElementById('successPhone').textContent = orderData.phone;
  document.getElementById('successAddress').textContent = orderData.address;
  document.getElementById('successAmount').textContent = formatCurrency(orderData.total);

  let methodLabel = 'Chuyển khoản QR Ngân hàng';
  if (orderData.paymentMethod === 'cod') methodLabel = 'Thanh toán tiền mặt khi nhận hàng (COD)';
  if (orderData.paymentMethod === 'momo') methodLabel = 'Ví điện tử MoMo';
  if (orderData.paymentMethod === 'vnpay') methodLabel = 'Cổng VNPay-QR';
  document.getElementById('successMethod').textContent = methodLabel;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
  const modal = document.getElementById('orderSuccessModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
