document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      // Kiểm tra trạng thái hiện tại
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Đổi icon con mắt
      if (type === 'text') {
        togglePassword.classList.remove('bi-eye-slash-fill');
        togglePassword.classList.add('bi-eye-fill');
        togglePassword.style.color = '#093A88'; // Đổi màu khi hiện pass
      } else {
        togglePassword.classList.remove('bi-eye-fill');
        togglePassword.classList.add('bi-eye-slash-fill');
        togglePassword.style.color = '#A0A0A0'; // Trả về màu cũ khi ẩn pass
      }
    });
  }
});
