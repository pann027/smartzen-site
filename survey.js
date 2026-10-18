/**
 * SmartZen E-Commerce - Home Survey Booking Controller (Khảo Sát Tận Nhà)
 */

const SurveyController = {
  init() {
    this.bindEvents();
    this.setDefaultDateTime();
  },

  setDefaultDateTime() {
    const dateInput = document.getElementById('surveyDate');
    if (dateInput) {
      // Set min date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  },

  bindEvents() {
    const form = document.getElementById('homeSurveyForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const name = form.querySelector('[name="survey_name"]').value.trim();
    const phone = form.querySelector('[name="survey_phone"]').value.trim();
    const address = form.querySelector('[name="survey_address"]').value.trim();
    const propertyType = form.querySelector('[name="survey_property_type"]').value;
    const area = form.querySelector('[name="survey_area"]').value.trim();
    const date = form.querySelector('[name="survey_date"]').value;
    const timeSlot = form.querySelector('[name="survey_timeslot"]').value;
    const notes = form.querySelector('[name="survey_notes"]').value.trim();

    if (!name || !phone || !address || !date) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'warning');
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      showToast('Số điện thoại không hợp lệ, vui lòng kiểm tra lại!', 'warning');
      return;
    }

    const ticketCode = 'SRV-2026-' + Math.floor(1000 + Math.random() * 9000);

    const surveyData = {
      ticketCode,
      name,
      phone,
      address,
      propertyType,
      area: area ? `${area} m²` : 'Chưa xác định',
      date,
      timeSlot,
      notes
    };

    // Save to localStorage for record
    try {
      const pastSurveys = JSON.parse(localStorage.getItem('smartzen_surveys') || '[]');
      pastSurveys.unshift(surveyData);
      localStorage.setItem('smartzen_surveys', JSON.stringify(pastSurveys));
    } catch (err) {
      console.warn(err);
    }

    this.showConfirmationModal(surveyData);
    form.reset();
    this.setDefaultDateTime();
    showToast(`Đăng ký khảo sát thành công! Mã phiếu: ${ticketCode}`, 'success');
  },

  showConfirmationModal(data) {
    const modal = document.getElementById('surveySuccessModal');
    if (!modal) return;

    document.getElementById('surveyTicketCode').textContent = data.ticketCode;
    document.getElementById('surveyConfirmName').textContent = data.name;
    document.getElementById('surveyConfirmPhone').textContent = data.phone;
    document.getElementById('surveyConfirmAddress').textContent = data.address;
    document.getElementById('surveyConfirmDateTime').textContent = `${data.date} (Khung giờ: ${data.timeSlot})`;
    document.getElementById('surveyConfirmType').textContent = `${data.propertyType} - ${data.area}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    const modal = document.getElementById('surveySuccessModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};
