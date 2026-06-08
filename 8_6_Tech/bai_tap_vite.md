# ⚡ Bài Tập Cơ Bản - Vite Build Tool

## Thông tin sinh viên
| Họ và tên | Mã sinh viên | Trường | Ngày |
|-----------|-------------|--------|------|
| Phạm Minh Đức | 221A290087 | Đại học Văn Hiến | 08/06/2026 |

---

## Giới thiệu về Vite
**Vite** (đọc là "vít") là một build tool thế hệ mới, cực kỳ nhanh cho phát triển web hiện đại.
- Website chính thức: https://vite.dev/
- Đặc điểm: Khởi động < 1 giây, Hot Module Replacement (HMR), Native ES Modules

---

## 📝 Bài Tập: Xây Dựng Ứng Dụng Counter Với Vite + JavaScript

### Yêu cầu bài tập:
Tạo một ứng dụng **bộ đếm (counter)** đơn giản sử dụng Vite với các tính năng:
1. Hiển thị số đếm hiện tại
2. Nút **Tăng** (+1), **Giảm** (-1), **Đặt lại** (Reset)
3. Số đếm không xuống dưới **0** và không vượt quá **100**
4. Tách logic ra file riêng bằng **ES Modules**

---

### 📁 Cấu trúc thư mục:
```
my-vite-app/
├── src/
│   ├── counter.js      ← Module chứa logic đếm
│   └── main.js         ← File JS chính, xử lý UI
├── index.html          ← File HTML chính
├── style.css           ← File CSS
└── package.json
```

---

### 💻 Hướng dẫn thực hiện:

#### Bước 1: Khởi tạo dự án Vite
```bash
npm create vite@latest my-vite-app -- --template vanilla
cd my-vite-app
npm install
npm run dev
```

#### Bước 2: Tạo `src/counter.js` (Module logic)
```javascript
// src/counter.js
// Module xử lý toàn bộ logic của bộ đếm

let count = 0;          // Giá trị hiện tại
const MIN = 0;          // Giới hạn tối thiểu
const MAX = 100;        // Giới hạn tối đa

/**
 * Tăng giá trị counter lên 1
 * @returns {number} Giá trị mới sau khi tăng
 */
export function increment() {
  if (count < MAX) {
    count++;
  }
  return count;
}

/**
 * Giảm giá trị counter xuống 1 (không dưới MIN)
 * @returns {number} Giá trị mới sau khi giảm
 */
export function decrement() {
  if (count > MIN) {
    count--;
  }
  return count;
}

/**
 * Đặt lại counter về 0
 * @returns {number} Giá trị 0
 */
export function reset() {
  count = 0;
  return count;
}

/**
 * Lấy giá trị hiện tại
 * @returns {number} Giá trị hiện tại của counter
 */
export function getCount() {
  return count;
}
```

#### Bước 3: Tạo `src/main.js` (Xử lý giao diện)
```javascript
// src/main.js
// Import các hàm từ module counter
import { increment, decrement, reset, getCount } from './counter.js';

// Lấy các phần tử từ HTML
const countDisplay  = document.getElementById('count-display');
const btnIncrement  = document.getElementById('btn-increment');
const btnDecrement  = document.getElementById('btn-decrement');
const btnReset      = document.getElementById('btn-reset');
const statusText    = document.getElementById('status-text');

/**
 * Cập nhật giao diện theo giá trị hiện tại
 */
function updateUI() {
  const current = getCount();

  // Hiển thị số đếm
  countDisplay.textContent = current;

  // Đổi màu và trạng thái theo giá trị
  if (current === 0) {
    countDisplay.style.color = '#6b7280';
    statusText.textContent = '📌 Nhấn nút + để bắt đầu đếm';
  } else if (current >= 80) {
    countDisplay.style.color = '#ef4444';
    statusText.textContent = '⚠️ Sắp đạt giới hạn tối đa (100)!';
  } else if (current >= 50) {
    countDisplay.style.color = '#f59e0b';
    statusText.textContent = '🔥 Đã vượt nửa chặng đường!';
  } else {
    countDisplay.style.color = '#10b981';
    statusText.textContent = '✅ Đang đếm bình thường...';
  }

  // Vô hiệu hóa nút khi đạt giới hạn
  btnDecrement.disabled = (current === 0);
  btnIncrement.disabled = (current === 100);
}

// Gắn sự kiện cho các nút
btnIncrement.addEventListener('click', () => {
  increment();
  updateUI();
});

btnDecrement.addEventListener('click', () => {
  decrement();
  updateUI();
});

btnReset.addEventListener('click', () => {
  reset();
  updateUI();
});

// Khởi tạo giao diện khi trang load
updateUI();
console.log('⚡ Counter App khởi động với Vite!');
```

