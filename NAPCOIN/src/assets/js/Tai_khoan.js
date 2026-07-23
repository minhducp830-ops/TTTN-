/**
 * TAI_KHOAN.JS - Core logic cho các trang quản lý tài khoản MYE
 * Đã được tối ưu hóa theo các tiêu chuẩn DRY, SRP, và Clean Code.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSyncSection();
  initPersonalInfoEdit();
  initActivityHistory();
});

/**
 * 1. Khởi tạo logic cho thẻ Đồng bộ tài khoản (hỗ trợ cả tài khoản Base và Social)
 * (Single Responsibility: Chỉ xử lý thao tác của khối Đồng bộ)
 */
function initSyncSection() {
  const syncChevronBtn = document.getElementById('btn-toggle-sync');
  if (!syncChevronBtn) return; // Kiểm tra lỗi/null

  // Elements của màn hình Base (Tai_khoan.html)
  const baseDefault = document.getElementById('sync-default-state');
  const baseExpanded = document.getElementById('sync-expanded-state');
  
  // Elements của màn hình Social (Tai_khoan_fb.html, Tai_khoan_gg.html)
  const socialDefault = document.getElementById('sync-social-default');
  const socialForm = document.getElementById('sync-social-form');
  const socialSuccess = document.getElementById('sync-social-success');
  const btnSubmitSync = document.getElementById('btn-submit-sync');

  const isSocialPage = socialDefault && socialForm;
  let currentSocialState = 1; // 1: Mặc định, 2: Nhập thông tin, 3: Thành công

  // Logic thu gọn/mở rộng card đồng bộ
  syncChevronBtn.addEventListener('click', () => {
    if (isSocialPage) {
      if (currentSocialState === 1) {
        toggleDisplays([socialDefault, socialForm, socialSuccess], ['none', 'block', 'none']);
        updateChevronIcon(syncChevronBtn, true);
        currentSocialState = 2;
      } else {
        toggleDisplays([socialDefault, socialForm, socialSuccess], ['block', 'none', 'none']);
        updateChevronIcon(syncChevronBtn, false);
        currentSocialState = 1;
      }
    } else if (baseDefault && baseExpanded) {
      const isCurrentlyExpanded = baseExpanded.style.display === 'block';
      toggleDisplays([baseDefault, baseExpanded], [isCurrentlyExpanded ? 'block' : 'none', isCurrentlyExpanded ? 'none' : 'block']);
      updateChevronIcon(syncChevronBtn, !isCurrentlyExpanded);
    }
  });

  // Logic nút Submit đồng bộ cho trang Social
  if (btnSubmitSync && socialForm && socialSuccess) {
    btnSubmitSync.addEventListener('click', () => {
      toggleDisplays([socialDefault, socialForm, socialSuccess], ['none', 'none', 'block']);
      currentSocialState = 3;
    });
  }
}

/**
 * 2. Khởi tạo logic Chỉnh sửa Thông tin Cá nhân
 * (Single Responsibility: Chỉ xử lý thao tác của khối Thông tin cá nhân)
 */
function initPersonalInfoEdit() {
  const btnEdit = document.getElementById('btn-edit-info');
  const btnCancel = document.getElementById('btn-cancel-info');
  const btnSave = document.getElementById('btn-save-info');
  
  const headerDefault = document.getElementById('info-header-default');
  const headerEdit = document.getElementById('info-header-edit');
  const infoDefault = document.getElementById('info-default-state');
  const infoEdit = document.getElementById('info-edit-state');

  if (!btnEdit || !btnCancel) return;

  const setEditMode = (isEditing) => {
    const defaultDisplay = isEditing ? 'none' : 'block';
    const editDisplay = isEditing ? 'block' : 'none';
    
    toggleDisplays(
      [headerDefault, infoDefault, headerEdit, infoEdit], 
      [defaultDisplay, defaultDisplay, editDisplay, editDisplay]
    );
  };

  btnEdit.addEventListener('click', () => setEditMode(true));
  btnCancel.addEventListener('click', () => setEditMode(false));
  if (btnSave) btnSave.addEventListener('click', () => setEditMode(false)); // Giả lập lưu thành công
}

/**
 * 3. Khởi tạo logic thu gọn/mở rộng Lịch sử Hoạt động
 * (Single Responsibility: Chỉ xử lý khối Lịch sử)
 */
function initActivityHistory() {
  const btnToggle = document.getElementById('btn-toggle-history');
  const historyContent = document.getElementById('history-content');
  
  if (!btnToggle || !historyContent) return;

  btnToggle.addEventListener('click', () => {
    const isExpanded = historyContent.style.display === 'block';
    historyContent.style.display = isExpanded ? 'none' : 'block';
    updateChevronIcon(btnToggle, !isExpanded);
  });
}

/**
 * HÀM TIỆN ÍCH (UTILITIES)
 * Giúp giảm lặp code (DRY)
 */

/**
 * Thay đổi thuộc tính display của một danh sách các DOM elements
 * @param {HTMLElement[]} elements - Mảng các elements cần đổi display
 * @param {string[]} displayValues - Mảng các giá trị display tương ứng
 */
function toggleDisplays(elements, displayValues) {
  elements.forEach((el, index) => {
    if (el) el.style.display = displayValues[index];
  });
}

/**
 * Cập nhật icon mũi tên (chevron) dựa trên trạng thái mở rộng
 * @param {HTMLElement} button - Nút chứa icon
 * @param {boolean} isExpanded - Trạng thái đang mở hay đóng
 */
function updateChevronIcon(button, isExpanded) {
  button.innerHTML = isExpanded ? '<i class="bi bi-chevron-down"></i>' : '<i class="bi bi-chevron-right"></i>';
}
