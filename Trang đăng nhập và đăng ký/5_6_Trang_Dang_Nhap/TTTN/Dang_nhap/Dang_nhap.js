// ===== ĐĂNG NHẬP - DATA & LOGIC =====

// ---- SVG ICONS ----

const USER_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5A7DB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const LOCK_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#5A7DB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const EYE_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const EYE_SHOW_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9BB0CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

const FACEBOOK_CIRCLE_SVG = `<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#1877F2"/><path d="M22.5 20h-2v8h-3v-8h-1.5v-3H17.5v-1.8c0-2.4 1-3.7 3.7-3.7H23v3h-1.3c-1 0-1.2.5-1.2 1.2V17H23l-.5 3z" fill="#fff"/></svg>`;
const GOOGLE_CIRCLE_SVG = `<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#fff" stroke="#E0E0E0"/><path d="M29.6 20.2c0-.6-.1-1.2-.2-1.8H20v3.4h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-6.9z" fill="#4285F4"/><path d="M20 30c2.7 0 5-.9 6.7-2.4l-3.2-2.4c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.2H10.9v2.5C12.6 27.9 16 30 20 30z" fill="#34A853"/><path d="M14.2 21.9c-.2-.6-.3-1.3-.3-1.9s.1-1.3.3-1.9v-2.5H10.9C10.3 17 10 18.5 10 20s.3 3 .9 4.4l3.3-2.5z" fill="#FBBC05"/><path d="M20 13.9c1.5 0 2.9.5 3.9 1.5l2.9-2.9C25 10.9 22.7 10 20 10c-4 0-7.4 2.1-9.1 5.1l3.3 2.5c.8-2.4 3.1-3.7 5.8-3.7z" fill="#EA4335"/></svg>`;

// ---- PAGE DATA ----
const dangNhapData = {
  form: {
    title: "ĐĂNG NHẬP",
    logoHref: "../index.html",
    fields: [
      {
        id: "input-username",
        name: "username",
        type: "text",
        prefixIcon: USER_SVG,
        placeholder: "Tên đăng nhập hoặc Email",
        required: true,
      },
      {
        id: "input-password",
        name: "password",
        type: "password",
        prefixIcon: LOCK_SVG,
        placeholder: "Mật khẩu",
        required: true,
        toggleable: true,
      },
    ],
    forgotLabel: "Quên mật khẩu?",
    forgotHref: "#",
    submitLabel: "ĐĂNG NHẬP",
    registerLabel: "ĐĂNG KÝ",
    registerHref: "../Dang_ky/Dang_ky.html",
    socialText: "hoặc",
    socialLinkText: "Đăng ký bằng",
  },
};

// ---- VALIDATION RULES ----
const validationRules = {
  username: [
    { test: (v) => v.trim().length > 0, msg: "Vui lòng nhập tên đăng nhập hoặc email" },
    { test: (v) => v.trim().length >= 3, msg: "Tên đăng nhập phải từ 3 ký tự trở lên" },
  ],
  password: [
    { test: (v) => v.length > 0, msg: "Mật khẩu không được để trống" },
    { test: (v) => v.length >= 6, msg: "Mật khẩu phải có ít nhất 6 ký tự" },
  ],
};

