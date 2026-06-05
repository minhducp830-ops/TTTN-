// ===== ĐĂNG KÝ - DATA & LOGIC =====

// ---- SVG ICONS ----
const USER_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5A7DB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const LOCK_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5A7DB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const EYE_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const EYE_SHOW_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const CALENDAR_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const REFRESH_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5A7DB5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`;

// ---- CAPTCHA ----
const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let currentCaptcha = '';

function generateCaptcha() {
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  currentCaptcha = result;
  return result;
}

function renderCaptchaCanvas(code) {
  const canvas = document.getElementById('captcha-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 130;
  canvas.height = 44;

  // Background
  ctx.fillStyle = '#F0F0F0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Noise lines
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = `rgba(${Math.random()*150},${Math.random()*150},${Math.random()*150},0.4)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // Noise dots
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(${Math.random()*200},${Math.random()*200},${Math.random()*200},0.5)`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
  }

  // Draw each character with slight rotation
  const charWidth = canvas.width / (code.length + 1);
  const fonts = ['Arial', 'Georgia', 'Courier New', 'Trebuchet MS'];
  for (let i = 0; i < code.length; i++) {
    ctx.save();
    const x = charWidth * (i + 0.8);
    const y = canvas.height / 2 + 6;
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.font = `bold ${18 + Math.floor(Math.random() * 4)}px ${fonts[i % fonts.length]}`;
    ctx.fillStyle = `rgb(${Math.floor(Math.random()*100)},${Math.floor(Math.random()*100)},${Math.floor(Math.random()*150 + 50)})`;
    ctx.fillText(code[i], 0, 0);
    ctx.restore();
  }
}

function refreshCaptcha() {
  const newCode = generateCaptcha();
  renderCaptchaCanvas(newCode);
  const input = document.getElementById('input-captcha');
  if (input) {
    input.value = '';
    input.classList.remove('error', 'success');
  }
  const err = document.getElementById('error-captcha');
  if (err) err.classList.remove('show');
}

// ---- VALIDATION RULES ----
const validationRulesKy = {
  username: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập tên đăng nhập hoặc email" },
    { test: (v) => v.trim().length >= 3, msg: "Tên đăng nhập phải từ 3 ký tự trở lên" },
  ],
  password: [
    { test: (v) => v.length > 0, msg: "Mật khẩu không được để trống" },
    { test: (v) => v.length >= 6, msg: "Mật khẩu phải có ít nhất 6 ký tự" },
  ],
  confirmPassword: [
    { test: (v) => v.length > 0, msg: "Vui lòng nhập lại mật khẩu" },
    {
      test: (v) => {
        const pw = document.getElementById("input-password-ky");
        return pw && v === pw.value;
      },
      msg: "Mật khẩu xác nhận không khớp",
    },
  ],
  fullname: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập họ và tên" },
    { test: (v) => v.trim().length >= 2, msg: "Họ tên phải có ít nhất 2 ký tự" },
  ],
  gender: [
    { test: (v) => v !== '', msg: "Vui lòng chọn giới tính" },
  ],
  birthday: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng chọn ngày sinh" },
  ],
  address: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập địa chỉ" },
  ],
  email: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập email" },
    { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Email không đúng định dạng" },
  ],
  phone: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập số điện thoại" },
    { test: (v) => /^(0|\+84)[0-9]{9,10}$/.test(v.trim()), msg: "Số điện thoại không đúng định dạng (VD: 0912345678)" },
  ],
  captcha: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập mã xác nhận" },
    { test: (v) => v.trim() === currentCaptcha, msg: "Mã xác nhận không đúng, vui lòng thử lại" },
  ],
};

// ---- RENDER PAGE ----
function renderDangKyPage() {
  const mainHTML = `
    <main class="register-main">

      <!-- Card 1: Thông tin tài khoản -->
      <div class="register-card" id="card-account">
        <h2 class="card-title">ĐĂNG KÝ TÀI KHOẢN</h2>

        <!-- Tên đăng nhập / Email -->
        <div class="form-group" id="group-username">
          <div class="input-wrapper">
            <span class="input-prefix">${USER_SVG}</span>
            <input
              type="text"
              id="input-username"
              name="username"
              class="form-input"
              placeholder="Tên đăng nhập hoặc Email"
              autocomplete="off"
            />
          </div>
          <div class="field-error" id="error-username"></div>
        </div>

        <!-- Mật khẩu -->
        <div class="form-group" id="group-password">
          <div class="input-wrapper">
            <span class="input-prefix">${LOCK_SVG}</span>
            <input
              type="password"
              id="input-password-ky"
              name="password"
              class="form-input"
              placeholder="Mật khẩu"
              autocomplete="new-password"
            />
            <button type="button" class="btn-toggle-pw" id="toggle-password" aria-label="Hiện/ẩn mật khẩu">${EYE_SVG}</button>
          </div>
          <div class="field-error" id="error-password"></div>
        </div>

        <!-- Nhập lại mật khẩu -->
        <div class="form-group" id="group-confirmPassword">
          <div class="input-wrapper">
            <span class="input-prefix">${LOCK_SVG}</span>
            <input
              type="password"
              id="input-confirm-pw"
              name="confirmPassword"
              class="form-input"
              placeholder="Nhập lại mật khẩu"
              autocomplete="new-password"
            />
            <button type="button" class="btn-toggle-pw" id="toggle-confirm-pw" aria-label="Hiện/ẩn mật khẩu">${EYE_SVG}</button>
          </div>
          <div class="field-error" id="error-confirmPassword"></div>
        </div>
      </div>

      <!-- Card 2: Thông tin tài khoản (cá nhân) -->
      <div class="register-card" id="card-personal">
        <h2 class="card-title">THÔNG TIN TÀI KHOẢN</h2>

        <form id="dang-ky-form" novalidate>

          <!-- Họ và tên -->
          <div class="form-group" id="group-fullname">
            <label class="field-label">Họ và tên<span class="required-star">(*)</span></label>
            <div class="input-wrapper input-wrapper-flat">
              <input
                type="text"
                id="input-fullname"
                name="fullname"
                class="form-input form-input-flat"
                placeholder="Nguyễn Văn A"
                autocomplete="off"
              />
            </div>
            <div class="field-error" id="error-fullname"></div>
          </div>

          <!-- Giới tính -->
          <div class="form-group" id="group-gender">
            <label class="field-label">Giới tính<span class="required-star">(*)</span></label>
            <div class="radio-group">
              <label class="radio-label" for="gender-male">
                <input type="radio" id="gender-male" name="gender" value="Nam" class="radio-input" />
                <span class="radio-custom"></span>
                Nam
              </label>
              <label class="radio-label" for="gender-female">
                <input type="radio" id="gender-female" name="gender" value="Nữ" class="radio-input" />
                <span class="radio-custom"></span>
                Nữ
              </label>
            </div>
            <div class="field-error" id="error-gender"></div>
          </div>

          <!-- Ngày sinh -->
          <div class="form-group" id="group-birthday">
            <label class="field-label">Ngày sinh<span class="required-star">(*)</span></label>
            <div class="input-wrapper input-wrapper-flat input-wrapper-date">
              <input
                type="date"
                id="input-birthday"
                name="birthday"
                class="form-input form-input-flat"
                placeholder="Ngày sinh"
              />
              <span class="input-suffix">${CALENDAR_SVG}</span>
            </div>
            <div class="field-error" id="error-birthday"></div>
          </div>

          <!-- Địa chỉ -->
          <div class="form-group" id="group-address">
            <label class="field-label">Địa chỉ<span class="required-star">(*)</span></label>
            <div class="input-wrapper input-wrapper-flat">
              <input
                type="text"
                id="input-address"
                name="address"
                class="form-input form-input-flat"
                placeholder="Địa chỉ"
                autocomplete="off"
              />
            </div>
            <div class="field-error" id="error-address"></div>
          </div>

          <!-- Email -->
          <div class="form-group" id="group-email">
            <label class="field-label">Email<span class="required-star">(*)</span></label>
            <div class="input-wrapper input-wrapper-flat">
              <input
                type="email"
                id="input-email-ky"
                name="email"
                class="form-input form-input-flat form-input-email"
                placeholder="Email"
                autocomplete="off"
              />
            </div>
            <div class="field-error" id="error-email"></div>
          </div>

          <!-- Số điện thoại -->
          <div class="form-group" id="group-phone">
            <label class="field-label">Số điện thoại<span class="required-star">(*)</span></label>
            <div class="input-wrapper input-wrapper-flat">
              <input
                type="tel"
                id="input-phone"
                name="phone"
                class="form-input form-input-flat"
                placeholder="Số điện thoại"
                autocomplete="off"
              />
            </div>
            <div class="field-error" id="error-phone"></div>
          </div>

          <!-- Mã xác nhận (Captcha) -->
          <div class="form-group" id="group-captcha">
            <div class="captcha-row">
              <div class="input-wrapper input-wrapper-flat captcha-input-wrapper">
                <input
                  type="text"
                  id="input-captcha"
                  name="captcha"
                  class="form-input form-input-flat"
                  placeholder="Mã xác nhận"
                  maxlength="6"
                  autocomplete="off"
                />
              </div>
              <div class="captcha-image-wrapper">
                <canvas id="captcha-canvas" class="captcha-canvas"></canvas>
                <button type="button" id="btn-refresh-captcha" class="btn-refresh-captcha" aria-label="Làm mới mã">
                  ${REFRESH_SVG}
                </button>
              </div>
            </div>
            <div class="field-error" id="error-captcha"></div>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-submit btn-orange" id="btn-submit-ky">
            <span class="btn-text">ĐĂNG KÝ</span>
            <div class="spinner"></div>
          </button>

        </form>
      </div>

    </main>
  `;

  document.getElementById("main-container").innerHTML = mainHTML;
  initFormBehaviorKy();

  // Initialize captcha after DOM is ready
  setTimeout(() => {
    const code = generateCaptcha();
    renderCaptchaCanvas(code);
  }, 0);
}

// ---- VALIDATION LOGIC ----
function validateFieldKy(name, value) {
  const rules = validationRulesKy[name];
  if (!rules) return { valid: true };
  for (const rule of rules) {
    if (!rule.test(value)) return { valid: false, msg: rule.msg };
  }
  return { valid: true };
}

function showFieldErrorKy(name, msg) {
  const input = document.querySelector(`[name="${name}"]`);
  const errorEl = document.getElementById(`error-${name}`);
  if (input) {
    input.classList.remove("success");
    input.classList.add("error");
  }
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.add("show");
  }
}

function clearFieldErrorKy(name) {
  const input = document.querySelector(`[name="${name}"]`);
  const errorEl = document.getElementById(`error-${name}`);
  if (input) {
    input.classList.remove("error");
    input.classList.add("success");
  }
  if (errorEl) errorEl.classList.remove("show");
}

function clearAllErrorsKy() {
  document.querySelectorAll(".field-error").forEach((el) => el.classList.remove("show"));
  document.querySelectorAll(".form-input").forEach((el) => el.classList.remove("error", "success"));
}

// ---- TOAST ----
function showToastKy(msg, type = "success") {
  let toast = document.getElementById("toast-msg-ky");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-msg-ky";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✅" : "❌"}</span> ${msg}`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ---- FORM INITIALIZATION ----