#### Bước 4: Tạo `index.html`
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Counter App - Vite | Phạm Minh Đức | ĐH Văn Hiến</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="container">

    <header>
      <h1>⚡ Counter App với Vite</h1>
      <p class="subtitle">Sinh viên: Phạm Minh Đức | MSSV: 221A290087</p>
      <p class="subtitle">🏫 Đại học Văn Hiến</p>
    </header>

    <main class="counter-card">
      <p class="label">Số đếm hiện tại</p>
      <div id="count-display" class="count">0</div>
      <p id="status-text" class="status">📌 Nhấn nút + để bắt đầu đếm</p>

      <div class="controls">
        <button id="btn-decrement" class="btn btn-danger" disabled>− Giảm</button>
        <button id="btn-reset"     class="btn btn-secondary">↺ Reset</button>
        <button id="btn-increment" class="btn btn-success">+ Tăng</button>
      </div>
    </main>

    <section class="info">
      <h2>📖 Hướng dẫn sử dụng</h2>
      <ul>
        <li><strong>+ Tăng</strong>: Tăng số đếm lên 1 (tối đa 100)</li>
        <li><strong>− Giảm</strong>: Giảm số đếm xuống 1 (tối thiểu 0)</li>
        <li><strong>↺ Reset</strong>: Đặt lại về 0</li>
      </ul>
    </section>

  </div>

  <!-- Vite xử lý file JS kiểu module -->
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

#### Bước 5: Tạo `style.css`
```css
/* style.css */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #16213e;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container { max-width: 480px; width: 90%; text-align: center; }

header h1 { font-size: 2rem; color: #e94560; margin-bottom: 0.5rem; }
.subtitle  { color: #6b7280; font-size: 0.85rem; margin-top: 0.2rem; }

.counter-card {
  background: #1a1a2e;
  border: 1px solid #374151;
  border-radius: 16px;
  padding: 2.5rem;
  margin: 1.5rem 0;
}

.label  { color: #9ca3af; font-size: 0.9rem; margin-bottom: 0.5rem; }
.count  { font-size: 6rem; font-weight: 900; line-height: 1; transition: color 0.3s; }
.status { color: #9ca3af; font-size: 0.85rem; margin: 1rem 0 2rem; min-height: 1.2rem; }

.controls { display: flex; gap: 0.75rem; justify-content: center; }

.btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
}
.btn:hover:not(:disabled) { transform: scale(1.05); }
.btn:active:not(:disabled) { transform: scale(0.95); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-success  { background: #10b981; color: white; }
.btn-danger   { background: #ef4444; color: white; }
.btn-secondary { background: #374151; color: white; }

.info {
  background: #1a1a2e;
  border: 1px solid #374151;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
}
.info h2  { font-size: 1rem; color: #e94560; margin-bottom: 0.75rem; }
.info li  { color: #9ca3af; font-size: 0.85rem; padding: 0.3rem 0; list-style: none; }
.info li::before { content: '→ '; color: #e94560; }
```

---

### 🚀 Các lệnh hay dùng:
```bash
npm run dev      # Chạy server phát triển (cực nhanh)
npm run build    # Build sản phẩm cho production
npm run preview  # Xem trước bản build production
```

---

### ✅ Kết quả mong đợi:
- Server khởi động dưới **1 giây**
- Thay đổi code → cập nhật ngay lập tức (**HMR**)
- Counter hoạt động đúng giới hạn 0 - 100
- Code tách module rõ ràng với `import/export`

### 🎯 Kiến thức học được:
- Cách khởi tạo và cấu hình dự án Vite
- **ES Modules**: `import` / `export`
- **Hot Module Replacement (HMR)**
- Sử dụng `import.meta.env` để kiểm tra môi trường
- Phân biệt `npm run dev` và `npm run build`

### ⚡ Vì sao Vite nhanh hơn các công cụ cũ?

| Tiêu chí | Vite | Webpack / CRA |
|----------|------|---------------|
| Khởi động | < 1 giây | 10–30 giây |
| Hot reload | Tức thì | Vài giây |
| Xử lý JS | **esbuild** (Go) | Babel (JS) |
| Phương thức | Native ES Modules | Bundle tất cả |

---
> 📅 Ngày: 08/06/2026 | 👤 Phạm Minh Đức - 221A290087 | 🏫 Đại học Văn Hiến
