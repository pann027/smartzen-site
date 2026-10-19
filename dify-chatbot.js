/**
 * SmartZen E-Commerce - AI Chatbot Solution Advisor (Tích hợp Dify AI)
 * Features:
 * - Multi-step Consultation Flow: Room Area -> Budget -> Priority Need -> Recommended Combo
 * - Automated 3D/Animated Installation Video Simulator
 * - 8 Core Conversational Intents (Brand Truth Pack & Curriculum Compliant)
 * - Human-in-the-Loop Handoff
 * - Real Dify AI API / Webhook Bridge Settings
 */

const DifyChatbot = {
  isOpen: false,
  activeMode: 'advisor', // 'advisor', 'freechat', 'dify-live'
  
  // Consultation State
  consultationState: {
    step: 0, // 0: Start, 1: Area, 2: Budget, 3: Need, 4: Recommended
    area: null,
    budget: null,
    need: null,
    recommendedCombo: null
  },

  // Simulated Video Player State
  videoPlayer: {
    currentStep: 1,
    isPlaying: false,
    timer: null,
    steps: [
      {
        num: 1,
        title: "Bước 1: Khởi động Bộ não Matter Core Hub Ultra",
        desc: "Cắm nguồn Type-C 5V và cắm dây mạng LAN vào router. Đèn LED trên Hub chuyển sang màu xanh Cyan báo hiệu mạng Mesh Thread/Zigbee đã sẵn sàng phủ sóng toàn nhà.",
        time: "0:15",
        status: "Đã kết nối Matter Mesh"
      },
      {
        num: 2,
        title: "Bước 2: Gắn Cảm Biến mmWave & Lắp Khóa FaceID Pro",
        desc: "Gắn cảm biến hiện diện mmWave lên góc trần phòng khách (đế hít nam châm 3M). Lắp đặt ruột khóa Inox 304 C-Level và kết nối cáp tín hiệu nhận diện gương mặt 3D.",
        time: "0:45",
        status: "Cảm biến đã nhận diện cử động"
      },
      {
        num: 3,
        title: "Bước 3: Đấu nối Công Tắc Cảm Ứng & Rèm Tự Động",
        desc: "Gắn mặt công tắc kính cường lực vào đế âm chữ nhật hiện có (hỗ trợ cả line L đơn không cần dây nguội N). Lắp động cơ SilentCurtain Pro vào ray nhôm trượt siêu êm.",
        time: "1:20",
        status: "Công tắc haptic sẵn sàng"
      },
      {
        num: 4,
        title: "Bước 4: Đồng Bộ Ứng Dụng SmartZen Trong 30 Giây",
        desc: "Mở app SmartZen trên iPhone/Android, quét mã QR Matter in trên nắp hộp. Toàn bộ thiết bị tự động gom nhóm theo từng phòng và tạo sẵn kịch bản thông minh!",
        time: "1:50",
        status: "Hệ thống vận hành 100% Hoàn Tất"
      }
    ]
  },

  // Dify Custom Configuration
  difyConfig: {
    apiUrl: localStorage.getItem('dify_api_url') || '',
    apiKey: localStorage.getItem('dify_api_key') || '',
    botToken: localStorage.getItem('dify_bot_token') || '',
    isEnabled: localStorage.getItem('dify_is_enabled') === 'true'
  },

  init() {
    this.bindEvents();
    this.renderWelcome();
  },

  toggleWindow() {
    this.isOpen = !this.isOpen;
    const win = document.getElementById('chatbotWindow');
    const badge = document.getElementById('chatUnreadBadge');
    if (win) {
      win.classList.toggle('active', this.isOpen);
      if (this.isOpen && badge) {
        badge.style.display = 'none';
      }
    }
  },

  setMode(mode) {
    this.activeMode = mode;
    document.querySelectorAll('.chat-mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    if (mode === 'advisor') {
      this.resetConsultation();
    } else if (mode === 'freechat') {
      this.addBotMessage(`
        👋 Chào bạn! Tôi là <strong>SmartZen AI Advisor</strong> — hỗ trợ 8 nhóm câu hỏi chính:<br><br>
        • 🏠 <strong>Giới thiệu SmartZen</strong> — thương hiệu, hệ sinh thái<br>
        • 📦 <strong>Tìm hiểu sản phẩm</strong> — đèn, robot, khóa, camera, cảm biến...<br>
        • ⚙️ <strong>Thông số kỹ thuật</strong> — specs, giao thức Matter/Zigbee, AI...<br>
        • 🛠️ <strong>Hướng dẫn sử dụng</strong> — cài đặt, lắp đặt, kết nối app<br>
        • 🛡️ <strong>Chính sách bảo hành</strong> — 24T 1đổi1, đổi trả 30 ngày<br>
        • 💰 <strong>Giá cả & Khuyến mãi</strong> — báo giá, voucher, combo<br>
        • 😅 <strong>Ngoài phạm vi</strong> — tự nhận biết và từ chối lịch sự<br>
        • 🧑‍💼 <strong>Gặp tư vấn viên thật</strong> — Human Handoff tức thì<br><br>
        Hãy gõ câu hỏi hoặc chọn nhanh bên dưới:
      `, [
        { label: "👋 SmartZen là gì?", action: "ask_brand_info" },
        { label: "🏠 Sản phẩm SmartZen", action: "open_catalog" },
        { label: "💰 Báo giá & Khuyến mãi", action: "ask_pricing" },
        { label: "🛠️ Hướng dẫn cài đặt", action: "ask_install" },
        { label: "🛡️ Chính sách bảo hành", action: "ask_warranty" },
        { label: "🧑‍💼 Gặp tư vấn viên thật", action: "ask_handoff" }
      ]);
    } else if (mode === 'dify-settings') {
      this.renderDifySettingsView();
    }
  },

  renderWelcome() {
    const container = document.getElementById('chatMessagesContainer');
    if (!container) return;
    container.innerHTML = '';

    this.consultationState.step = 1;
    this.addBotMessage(`
      Xin chào! Tôi là <strong>SmartZen AI Advisor</strong> 🤖 (Tích hợp Dify AI).
      <br>Tôi sẽ phân tích không gian và ngân sách của bạn để đề xuất <strong>Combo Nhà Thông Minh tối ưu nhất</strong> kèm video mô phỏng lắp đặt tự động.
      <br><br>👉 <strong>Bước 1/3: Diện tích không gian sống của bạn là bao nhiêu?</strong>
    `, [
      { label: "🏠 Căn hộ nhỏ (< 45m²)", action: "area_small", data: { text: "Dưới 45m²", val: "small" } },
      { label: "🏢 Căn hộ 2PN (45 - 80m²)", action: "area_medium", data: { text: "45 - 80m²", val: "medium" } },
      { label: "🏙️ Căn hộ 3PN (80 - 130m²)", action: "area_large", data: { text: "80 - 130m²", val: "large" } },
      { label: "🏰 Biệt thự / Nhà phố (> 130m²)", action: "area_villa", data: { text: "Trên 130m² (Nhiều tầng)", val: "villa" } }
    ]);
  },

  resetConsultation() {
    this.consultationState = {
      step: 0,
      area: null,
      budget: null,
      need: null,
      recommendedCombo: null
    };
    this.renderWelcome();
  },

  handleOptionClick(action, data) {
    if (action.startsWith('area_')) {
      this.consultationState.area = data;
      this.addUserMessage(`Diện tích: ${data.text}`);
      this.consultationState.step = 2;

      setTimeout(() => {
        this.addBotMessage(`
          Rất tuyệt! Với diện tích <strong>${data.text}</strong>, chúng ta sẽ tối ưu vùng phủ sóng sóng Matter & Zigbee.
          <br><br>👉 <strong>Bước 2/3: Mức ngân sách dự kiến của bạn là bao nhiêu?</strong>
        `, [
          { label: "💵 Tiết kiệm (< 10 Triệu)", action: "budget_tier1", data: { text: "< 10 Triệu VNĐ", max: 10000000 } },
          { label: "💳 Tiêu chuẩn (10 - 25 Triệu)", action: "budget_tier2", data: { text: "10 - 25 Triệu VNĐ", max: 25000000 } },
          { label: "💎 Nâng cao (25 - 50 Triệu)", action: "budget_tier3", data: { text: "25 - 50 Triệu VNĐ", max: 50000000 } },
          { label: "👑 Flagship Luxury (> 50 Triệu)", action: "budget_tier4", data: { text: "> 50 Triệu VNĐ", max: 99999999 } }
        ]);
      }, 350);

    } else if (action.startsWith('budget_')) {
      this.consultationState.budget = data;
      this.addUserMessage(`Ngân sách: ${data.text}`);
      this.consultationState.step = 3;

      setTimeout(() => {
        this.addBotMessage(`
          Đã ghi nhận ngân sách <strong>${data.text}</strong>.
          <br><br>👉 <strong>Bước 3/3: Nhu cầu trọng tâm bạn muốn ưu tiên nhất là gì?</strong>
        `, [
          { label: "🛡️ An ninh chống trộm & Báo khói", action: "need_security", data: { text: "An ninh 24/7 & Cảnh báo an toàn", type: "security" } },
          { label: "✨ Giải trí ánh sáng Ambient & Rèm chill", action: "need_entertainment", data: { text: "Giải trí & Ánh sáng Ambient", type: "entertainment" } },
          { label: "🤖 Sàn nhà sạch sẽ tự động & Tiện nghi", action: "need_robot", data: { text: "Robot hút bụi & Tự động hóa", type: "robot" } },
          { label: "⚡ Tự động hóa toàn diện All-in-One", action: "need_all", data: { text: "Trọn gói All-in-One toàn căn hộ", type: "all" } }
        ]);
      }, 350);

    } else if (action.startsWith('need_')) {
      this.consultationState.need = data;
      this.addUserMessage(`Nhu cầu ưu tiên: ${data.text}`);
      this.consultationState.step = 4;

      // Show AI Computing Simulation
      this.showAIComputing(() => {
        this.generateRecommendation();
      });

    } else if (action === 'ask_pricing') {
      this.handleUserText('Báo giá sản phẩm và khuyến mãi');
    } else if (action === 'ask_install') {
      this.handleUserText('Hướng dẫn kỹ thuật lắp đặt');
    } else if (action === 'ask_survey') {
      this.handleUserText('Đặt lịch khảo sát tận nơi');
    } else if (action === 'ask_warranty') {
      this.handleUserText('Chính sách bảo hành đổi trả');
    } else if (action === 'ask_handoff') {
      this.handleUserText('Gặp tư vấn viên người thật');
    }
  },

  showAIComputing(callback) {
    const container = document.getElementById('chatMessagesContainer');
    const loadingId = 'ai-calc-' + Date.now();
    const loadingEl = document.createElement('div');
    loadingEl.className = 'chat-message bot';
    loadingEl.id = loadingId;
    loadingEl.innerHTML = `
      <div class="msg-avatar">⚡</div>
      <div class="msg-bubble" style="border-color: var(--cyan-neon);">
        <div style="display: flex; align-items: center; gap: 0.6rem; color: var(--cyan-neon); font-weight: 600;">
          <span class="badge-tag pulse" style="font-size: 0.72rem;">Dify AI Engine</span>
          <span>Đang phân tích cấu hình tối ưu...</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.4rem;" id="aiCalcLog">
          • Truy xuất tri thức SmartZen Truth Pack...<br>
          • Tính toán công suất và bán kính phủ sóng Zigbee...<br>
          • Tối ưu chi phí theo ngân sách ${this.consultationState.budget.text}...
        </div>
      </div>
    `;
    container.appendChild(loadingEl);
    this.scrollToBottom();

    setTimeout(() => {
      const el = document.getElementById(loadingId);
      if (el) el.remove();
      if (callback) callback();
    }, 1200);
  },

  generateRecommendation() {
    const area = this.consultationState.area.val;
    const need = this.consultationState.need.type;
    const budget = this.consultationState.budget.max;

    // Pick combo matching logic
    let selectedCombo = null;
    if (area === 'villa' || budget >= 50000000) {
      selectedCombo = getComboById('combo-luxury-villa');
    } else if (need === 'security') {
      selectedCombo = getComboById('combo-an-ninh');
    } else if (need === 'entertainment') {
      selectedCombo = getComboById('combo-phong-khach');
    } else {
      selectedCombo = getComboById('combo-can-ho');
    }

    this.consultationState.recommendedCombo = selectedCombo;

    const botMsgHtml = `
      🎉 Dựa trên diện tích <strong>${this.consultationState.area.text}</strong>, ngân sách <strong>${this.consultationState.budget.text}</strong> và nhu cầu <strong>${this.consultationState.need.text}</strong>:
      <br><br>
      SmartZen AI trân trọng đề xuất gói giải pháp tối ưu nhất cho bạn:
      
      <div class="chat-combo-recommend-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge-tag pulse" style="font-size: 0.68rem;">Đề xuất AI độc quyền</span>
          <span style="color: var(--status-success); font-weight: 700; font-size: 0.8rem;">Tiết kiệm ${formatCurrency(selectedCombo.savings)}</span>
        </div>
        <h4 class="chat-combo-title" style="margin-top: 0.4rem;">${selectedCombo.title}</h4>
        <div class="chat-combo-meta">${selectedCombo.subtitle}</div>

        <div style="margin: 0.6rem 0;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Các thiết bị trong gói:</div>
          ${selectedCombo.includedItems.map(item => `
            <div class="chat-combo-item-row">
              <span>• ${item.name}</span>
              <span style="color: var(--cyan-neon); font-weight: 600;">x${item.qty}</span>
            </div>
          `).join('')}
        </div>

        <div class="chat-combo-total-row">
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-decoration: line-through;">${formatCurrency(selectedCombo.originalPrice)}</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--cyan-neon); font-family: var(--font-tech);">${formatCurrency(selectedCombo.price)}</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="DifyChatbot.addComboToCart('${selectedCombo.id}')" style="padding: 0.5rem 1rem; font-size: 0.82rem;">
            🛒 Thêm Vào Giỏ
          </button>
        </div>
      </div>

      <div style="margin-top: 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
          <strong style="color: var(--text-white); font-size: 0.88rem;">📺 Video Mô Phỏng Lắp Đặt Tự Động:</strong>
          <span style="font-size: 0.72rem; color: var(--cyan-neon);">Tự làm (DIY) trong 15 phút</span>
        </div>
        ${this.generateVideoPlayerHtml()}
      </div>
    `;

    this.addBotMessage(botMsgHtml, [
      { label: "📐 Đặt lịch khảo sát tại nhà", action: "ask_survey" },
      { label: "🔄 Tư vấn lại cấu hình khác", action: "restart_consult" },
      { label: "🧑‍💼 Gặp chuyên viên kỹ thuật", action: "ask_handoff" }
    ]);
  },

  generateVideoPlayerHtml() {
    const curStep = this.videoPlayer.steps[this.videoPlayer.currentStep - 1];
    return `
      <div class="simulation-video-player" id="simVideoPlayerBox">
        <div class="sim-canvas-viewport">
          <svg class="sim-diagram-svg" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00F0FF" />
                <stop offset="100%" stop-color="#0066FF" />
              </linearGradient>
            </defs>
            <!-- Background Grid -->
            <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(0,240,255,0.1)" stroke-width="1" />
            <line x1="200" y1="0" x2="200" y2="180" stroke="rgba(0,240,255,0.1)" stroke-width="1" />
            
            <!-- Step Specific Diagrams -->
            ${this.getVideoStepSvg(this.videoPlayer.currentStep)}
          </svg>
          <button class="sim-video-overlay-btn" onclick="DifyChatbot.toggleVideoPlayback()" title="Phát mô phỏng">
            ${this.videoPlayer.isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
        <div style="padding: 0.8rem; background: rgba(14, 20, 36, 0.95); border-top: 1px solid rgba(0, 240, 255, 0.2);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <span class="sim-step-indicator" id="simStepLabel">${curStep.title}</span>
            <span style="color: var(--text-muted); font-size: 0.72rem;" id="simTimeLabel">${curStep.time} / 2:00</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;" id="simStepDesc">${curStep.desc}</p>
        </div>
        <div class="sim-controls-bar">
          <div style="display: flex; gap: 0.4rem;">
            ${this.videoPlayer.steps.map(s => `
              <button class="qty-btn" style="width: 22px; height: 22px; font-size: 0.7rem; ${s.num === this.videoPlayer.currentStep ? 'background: var(--cyan-neon); color: #000; font-weight: 700;' : ''}" 
                onclick="DifyChatbot.jumpVideoStep(${s.num})">
                ${s.num}
              </button>
            `).join('')}
          </div>
          <span style="color: var(--status-success); font-size: 0.75rem;" id="simStatusPill">✓ ${curStep.status}</span>
        </div>
      </div>
    `;
  },

  getVideoStepSvg(step) {
    if (step === 1) {
      return `
        <!-- Hub Setup -->
        <rect x="160" y="50" width="80" height="80" rx="16" fill="#0C1428" stroke="#00F0FF" stroke-width="2" />
        <circle cx="200" cy="90" r="16" fill="#00F0FF" opacity="0.8" />
        <circle cx="200" cy="90" r="28" fill="none" stroke="#00F0FF" stroke-width="1.5" stroke-dasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" from="0 200 90" to="360 200 90" dur="8s" repeatCount="indefinite" />
        </circle>
        <text x="200" y="150" fill="#00F0FF" font-size="11" text-anchor="middle" font-family="sans-serif">Matter Core Hub (Ready)</text>
      `;
    } else if (step === 2) {
      return `
        <!-- Sensor & Lock -->
        <circle cx="120" cy="90" r="30" fill="#0C1428" stroke="#00F0FF" stroke-width="2" />
        <path d="M120 75 L120 105 M105 90 L135 90" stroke="#00F0FF" stroke-width="2" />
        <text x="120" y="145" fill="#FFF" font-size="10" text-anchor="middle">Cảm Biến mmWave</text>

        <line x1="160" y1="90" x2="240" y2="90" stroke="#00F0FF" stroke-width="2" stroke-dasharray="4 2" />

        <rect x="250" y="60" width="40" height="65" rx="6" fill="#0C1428" stroke="#8B5CF6" stroke-width="2" />
        <circle cx="270" cy="85" r="8" fill="#8B5CF6" />
        <text x="270" y="145" fill="#FFF" font-size="10" text-anchor="middle">Khóa FaceID</text>
      `;
    } else if (step === 3) {
      return `
        <!-- Switch & Curtains -->
        <rect x="110" y="60" width="60" height="60" rx="8" fill="#0C1428" stroke="#00F0FF" stroke-width="2" />
        <circle cx="140" cy="80" r="6" fill="#00F0FF" />
        <circle cx="140" cy="100" r="6" fill="#00F0FF" />
        <text x="140" y="145" fill="#FFF" font-size="10" text-anchor="middle">Công Tắc Kính</text>

        <path d="M230 65 Q270 50 310 65 L310 120 Q270 105 230 120 Z" fill="rgba(139, 92, 246, 0.2)" stroke="#8B5CF6" stroke-width="2" />
        <text x="270" y="145" fill="#FFF" font-size="10" text-anchor="middle">Rèm Tự Động 20dB</text>
      `;
    } else {
      return `
        <!-- App QR Sync -->
        <rect x="170" y="45" width="60" height="90" rx="10" fill="#0C1428" stroke="#00F0FF" stroke-width="2" />
        <rect x="180" y="60" width="40" height="40" fill="none" stroke="#00F0FF" stroke-width="1.5" />
        <circle cx="200" cy="80" r="8" fill="#00F0FF" />
        <text x="200" y="155" fill="#00F0FF" font-size="11" text-anchor="middle" font-weight="bold">Đồng Bộ 100% Hoàn Tất</text>
      `;
    }
  },

  toggleVideoPlayback() {
    this.videoPlayer.isPlaying = !this.videoPlayer.isPlaying;
    const playBtn = document.querySelector('.sim-video-overlay-btn');
    if (playBtn) playBtn.textContent = this.videoPlayer.isPlaying ? '❚❚' : '▶';

    if (this.videoPlayer.isPlaying) {
      this.videoPlayer.timer = setInterval(() => {
        let nextStep = this.videoPlayer.currentStep + 1;
        if (nextStep > 4) nextStep = 1;
        this.jumpVideoStep(nextStep);
      }, 3000);
      showToast('Đang phát video mô phỏng lắp đặt tự động SmartZen...', 'info');
    } else {
      clearInterval(this.videoPlayer.timer);
    }
  },

  jumpVideoStep(stepNum) {
    this.videoPlayer.currentStep = stepNum;
    const playerBox = document.getElementById('simVideoPlayerBox');
    if (playerBox) {
      playerBox.outerHTML = this.generateVideoPlayerHtml();
    }
  },

  addComboToCart(comboId) {
    const combo = getComboById(comboId);
    if (combo) {
      Cart.addCombo(combo);
      this.addBotMessage(`
        Đã thêm <strong>${combo.title}</strong> vào giỏ hàng thành công!
        <br>Bạn có thể mở giỏ hàng để hoàn tất thanh toán hoặc đặt lịch khảo sát tại nhà miễn phí.
      `, [
        { label: "💳 Mở giỏ hàng thanh toán", action: "open_cart" },
        { label: "📐 Đặt lịch khảo sát tận nơi", action: "ask_survey" }
      ]);
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // 8 Core Intents NLP Engine — SmartZen AI Advisor (Curriculum Compliant)
  // Intents: chao_hoi | tim_hieu_sp | tinh_nang_kt | huong_dan_sd
  //          chinh_sach_bh | gia_ca_km | ngoai_pham_vi | chuyen_nguoi_that
  // ════════════════════════════════════════════════════════════════════════════
  handleUserText(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();
    this.addUserMessage(cleanText);

    // If Dify Live API is enabled, call webhook/API
    if (this.difyConfig.isEnabled && this.difyConfig.apiKey) {
      this.callDifyApi(cleanText);
      return;
    }

    // Local Intelligent NLP Engine (8 Core Intents)
    const lower = cleanText.toLowerCase();

    setTimeout(() => {

      // ═══════════════════════════════════════════════════════════════
      // INTENT 1 — intent_chao_hoi: Chào hỏi & Giới thiệu tổng quan SmartZen
      // Keywords: xin chào, hello, hi, SmartZen là gì, bạn là ai, thương hiệu...
      // ═══════════════════════════════════════════════════════════════
      if (/xin chào|chào bạn|chào shop|hello|\bhi\b|\bhey\b|kính chào|helo|\bsmartzen\b là gì\?|bạn là ai|bạn tên gì|bot là gì|ai đang chat|giới thiệu về smartzen|về thương hiệu smartzen|thương hiệu smartzen|công ty smartzen|xuất xứ smartzen|ai brand launch/.test(lower) && !/hotline|nhân viên|tư vấn viên|người thật/.test(lower)) {
        this.addBotMessage(`
          👋 <strong>Xin chào! Tôi là SmartZen AI Advisor</strong> 🤖<br>
          Rất vui được gặp bạn! Hãy để tôi giới thiệu về <strong>SmartZen</strong>:<br><br>
          ✨ <strong>SmartZen</strong> là thương hiệu tiên phong tại Việt Nam trong lĩnh vực <strong>Nhà Thông Minh AIoT</strong> (AI + IoT).<br>
          • 🌐 Hệ sinh thái chuẩn quốc tế <strong>Matter &amp; Thread</strong>, tương thích 100% Apple HomeKit, Google Home &amp; Alexa.<br>
          • 🔒 Bảo mật cấp phần cứng với chip mã hóa độc lập <strong>Hardware Security Chip</strong>.<br>
          • 🛡️ Bảo hành vàng <strong>24 tháng 1 đổi 1</strong> — Khảo sát tận nhà <strong>MIỄN PHÍ</strong>.<br>
          • ⚡ Thiết bị thế hệ 2026: Robot hút bụi Flagship, Khóa FaceID 3D, Đèn RGBIC Ambient và hơn 30 sản phẩm.<br><br>
          Bạn cần tôi tư vấn điều gì hôm nay? 😊
        `, [
          { label: "🏠 Xem sản phẩm SmartZen", action: "open_catalog" },
          { label: "📐 Tư vấn Combo theo diện tích", action: "restart_consult" },
          { label: "💰 Xem giá & khuyến mãi", action: "ask_pricing" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // INTENT 8 — intent_chuyen_nguoi_that: Human Handoff
      // Keywords: người thật, nhân viên, tư vấn viên, kỹ sư, hotline, gặp người...
      // (Kiểm tra trước các intent khác để ưu tiên handoff)
      // ═══════════════════════════════════════════════════════════════
      } else if (/người thật|nhân viên|tư vấn viên|chuyên viên|kỹ sư|tổng đài|handoff|hotline|gặp người|liên hệ trực tiếp|gọi điện ngay|gọi cho tôi|chat với người|hỗ trợ trực tiếp|tư vấn trực tiếp|muốn gặp người|cần gặp người/.test(lower)) {
        this.addBotMessage(`
          🧑‍💼 <strong>Kết nối Human-in-the-Loop — Handoff sang Chuyên Viên Thật!</strong><br><br>
          Hệ thống AI đã ghi nhận yêu cầu và đang kết nối bạn với:<br>
          👤 <strong>Kỹ sư Trưởng SmartZen — Mr. Minh Đức</strong><br>
          <em>(Chuyên gia Smart Home 8 năm kinh nghiệm)</em><br><br>
          📞 <strong>Hotline trực tiếp:</strong> <code>1900 8899 (Nhánh 1)</code><br>
          💬 <strong>Zalo Kỹ thuật:</strong> <code>0908.888.999</code><br>
          📧 <strong>Email hỗ trợ:</strong> <code>support@smartzen.vn</code><br><br>
          ⏱️ Thời gian phản hồi trung bình: <strong>dưới 2 phút</strong> trong giờ hành chính.<br>
          Ngoài giờ, chatbot AI vẫn sẵn sàng giải đáp 24/7.
        `, [
          { label: "✍️ Đặt lịch kỹ sư gọi lại cho tôi", action: "ask_survey" },
          { label: "🤖 Tiếp tục hỏi AI tư vấn", action: "restart_consult" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // INTENT 6 — intent_gia_ca_khuyen_mai: Giá bán & Khuyến mãi
      // Keywords: giá, tiền, bao nhiêu, khuyến mãi, voucher, giảm giá, sale...
      // ═══════════════════════════════════════════════════════════════
      } else if (/\bgiá\b|tiền|chi phí|bao nhiêu tiền|bao nhiêu|khuyến mãi|ưu đãi|voucher|mã giảm|giảm giá|\bsale\b|discount|flash sale|giá bán|giá combo|thanh toán|trả góp|có rẻ không|giá tốt không/.test(lower)) {
        this.addBotMessage(`
          🔥 <strong>Bảng giá & Ưu đãi độc quyền tháng 10/2026 của SmartZen:</strong><br><br>
          <strong>🏷️ Giá sản phẩm nổi bật:</strong><br>
          • Đèn LED RGBIC Nova Beam (5m): <strong>850.000₫</strong> <del style="color:#888">1.150.000₫</del><br>
          • Camera AI 360° 4K Eye Guard: <strong>1.490.000₫</strong> <del style="color:#888">1.890.000₫</del><br>
          • Khóa FaceID 3D Neo Lock Pro: <strong>6.800.000₫</strong> <del style="color:#888">8.500.000₫</del><br>
          • Robot X10 Ultra (Flagship): <strong>13.990.000₫</strong> <del style="color:#888">16.900.000₫</del><br><br>
          <strong>🎁 Ưu đãi đang áp dụng:</strong><br>
          • Nhập mã <code>SMARTZEN2026</code> → Giảm ngay <strong>10%</strong> toàn đơn hàng<br>
          • Mua Combo → Tặng gói lắp đặt tại nhà trị giá <strong>1.500.000₫</strong><br>
          • Thanh toán VietQR → Giảm thêm <strong>5%</strong> và xử lý ưu tiên
        `, [
          { label: "🛒 Mua ngay & áp mã giảm giá", action: "open_catalog" },
          { label: "💎 Xem gói Combo tiết kiệm hơn", action: "view_all_combos" },
          { label: "📐 Đặt lịch khảo sát miễn phí", action: "ask_survey" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // INTENT 5 — intent_chinh_sach_bao_hanh: Bảo hành, đổi trả, hỗ trợ kỹ thuật
      // Keywords: bảo hành, đổi trả, hỏng, lỗi, sửa chữa, warranty...
      // ═══════════════════════════════════════════════════════════════
      } else if (/bảo hành|đổi trả|đổi hàng|trả hàng|hàng hỏng|bị hỏng|thiết bị hỏng|lỗi thiết bị|sửa chữa|bảo dưỡng|bảo trì|không hoạt động được|trục trặc|lỗi kỹ thuật|quy trình bảo hành|chính sách đổi trả|hư hỏng|thời gian bảo hành/.test(lower)) {
        this.addBotMessage(`
          🛡️ <strong>Chính sách Bảo hành Vàng SmartZen — Cam kết hàng đầu ngành:</strong><br><br>
          <strong>⏰ Thời hạn bảo hành:</strong><br>
          • <strong>24 tháng 1 đổi 1</strong> chính hãng — Mọi lỗi phần cứng, đổi thiết bị mới tức thì.<br>
          • <strong>30 ngày đổi trả</strong> không cần lý do — Hoàn tiền 100% nếu không hài lòng.<br><br>
          <strong>🔧 Quy trình xử lý lỗi kỹ thuật (3 bước):</strong><br>
          1️⃣ Báo lỗi qua app SmartZen hoặc hotline <code>1900 8899</code><br>
          2️⃣ Kỹ thuật viên remote hỗ trợ trong <strong>30 phút</strong> — Sửa online ngay<br>
          3️⃣ Đến tận nơi thay thế trong <strong>2-4 giờ</strong> (nội thành HN &amp; HCM)<br><br>
          📍 <strong>Trung tâm bảo hành chính hãng:</strong> Hà Nội • TP.HCM • Đà Nẵng
        `, [
          { label: "🧑‍💼 Báo lỗi & Liên hệ bảo hành", action: "ask_handoff" },
          { label: "✍️ Đặt lịch kỹ thuật viên đến sửa", action: "ask_survey" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // INTENT 4 — intent_huong_dan_su_dung: Hướng dẫn cài đặt, kết nối, vận hành
      // Keywords: hướng dẫn, cài đặt, lắp đặt, kết nối, sử dụng, vận hành...
      // ═══════════════════════════════════════════════════════════════
      } else if (/hướng dẫn|cài đặt|lắp đặt|kết nối|cách sử dụng|cách dùng|cách cài|cách kết nối|vận hành|tự lắp|tự cài|\bdiy\b|sơ đồ đấu nối|dây nguội|đấu nối|ghép nối thiết bị|tải app|quét mã|matter qr|lắp như thế nào|cài như thế nào|dùng như thế nào|hướng dẫn sử dụng/.test(lower)) {
        this.addBotMessage(`
          🛠️ <strong>Hướng dẫn cài đặt & vận hành thiết bị SmartZen:</strong><br><br>
          <strong>📱 Kết nối thiết bị trong 30 giây (4 bước đơn giản):</strong><br>
          1️⃣ Tải app <strong>SmartZen</strong> miễn phí trên App Store / CH Play<br>
          2️⃣ Cắm nguồn thiết bị → Đèn LED nhấp nháy = Chế độ ghép đôi<br>
          3️⃣ Mở app → "Thêm thiết bị" → Quét <strong>Matter QR Code</strong> in trên hộp<br>
          4️⃣ Thiết bị tự nhận diện, gom vào phòng &amp; tạo kịch bản tự động!<br><br>
          <strong>⚡ Lưu ý lắp đặt từng loại thiết bị:</strong><br>
          • <strong>Công tắc:</strong> Khớp chuẩn đế âm VN — hỗ trợ cả không có dây nguội N<br>
          • <strong>Khóa cửa:</strong> Pin sạc 5.000mAh dùng 8-10 tháng, không cần kéo dây điện<br>
          • <strong>Cảm biến radar:</strong> Đế nam châm 3M — Lắp góc trần, không cần khoan<br>
          • <strong>Rèm tự động:</strong> Clip nhanh vào ray nhôm hiện có chỉ trong 10 phút
        `, [
          { label: "📺 Xem video mô phỏng lắp đặt 3D", action: "show_video_sim" },
          { label: "📐 Đặt kỹ sư đến lắp tận nhà", action: "ask_survey" },
          { label: "🧑‍💼 Hỏi kỹ thuật viên trực tiếp", action: "ask_handoff" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // INTENT 3 — intent_tinh_nang_ky_thuat: Thông số kỹ thuật, cách hoạt động
      // Keywords: thông số, kỹ thuật, spec, tính năng, công nghệ, Matter, Zigbee...
      // ═══════════════════════════════════════════════════════════════
      } else if (/thông số|thông số kỹ thuật|\bspec\b|tính năng|công nghệ|hoạt động thế nào|cách hoạt động|\bmatter\b|\bzigbee\b|homekit|apple home|google home|\balexa\b|\bsiri\b|\bthread\b|bluetooth mesh|lực hút|\bcadr\b|\bhepa\b|độ phân giải|\b4k\b|\blidar\b|mmwave|radar 24ghz|faceid|\bfpc\b|\brgbic\b|\brgb\b|chip npu|ip67|lumen|kelvin|watt|pa hút/.test(lower)) {
        this.addBotMessage(`
          ⚙️ <strong>Thông số kỹ thuật & Cách hoạt động của thiết bị SmartZen 2026:</strong><br><br>
          <strong>🌐 Giao thức kết nối thế hệ mới:</strong><br>
          • <strong>Matter over Thread:</strong> Chuẩn IoT toàn cầu — Hoạt động Offline 100% khi mất mạng<br>
          • <strong>Zigbee 3.0:</strong> Mesh Network tự relay — Phủ sóng toàn nhà nhiều tầng<br>
          • <strong>BLE Mesh 5.2:</strong> Kết nối trực tiếp không cần Hub cho thiết bị gần<br><br>
          <strong>🤖 Thông số AI nổi bật của từng dòng:</strong><br>
          • 🔒 <strong>Khóa FaceID 3D Neo Lock:</strong> Nhận diện 0.3s, tỷ lệ sai &lt;0.0001%, chống ảnh/video giả<br>
          • 🤖 <strong>Robot X10 Ultra:</strong> 8.500 Pa, LiDAR 3D tránh 108 vật cản, tự giặt sấy 60°C<br>
          • 📷 <strong>Camera AI 4K Eye Guard:</strong> NPU phân biệt người/thú cưng, đêm màu Full-Color 15m<br>
          • 📡 <strong>Cảm biến mmWave 24GHz:</strong> Nhận diện nhịp thở từ 7m, phòng tắt đèn nhầm 0%<br>
          • 💡 <strong>Đèn RGBIC Nova Beam:</strong> 16 triệu màu độc lập từng đoạn, CRI Ra98<br><br>
          Bạn muốn xem thông số chi tiết sản phẩm nào cụ thể?
        `, [
          { label: "🛍️ Xem chi tiết tất cả sản phẩm", action: "open_catalog" },
          { label: "⚡ Xem Hub Matter trung tâm", action: "view_hub_product" },
          { label: "🧑‍💼 Hỏi kỹ sư kỹ thuật viên", action: "ask_handoff" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // INTENT 2 — intent_tim_hieu_san_pham: Hỏi về các dòng sản phẩm, giải pháp
      // Keywords: sản phẩm, thiết bị, combo, đèn, robot, khóa, camera, cảm biến...
      // ═══════════════════════════════════════════════════════════════
      } else if (/sản phẩm|thiết bị|giải pháp|dòng sản phẩm|danh mục|\bcombo\b|gói sản phẩm|có những gì|smartzen bán gì|đèn thông minh|robot hút|khóa cửa|\bcamera\b|cảm biến|rèm tự động|công tắc|hub trung tâm|tìm hiểu sản phẩm|xem sản phẩm|muốn mua gì|nên mua|tư vấn mua|cho diện tích|cho phòng|căn hộ|biệt thự|nhà phố|\bsmarthome\b|nhà thông minh/.test(lower)) {
        this.addBotMessage(`
          🏠 <strong>Danh mục sản phẩm SmartZen — Hệ sinh thái Nhà Thông Minh toàn diện:</strong><br><br>
          <strong>💡 Đèn Thông Minh:</strong><br>
          • Dải LED RGBIC Ambient <em>Nova Beam</em> — 16 triệu màu độc lập, đồng bộ nhịp âm nhạc<br>
          • Đèn trần <em>Aura Ceiling Pro</em> 50W — Ra98, đổi nhiệt màu 2700K–6500K<br><br>
          <strong>🔒 Bảo mật & An ninh:</strong><br>
          • Khóa FaceID 3D <em>Neo Lock Pro</em> — 7 phương thức mở khóa<br>
          • Camera AI 360° 4K <em>Eye Guard</em> — NPU nhận diện khuôn mặt người thân<br>
          • Cảm biến mmWave 24GHz <em>Sentinel Radar</em><br>
          • Cảm biến khói &amp; rò khí gas <em>SafeGuard</em><br><br>
          <strong>🤖 Robot Tự Động:</strong><br>
          • <em>X10 Ultra</em> — 8.500Pa, tự giặt sấy giẻ, trạm Omni 7-in-1<br>
          • <em>Slim S5</em> — Siêu mỏng 6.8cm, len lỏi mọi gầm sofa<br><br>
          <strong>⚡ Tự Động Hóa:</strong><br>
          • Công tắc kính cường lực cảm ứng Haptic<br>
          • Động cơ rèm <em>SilentCurtain Pro</em> — Siêu êm 20dB, chịu tải 60kg<br>
          • Hub <em>Matter Core Ultra</em> — Kết nối đến 128 thiết bị đồng thời
        `, [
          { label: "📐 AI tư vấn Combo theo diện tích", action: "restart_consult" },
          { label: "🛍️ Xem toàn bộ sản phẩm", action: "open_catalog" },
          { label: "💎 Xem các gói Combo tiết kiệm", action: "view_all_combos" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // INTENT 7 — intent_ngoai_pham_vi: Câu hỏi ngoài phạm vi SmartZen
      // Keywords: thời tiết, giải trí, tài chính, y tế, chính trị...
      // ═══════════════════════════════════════════════════════════════
      } else if (/thời tiết|dự báo thời tiết|nhiệt độ ngoài|trời có mưa|trời nắng không|hôm nay thời tiết|bóng đá|\bphim\b|\bnhạc\b|giải trí|tin tức|\bchính trị\b|bầu cử|\bcovid\b|sức khỏe|bệnh viện|\bthuốc\b|công thức nấu|cách nấu|lịch sử thế giới|địa lý|\btoán\b|vật lý|hóa học|bài học|kỳ thi|\bbitcoin\b|\bcrypto\b|chứng khoán|cổ phiếu|đầu tư tài chính|vay tiền|ngân hàng|\bvisa\b|du lịch nước ngoài|đặt vé máy bay|bảo hiểm nhân thọ/.test(lower)) {
        this.addBotMessage(`
          😅 <strong>Câu hỏi này nằm ngoài phạm vi chuyên môn của tôi!</strong><br><br>
          Tôi là <strong>SmartZen AI Advisor</strong> — được đào tạo chuyên sâu về:<br>
          <em>🏠 Nhà Thông Minh · 📱 AIoT · ⚙️ Sản phẩm SmartZen</em><br><br>
          Các chủ đề ngoài phạm vi bao gồm: thời tiết, giải trí, y tế, tài chính, chính trị, du lịch... — Tôi chưa được huấn luyện để trả lời các câu hỏi này.<br><br>
          💡 <strong>Tôi có thể giúp bạn ngay bây giờ về:</strong>
        `, [
          { label: "🏠 Hỏi về sản phẩm SmartZen", action: "open_catalog" },
          { label: "💰 Hỏi về giá & khuyến mãi", action: "ask_pricing" },
          { label: "🛡️ Hỏi về chính sách bảo hành", action: "ask_warranty" },
          { label: "🧑‍💼 Gặp tư vấn viên người thật", action: "ask_handoff" }
        ]);

      // ═══════════════════════════════════════════════════════════════
      // DEFAULT FALLBACK — Câu hỏi không khớp với intent nào
      // ═══════════════════════════════════════════════════════════════
      } else {
        this.addBotMessage(`
          🤔 Tôi đã tiếp nhận câu hỏi: <em>"${cleanText}"</em>.<br><br>
          Để hỗ trợ bạn chính xác hơn, hãy chọn chủ đề phù hợp — hoặc gặp trực tiếp kỹ sư SmartZen:
        `, [
          { label: "👋 SmartZen là gì? Giới thiệu thương hiệu", action: "ask_brand_info" },
          { label: "🏠 Xem sản phẩm & giải pháp", action: "open_catalog" },
          { label: "💰 Giá cả & Khuyến mãi", action: "ask_pricing" },
          { label: "🛠️ Hướng dẫn cài đặt & sử dụng", action: "ask_install" },
          { label: "🛡️ Chính sách bảo hành & đổi trả", action: "ask_warranty" },
          { label: "🧑‍💼 Gặp tư vấn viên người thật", action: "ask_handoff" }
        ]);
      }
    }, 450);
  },

  // Real Dify API Call (when user configured it)
  async callDifyApi(query) {
    const loadingId = 'dify-load-' + Date.now();
    this.addLoadingIndicator(loadingId);

    try {
      const response = await fetch(`${this.difyConfig.apiUrl}/chat-messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.difyConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {},
          query: query,
          response_mode: 'blocking',
          user: 'smartzen-user-' + Math.floor(Math.random() * 1000)
        })
      });

      this.removeLoadingIndicator(loadingId);

      if (!response.ok) {
        throw new Error(`Dify API error: ${response.status}`);
      }

      const data = await response.json();
      const answer = data.answer || 'Dify AI đã xử lý yêu cầu của bạn.';
      this.addBotMessage(answer);
    } catch (err) {
      this.removeLoadingIndicator(loadingId);
      console.error(err);
      this.addBotMessage(`
        ⚠️ <em>Không thể kết nối đến Dify API: ${err.message}. Đang chuyển về chế độ Trợ lý AI SmartZen thông minh dự phòng.</em>
      `);
      this.handleUserText(query); // Fallback to local intelligent engine
    }
  },

  addLoadingIndicator(id) {
    const container = document.getElementById('chatMessagesContainer');
    const loadingEl = document.createElement('div');
    loadingEl.className = 'chat-message bot';
    loadingEl.id = id;
    loadingEl.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="msg-bubble">
        <span class="badge-tag pulse" style="font-size: 0.72rem;">Dify AI đang suy nghĩ...</span>
      </div>
    `;
    container.appendChild(loadingEl);
    this.scrollToBottom();
  },

  removeLoadingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  },

  addUserMessage(text) {
    const container = document.getElementById('chatMessagesContainer');
    const msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.innerHTML = `
      <div class="msg-avatar">👤</div>
      <div class="msg-bubble">${text}</div>
    `;
    container.appendChild(msg);
    this.scrollToBottom();
  },

  addBotMessage(html, chips = []) {
    const container = document.getElementById('chatMessagesContainer');
    const msg = document.createElement('div');
    msg.className = 'chat-message bot';

    let chipsHtml = '';
    if (chips && chips.length > 0) {
      chipsHtml = `
        <div class="chat-chips-grid">
          ${chips.map((c, idx) => `
            <button class="chat-chip-btn" data-action="${c.action}" data-idx="${idx}">
              ${c.label}
            </button>
          `).join('')}
        </div>
      `;
    }

    msg.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="msg-bubble">
        ${html}
        ${chipsHtml}
      </div>
    `;

    // Bind chip click events
    msg.querySelectorAll('.chat-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const chipData = chips[parseInt(btn.dataset.idx, 10)]?.data;
        if (action === 'restart_consult') {
          this.resetConsultation();
        } else if (action === 'open_cart') {
          Cart.openDrawer();
        } else if (action === 'go_to_survey_form' || action === 'ask_survey') {
          document.getElementById('surveySection')?.scrollIntoView({ behavior: 'smooth' });
          showToast('Đang chuyển đến khu vực Đặt lịch khảo sát tại nhà...', 'info');
        } else if (action === 'open_catalog') {
          document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'view_all_combos') {
          document.getElementById('combosSection')?.scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'view_hub_product') {
          Catalog.openQuickView('sz-core-hub');
        } else if (action === 'show_video_sim') {
          this.jumpVideoStep(1);
        } else if (action === 'ask_pricing') {
          this.handleUserText('Giá sản phẩm và khuyến mãi hiện tại');
        } else if (action === 'ask_install') {
          this.handleUserText('Hướng dẫn cài đặt và sử dụng thiết bị');
        } else if (action === 'ask_warranty') {
          this.handleUserText('Chính sách bảo hành và đổi trả');
        } else if (action === 'ask_handoff') {
          this.handleUserText('Tôi muốn gặp tư vấn viên người thật');
        } else if (action === 'ask_brand' || action === 'ask_brand_info') {
          this.handleUserText('Xin chào, giới thiệu về SmartZen cho tôi');
        } else {
          this.handleOptionClick(action, chipData);
        }
      });
    });

    container.appendChild(msg);
    this.scrollToBottom();
  },

  scrollToBottom() {
    const container = document.getElementById('chatMessagesContainer');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },

  renderDifySettingsView() {
    const container = document.getElementById('chatMessagesContainer');
    container.innerHTML = `
      <div class="chat-message bot" style="max-width: 100%;">
        <div class="msg-avatar">⚙️</div>
        <div class="msg-bubble" style="width: 100%;">
          <h4 style="color: var(--cyan-neon); margin-bottom: 0.5rem;">Cấu Hình Tích Hợp Dify AI (Bài Lab A3)</h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Bạn có thể kết nối Chatbot website trực tiếp với <strong>Workflow hoặc Chatbot Agent trên Dify Cloud / Self-hosted</strong> của nhóm bạn.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem;">
            <label style="color: var(--text-primary); font-size: 0.8rem;">Dify API Base URL (VD: https://api.dify.ai/v1):</label>
            <input type="text" id="difyApiUrlInput" class="form-input" value="${this.difyConfig.apiUrl}" placeholder="https://api.dify.ai/v1" style="padding: 0.45rem 0.75rem; font-size: 0.8rem;">

            <label style="color: var(--text-primary); font-size: 0.8rem;">Dify API Key (App Key):</label>
            <input type="password" id="difyApiKeyInput" class="form-input" value="${this.difyConfig.apiKey}" placeholder="app-xxxxxxxxxxxxxxxx" style="padding: 0.45rem 0.75rem; font-size: 0.8rem;">

            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
              <input type="checkbox" id="difyEnableToggle" ${this.difyConfig.isEnabled ? 'checked' : ''}>
              <label for="difyEnableToggle" style="color: var(--text-white); font-weight: 600;">Kích hoạt Dify Live API</label>
            </div>

            <div style="display: flex; gap: 0.6rem; margin-top: 1rem;">
              <button class="btn btn-primary btn-sm" onclick="DifyChatbot.saveDifySettings()" style="flex: 1; padding: 0.5rem;">
                💾 Lưu Cấu Hình
              </button>
              <button class="btn btn-secondary btn-sm" onclick="DifyChatbot.setMode('advisor')" style="flex: 1; padding: 0.5rem;">
                ← Quay Lại Tư Vấn
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  saveDifySettings() {
    const url = document.getElementById('difyApiUrlInput')?.value.trim() || '';
    const key = document.getElementById('difyApiKeyInput')?.value.trim() || '';
    const isEnabled = document.getElementById('difyEnableToggle')?.checked || false;

    this.difyConfig.apiUrl = url;
    this.difyConfig.apiKey = key;
    this.difyConfig.isEnabled = isEnabled;

    localStorage.setItem('dify_api_url', url);
    localStorage.setItem('dify_api_key', key);
    localStorage.setItem('dify_is_enabled', isEnabled.toString());

    showToast('Đã lưu cấu hình Dify AI thành công!', 'success');
    this.setMode('advisor');
  },

  bindEvents() {
    // Launcher toggle
    const launcherBtn = document.getElementById('chatbotLauncherBtn');
    if (launcherBtn) {
      launcherBtn.addEventListener('click', () => this.toggleWindow());
    }

    const closeBtn = document.getElementById('chatCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.toggleWindow());
    }

    // Mode tabs
    document.querySelectorAll('.chat-mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.setMode(tab.dataset.mode);
      });
    });

    // Chat input
    const sendBtn = document.getElementById('chatSendBtn');
    const input = document.getElementById('chatTextInput');

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        const val = input.value;
        input.value = '';
        this.handleUserText(val);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const val = input.value;
          input.value = '';
          this.handleUserText(val);
        }
      });
    }
  }
};
