/**
 * Popup Management
 * Mở popup theo ID.
 */
function openPopup(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
}

/**
 * Đóng popup theo ID.
 */
function closePopup(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    initMenuButtons();
    initPopupOverlayClose();
    initGenderSelection();
    initRegistrationForm();
});

/** Đóng popup khi click vào vùng nền tối (ngoài nội dung). */
function initPopupOverlayClose() {
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup-overlay')) {
            event.target.classList.remove('active');
        }
    });
}

/** Xử lý chọn giới tính: chỉ một option active tại một thời điểm. */
function initGenderSelection() {
    const genderOptions = document.querySelectorAll('.gender-option');
    genderOptions.forEach((option) => {
        option.addEventListener('click', () => {
            genderOptions.forEach((el) => el.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

/**
 * Gắn sự kiện click cho các nút menu (thay thế onclick inline trong HTML).
 * Mỗi nút được map với popup ID tương ứng.
 */
function initMenuButtons() {
    const menuMap = {
        'btn-thele':    'popup-thele',
        'btn-huongdan': 'popup-huongdan',
    };

    Object.entries(menuMap).forEach(([btnId, popupId]) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.addEventListener('click', () => openPopup(popupId));
    });
}

/** Gắn sự kiện submit cho form đăng ký, validate trước khi mở popup thành công. */
function initRegistrationForm() {
    const confirmBtn = document.getElementById('btn-confirm');
    if (!confirmBtn) return;

    confirmBtn.addEventListener('click', () => {
        if (validateForm()) {
            openPopup('popup-success');
        }
    });
}

/**
 * Kiểm tra các trường bắt buộc trong form.
 * @returns {boolean} true nếu hợp lệ.
 */
function validateForm() {
    const address = document.getElementById('input-address')?.value.trim();
    const phone   = document.getElementById('input-phone')?.value.trim();
    const region  = document.getElementById('input-region')?.value.trim();
    const bio     = document.getElementById('input-bio')?.value.trim();

    if (!address || !phone || !region || !bio) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
        return false;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam (10 số, bắt đầu bằng 0)
    if (!/^0\d{9}$/.test(phone)) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số bắt đầu bằng 0.');
        return false;
    }

    if (bio.length > 300) {
        alert('Nội dung giới thiệu không được vượt quá 300 ký tự.');
        return false;
    }

    return true;
}