function initFormBehaviorKy() {
  const form = document.getElementById("dang-ky-form");
  const submitBtn = document.getElementById("btn-submit-ky");

  // Real-time validation on blur for all text/email/tel inputs
  form.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("blur", () => {
      const result = validateFieldKy(input.name, input.value);
      if (!result.valid) showFieldErrorKy(input.name, result.msg);
      else clearFieldErrorKy(input.name);
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        const result = validateFieldKy(input.name, input.value);
        if (result.valid) clearFieldErrorKy(input.name);
      }
    });
  });

  // Also validate card 1 inputs on blur
  document.querySelectorAll("#card-account .form-input").forEach((input) => {
    input.addEventListener("blur", () => {
      const result = validateFieldKy(input.name, input.value);
      if (!result.valid) showFieldErrorKy(input.name, result.msg);
      else clearFieldErrorKy(input.name);
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        const result = validateFieldKy(input.name, input.value);
        if (result.valid) clearFieldErrorKy(input.name);
      }
    });
  });

  // Password toggles for card 1
  const pwToggle = document.getElementById("toggle-password");
  const pwInput = document.getElementById("input-password-ky");
  if (pwToggle && pwInput) {
    let vis = false;
    pwToggle.addEventListener("click", () => {
      vis = !vis;
      pwInput.type = vis ? "text" : "password";
      pwToggle.innerHTML = vis ? EYE_SHOW_SVG : EYE_SVG;
    });
  }

  const confirmToggle = document.getElementById("toggle-confirm-pw");
  const confirmInput = document.getElementById("input-confirm-pw");
  if (confirmToggle && confirmInput) {
    let vis = false;
    confirmToggle.addEventListener("click", () => {
      vis = !vis;
      confirmInput.type = vis ? "text" : "password";
      confirmToggle.innerHTML = vis ? EYE_SHOW_SVG : EYE_SVG;
    });
  }

  // Live confirm password check
  if (confirmInput && pwInput) {
    confirmInput.addEventListener("input", () => {
      if (confirmInput.value && pwInput.value) {
        if (confirmInput.value === pwInput.value) {
          clearFieldErrorKy("confirmPassword");
        }
      }
    });
  }

  // Captcha refresh
  const refreshBtn = document.getElementById("btn-refresh-captcha");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshCaptcha);
  }

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearAllErrorsKy();

    let isValid = true;

    // Validate card 1 fields
    const card1Fields = ['username', 'password', 'confirmPassword'];
    card1Fields.forEach((name) => {
      const input = document.querySelector(`[name="${name}"]`);
      if (input) {
        const result = validateFieldKy(name, input.value);
        if (!result.valid) {
          showFieldErrorKy(name, result.msg);
          isValid = false;
        }
      }
    });

    // Validate card 2 fields
    const card2Fields = ['fullname', 'birthday', 'address', 'email', 'phone', 'captcha'];
    card2Fields.forEach((name) => {
      const input = document.querySelector(`[name="${name}"]`);
      if (input) {
        const result = validateFieldKy(name, input.value);
        if (!result.valid) {
          showFieldErrorKy(name, result.msg);
          isValid = false;
        }
      }
    });

    // Validate gender (radio)
    const genderVal = document.querySelector('input[name="gender"]:checked')?.value || '';
    const genderResult = validateFieldKy('gender', genderVal);
    if (!genderResult.valid) {
      showFieldErrorKy('gender', genderResult.msg);
      isValid = false;
    }

    if (!isValid) {
      showToastKy("Vui lòng kiểm tra lại thông tin!", "error");
      return;
    }

    // Loading
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    await new Promise((r) => setTimeout(r, 1800));
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;

    showToastKy("Tạo tài khoản thành công! Đang chuyển hướng...", "success");
    setTimeout(() => {
      window.location.href = '../Dang_nhap/Dang_nhap.html';
    }, 2000);
  });
}

// ---- BOOT ----
document.addEventListener("DOMContentLoaded", () => {
  renderDangKyPage();
});
