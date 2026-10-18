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
        Chào bạn! Tôi có thể giải đáp mọi thắc mắc về:
        <br>• <strong>Báo giá & Khuyến mãi</strong> mới nhất
        <br>• <strong>Kỹ thuật & Tự lắp đặt</strong> tại nhà
        <br>• <strong>Đặt lịch kỹ sư khảo sát</strong> miễn phí
        <br>• <strong>Bảo hành 24 tháng 1 đổi 1</strong>
        <br>• Hoặc bấm <em>"Gặp tư vấn viên người thật"</em> để được hỗ trợ chuyên sâu!
      `, [
        { label: "💰 Báo giá khuyến mãi", action: "ask_pricing" },
        { label: "🛠️ Kỹ thuật lắp đặt", action: "ask_install" },
        { label: "📐 Đặt lịch khảo sát", action: "ask_survey" },
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

  // 8 Core Intents Handler (Curriculum & Brand Truth Pack Compliant)
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
      // Intent 1: Tư vấn diện tích & combo
      if (lower.includes('diện tích') || lower.includes('phòng') || lower.includes('tư vấn') || lower.includes('combo') || lower.includes('gói')) {
        this.addBotMessage(`
          SmartZen cung cấp các gói combo tối ưu hóa theo diện tích và công năng:
          <br>• <strong>Căn hộ 45 - 80m²:</strong> Combo Căn Hộ Hiện Đại All-in-One (Robot lau giặt sấy X10 + Khóa FaceID + Đèn Ambient).
          <br>• <strong>Nhà phố / Biệt thự:</strong> Combo Biệt Thự Luxury Zen phủ sóng mạng Matter 3 tầng.
          <br>• <strong>An ninh 24/7:</strong> Combo An Ninh Tuyệt Đối chống trộm và báo khói độc.
          <br>Bạn muốn tôi thiết kế cấu hình riêng cho diện tích nào?
        `, [
          { label: "📐 Thiết kế cấu hình theo diện tích", action: "area_small", data: { text: "Bắt đầu tư vấn", val: "medium" } },
          { label: "🛍️ Xem tất cả Combo", action: "view_all_combos" }
        ]);
      }
      // Intent 2: Báo giá & Khuyến mãi
      else if (lower.includes('giá') || lower.includes('tiền') || lower.includes('khuyến mãi') || lower.includes('voucher') || lower.includes('giảm giá')) {
        this.addBotMessage(`
          🔥 <strong>Chương trình ưu đãi tháng 10/2026 của SmartZen:</strong>
          <br>• Nhập mã <code>SMARTZEN2026</code> giảm ngay <strong>10%</strong> cho toàn bộ đơn hàng.
          <br>• Tặng gói <strong>Lắp đặt & Cài đặt kịch bản tại nhà</strong> trị giá 1.500.000₫ khi mua Combo.
          <br>• Giảm thêm <strong>5%</strong> khi thanh toán chuyển khoản qua VietQR.
        `, [
          { label: "🛒 Mua sắm áp mã giảm giá", action: "open_catalog" },
          { label: "📐 Đặt lịch khảo sát miễn phí", action: "ask_survey" }
        ]);
      }
      // Intent 3: Kỹ thuật & Tự lắp đặt (DIY)
      else if (lower.includes('lắp đặt') || lower.includes('kỹ thuật') || lower.includes('tự làm') || lower.includes('diy') || lower.includes('dây nguội') || lower.includes('sơ đồ')) {
        this.addBotMessage(`
          🛠️ <strong>Kỹ thuật lắp đặt thiết bị SmartZen:</strong>
          <br>• <strong>Không cần đục phá tường:</strong> Công tắc SmartZen lắp vừa khít chuẩn đế âm chữ nhật tại Việt Nam (hỗ trợ cả line L không dây N).
          <br>• <strong>Rèm & Khóa cửa:</strong> Sử dụng pin sạc dung lượng cao 5000mAh hoạt động 8 - 10 tháng.
          <br>• <strong>Kết nối 30 giây:</strong> Quét mã Matter QR Code trên app SmartZen là thiết bị tự động nhận diện.
          <br>Kỹ sư của chúng tôi luôn sẵn sàng hỗ trợ bạn qua video call hoặc đến tận nhà!
        `, [
          { label: "📺 Xem video mô phỏng lắp đặt", action: "show_video_sim" },
          { label: "📐 Đặt lịch kỹ sư đến tận nhà", action: "ask_survey" }
        ]);
      }
      // Intent 4: Đặt lịch khảo sát tận nhà
      else if (lower.includes('khảo sát') || lower.includes('lịch hẹn') || lower.includes('tận nhà') || lower.includes('đo đạc')) {
        this.addBotMessage(`
          SmartZen cung cấp dịch vụ <strong>Khảo sát & Lập sơ đồ 3D tại nhà hoàn toàn MIỄN PHÍ 100%</strong>:
          <br>• Kỹ sư có mặt sau 2 giờ hoặc theo đúng khung giờ bạn chọn.
          <br>• Đo đạc thực tế, đo kiểm sóng WiFi/Zigbee và vẽ sơ đồ vị trí công tắc, đèn, cảm biến.
          <br>• Báo giá chi tiết không phát sinh bất kỳ phụ phí nào.
        `, [
          { label: "✍️ Điền form đặt lịch ngay", action: "go_to_survey_form" }
        ]);
      }
      // Intent 5: Chính sách bảo hành & đổi trả
      else if (lower.includes('bảo hành') || lower.includes('đổi trả') || lower.includes('hỏng') || lower.includes('sửa chữa')) {
        this.addBotMessage(`
          🛡️ <strong>Chính sách bảo hành vàng của SmartZen:</strong>
          <br>• <strong>Bảo hành 24 tháng 1 ĐỔI 1</strong> chính hãng cho mọi lỗi phần cứng.
          <br>• Đổi trả miễn phí trong <strong>30 ngày đầu</strong> nếu không hài lòng về trải nghiệm.
          <br>• Đội ngũ kỹ thuật hỗ trợ tận nơi trong nội thành Hà Nội & TP.HCM.
        `, [
          { label: "🧑‍💼 Liên hệ bảo hành", action: "ask_handoff" },
          { label: "🛍️ Khám phá sản phẩm", action: "open_catalog" }
        ]);
      }
      // Intent 6: Human Handoff (Chuyển chuyên viên người thật)
      else if (lower.includes('người thật') || lower.includes('nhân viên') || lower.includes('tổng đài') || lower.includes('gặp') || lower.includes('handoff') || lower.includes('hotline')) {
        this.addBotMessage(`
          🧑‍💼 <strong>Cơ chế Human-in-the-Loop Handoff:</strong>
          <br>Hệ thống đang kết nối bạn với <strong>Kỹ sư Trưởng SmartZen (Mr. Minh Đức)</strong>.
          <br><br>📞 Hotline trực tiếp: <strong>1900 8899 (Nhánh 1)</strong>
          <br>💬 Zalo Kỹ thuật: <strong>0908.888.999</strong>
          <br>Kỹ thuật viên sẽ phản hồi bạn trong vòng dưới 2 phút!
        `, [
          { label: "📐 Hoặc Đặt lịch hẹn kỹ sư gọi lại", action: "ask_survey" }
        ]);
      }
      // Intent 7: Thương hiệu & Xuất xứ
      else if (lower.includes('thương hiệu') || lower.includes('smartzen') || lower.includes('xuất xứ') || lower.includes('công ty') || lower.includes('ai brand launch')) {
        this.addBotMessage(`
          ✨ <strong>Về thương hiệu SmartZen:</strong>
          <br>SmartZen là thương hiệu tiên phong trong giải pháp Nhà Thông Minh ứng dụng Trí Tuệ Nhân Tạo (AIoT).
          <br>• Hệ sinh thái chuẩn quốc tế Matter, tương thích 100% Apple HomeKit, Google Home & Alexa.
          <br>• Bảo mật cấp độ phần cứng với chip mã hóa độc lập Hardware Security Chip.
        `, [
          { label: "🏠 Xem các giải pháp nổi bật", action: "open_catalog" }
        ]);
      }
      // Intent 8: Tương thích Matter / Apple HomeKit / Google Home / Zigbee
      else if (lower.includes('matter') || lower.includes('homekit') || lower.includes('apple') || lower.includes('google') || lower.includes('alexa') || lower.includes('zigbee')) {
        this.addBotMessage(`
          🌐 <strong>Chuẩn tương thích SmartZen:</strong>
          <br>Tất cả thiết bị SmartZen thế hệ 2026 đều hỗ trợ giao thức kết nối mở <strong>Matter over Thread</strong> và <strong>Zigbee 3.0</strong>.
          <br>• Tự động đồng bộ vào ứng dụng <em>Apple Home (Nhà)</em> trên iPhone/iPad/Apple Watch.
          <br>• Ra lệnh giọng nói mượt mà với <em>Siri, Google Assistant và Alexa</em> bằng tiếng Việt và tiếng Anh.
        `, [
          { label: "⚡ Xem Hub Matter trung tâm", action: "view_hub_product" }
        ]);
      }
      // Default fallback
      else {
        this.addBotMessage(`
          Tôi đã tiếp nhận câu hỏi của bạn về: <em>"${cleanText}"</em>.
          <br>Để phục vụ bạn chính xác nhất, bạn có thể chọn các chủ đề sau hoặc bấm gặp trực tiếp kỹ sư SmartZen:
        `, [
          { label: "📐 Tư vấn combo theo diện tích", action: "area_small", data: { text: "Tư vấn lại", val: "medium" } },
          { label: "💰 Báo giá khuyến mãi", action: "ask_pricing" },
          { label: "🛠️ Hướng dẫn lắp đặt", action: "ask_install" },
          { label: "🧑‍💼 Gặp tư vấn viên thật", action: "ask_handoff" }
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