// ---- RENDER FUNCTIONS ----
function renderDangNhapPage() {
  const { form } = dangNhapData;

  const fieldsHTML = form.fields
    .map((f) => {
      const toggleBtn = f.toggleable
        ? `<button type="button" class="btn-toggle-pw" id="toggle-${f.id}" aria-label="Hiện/ẩn mật khẩu">${EYE_SVG}</button>`
        : "";
      return `
      <div class="form-group" id="group-${f.name}">
        <div class="input-wrapper">
          <span class="input-prefix">${f.prefixIcon}</span>
          <input
            type="${f.type}"
            id="${f.id}"
            name="${f.name}"
            class="form-input"
            placeholder="${f.placeholder}"
            autocomplete="off"
          />
          ${toggleBtn}
        </div>
        <div class="field-error" id="error-${f.name}"></div>
      </div>`;
    })
    .join("");

  const mainHTML = `
    <main class="auth-main">
      <div class="auth-card">
        <!-- Title -->
        <h1 class="form-title">${form.title}</h1>

        <!-- Form -->
        <form id="dang-nhap-form" novalidate>
          ${fieldsHTML}

          <!-- Forgot password -->
          <div class="forgot-row">
            <a href="${form.forgotHref}" class="forgot-link" id="link-forgot">${form.forgotLabel}</a>
          </div>

          <!-- Login button -->
          <button type="submit" class="btn-submit btn-orange" id="btn-submit-login">
            <span class="btn-text">${form.submitLabel}</span>
            <div class="spinner"></div>
          </button>

          <!-- Register button -->
          <a href="${form.registerHref}" class="btn-submit btn-dark-blue" id="btn-go-register">
            ${form.registerLabel}
          </a>
        </form>

        <!-- Social -->
        <div class="social-section">
          <p class="social-text">
            ${form.socialText} <a href="${form.registerHref}" class="social-link-text">${form.socialLinkText}</a>
          </p>
          <div class="social-icons">
            <a href="#" id="btn-facebook" aria-label="Đăng ký bằng Facebook" class="social-icon-btn">
              ${FACEBOOK_CIRCLE_SVG}
            </a>
            <a href="#" id="btn-google" aria-label="Đăng ký bằng Google" class="social-icon-btn">
              ${GOOGLE_CIRCLE_SVG}
            </a>
          </div>
        </div>
      </div>
    </main>
  `;

  document.getElementById("main-container").innerHTML = mainHTML;
  initFormBehavior();
}

// ---- VALIDATION LOGIC ----
function validateField(name, value) {
  const rules = validationRules[name];
  if (!rules) return { valid: true };
  for (const rule of rules) {
    if (!rule.test(value)) return { valid: false, msg: rule.msg };
  }
  return { valid: true };
}

function showFieldError(name, msg) {
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

function clearFieldError(name) {
  const input = document.querySelector(`[name="${name}"]`);
  const errorEl = document.getElementById(`error-${name}`);
  if (input) {
    input.classList.remove("error");
    input.classList.add("success");
  }
  if (errorEl) errorEl.classList.remove("show");
}

function clearAllErrors() {
  document.querySelectorAll(".field-error").forEach((el) => el.classList.remove("show"));
  document.querySelectorAll(".form-input").forEach((el) => el.classList.remove("error", "success"));
}

// ---- TOAST ----
function showToast(msg, type = "success") {
  let toast = document.getElementById("toast-msg");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-msg";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✅" : "❌"}</span> ${msg}`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ---- FORM INITIALIZATION ----
function initFormBehavior() {
  const form = document.getElementById("dang-nhap-form");
  const submitBtn = document.getElementById("btn-submit-login");

  // Real-time validation on blur
  form.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("blur", () => {
      const result = validateField(input.name, input.value);
      if (!result.valid) showFieldError(input.name, result.msg);
      else clearFieldError(input.name);
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        const result = validateField(input.name, input.value);
        if (result.valid) clearFieldError(input.name);
      }
    });
  });

  // Password toggle
  const toggleBtn = document.getElementById("toggle-input-password");
  const passwordInput = document.getElementById("input-password");
  if (toggleBtn && passwordInput) {
    let visible = false;
    toggleBtn.addEventListener("click", () => {
      visible = !visible;
      passwordInput.type = visible ? "text" : "password";
      toggleBtn.innerHTML = visible ? EYE_SHOW_SVG : EYE_SVG;
    });
  }

  // Form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearAllErrors();

    const formData = new FormData(form);
    let isValid = true;

    dangNhapData.form.fields.forEach((fieldDef) => {
      const value = formData.get(fieldDef.name) || "";
      const result = validateField(fieldDef.name, value);
      if (!result.valid) {
        showFieldError(fieldDef.name, result.msg);
        isValid = false;
      }
    });

    if (!isValid) {
      showToast("Vui lòng kiểm tra lại thông tin!", "error");
      return;
    }

    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    await new Promise((r) => setTimeout(r, 1500));
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
    showToast("Đăng nhập thành công! Đang chuyển hướng...", "success");
  });
}

// ---- BOOT ----
document.addEventListener("DOMContentLoaded", () => {
  renderDangNhapPage();
});
