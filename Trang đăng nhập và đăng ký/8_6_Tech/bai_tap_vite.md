# ⚡ Bài Tập Cơ Bản - Vite Build Tool

## Giới thiệu
**Vite** (đọc là "vít") là một build tool thế hệ mới, cực kỳ nhanh cho phát triển web hiện đại.  
Website: https://vite.dev/

---

## 📝 Bài Tập: Xây Dựng Ứng Dụng Counter Với Vite + JavaScript

### Yêu cầu:
Tạo một ứng dụng **bộ đếm (counter)** đơn giản sử dụng Vite với các tính năng:
1. Hiển thị số đếm hiện tại
2. Nút tăng (+1), giảm (-1), đặt lại (reset)
3. Giới hạn: số đếm không xuống dưới 0
4. Module hóa code (tách file JS riêng)

---

### 📁 Cấu trúc thư mục:
```
my-vite-app/
├── src/
│   ├── counter.js      ← Module counter logic
│   └── main.js         ← File JS chính
├── index.html          ← File HTML chính
├── style.css           ← File CSS
└── package.json
```

---

### 💻 Code mẫu:

#### Bước 1: Khởi tạo dự án Vite
```bash
npm create vite@latest my-vite-app -- --template vanilla
cd my-vite-app
npm install
npm run dev
```

#### Bước 2: Tạo file `src/counter.js` (Module logic)
```javascript
// src/counter.js
// Module xử lý logic của counter

// Trạng thái counter
let count = 0;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

/**
 * Tăng giá trị counter lên 1
 * @returns {number} Giá trị mới
 */
export function increment() {
  if (count < MAX_VALUE) {
    count++;
  }
  return count;
}

/**
 * Giảm giá trị counter xuống 1 (không xuống dưới 0)
 * @returns {number} Giá trị mới
 */
export function decrement() {
  if (count > MIN_VALUE) {
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
 * @returns {number} Giá trị hiện tại
 */
export function getCount() {
  return count;
}
```

#### Bước 3: Tạo file `src/main.js` (File chính)
```javascript
// src/main.js
// Import module counter và xử lý UI

import { increment, decrement, reset, getCount } from './counter.js';

// Lấy các phần tử DOM
const countDisplay = document.getElementById('count-display');
const incrementBtn = document.getElementById('btn-increment');
const decrementBtn = document.getElementById('btn-decrement');
const resetBtn = document.getElementById('btn-reset');
const statusText = document.getElementById('status-text');

// Cập nhật giao diện
function updateUI() {
  const currentCount = getCount();
  
  // Cập nhật số đếm
  countDisplay.textContent = currentCount;
  
  // Thay đổi màu theo giá trị
  if (currentCount === 0) {
    countDisplay.style.color = '#6b7280';
    statusText.textContent = 'Bắt đầu đếm bằng cách nhấn nút +';
  } else if (currentCount >= 80) {
    countDisplay.style.color = '#ef4444';
    statusText.textContent = '⚠️ Sắp đạt giới hạn!';
  } else if (currentCount >= 50) {
    countDisplay.style.color = '#f59e0b';
    statusText.textContent = '🔥 Đang tiến về phía trước!';
  } else {
    countDisplay.style.color = '#10b981';
    statusText.textContent = '✅ Đang đếm...';
  }
  
  // Disable nút giảm nếu count = 0
  decrementBtn.disabled = currentCount === 0;
  decrementBtn.style.opacity = currentCount === 0 ? '0.5' : '1';
  
  // Disable nút tăng nếu count = 100
  incrementBtn.disabled = currentCount === 100;
  incrementBtn.style.opacity = currentCount === 100 ? '0.5' : '1';
}

// Xử lý sự kiện nút Tăng
incrementBtn.addEventListener('click', () => {
  increment();
  updateUI();
  
  // Animation khi nhấn
  countDisplay.classList.add('animate-pulse');
  setTimeout(() => countDisplay.classList.remove('animate-pulse'), 200);
});

// Xử lý sự kiện nút Giảm
decrementBtn.addEventListener('click', () => {
  decrement();
  updateUI();
});

// Xử lý sự kiện nút Reset
resetBtn.addEventListener('click', () => {
  reset();
  updateUI();
});

// Khởi tạo UI lần đầu
updateUI();

console.log('✅ Ứng dụng Counter đã khởi động với Vite!');
console.log('📦 Vite version:', import.meta.env.MODE);
```

#### Bước 4: Tạo file `index.html`
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Counter App - Vite | Phạm Minh Đức</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>

  <div class="container">
    <!-- Tiêu đề -->
    <header>
      <h1>⚡ Counter App với Vite</h1>
      <p class="subtitle">Sinh viên: Phạm Minh Đức | MSSV: 221A290087</p>
    </header>

    <!-- Hiển thị Counter -->
    <main class="counter-card">
      <p class="label">Số đếm hiện tại</p>
      <div id="count-display" class="count">0</div>
      <p id="status-text" class="status">Bắt đầu đếm bằng cách nhấn nút +</p>
      
      <!-- Các nút điều khiển -->
      <div class="controls">
        <button id="btn-decrement" class="btn btn-danger">− Giảm</button>
        <button id="btn-reset" class="btn btn-secondary">↺ Reset</button>
        <button id="btn-increment" class="btn btn-success">+ Tăng</button>
      </div>
    </main>

    <!-- Hướng dẫn -->
    <section class="info">
      <h2>📖 Hướng dẫn sử dụng</h2>
      <ul>
        <li>Nhấn <strong>+ Tăng</strong> để tăng số đếm lên 1</li>
        <li>Nhấn <strong>− Giảm</strong> để giảm số đếm xuống 1 (tối thiểu 0)</li>
        <li>Nhấn <strong>↺ Reset</strong> để đặt lại về 0</li>
        <li>Giới hạn: từ <strong>0</strong> đến <strong>100</strong></li>
      </ul>
    </section>
  </div>

  <!-- Script được Vite xử lý -->
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

#### Bước 5: Tạo file `style.css`
```css
/* style.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #16213e;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 500px;
  width: 90%;
  text-align: center;
}

header h1 {
  font-size: 2rem;
  color: #e94560;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.counter-card {
  background: #1a1a2e;
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid #374151;
  margin-bottom: 1.5rem;
}

.label {
  color: #9ca3af;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.count {
  font-size: 6rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.status {
  color: #9ca3af;
  font-size: 0.85rem;
  margin-bottom: 2rem;
  min-height: 1.2rem;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
}

.btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.btn:active:not(:disabled) {
  transform: scale(0.95);
}

.btn-success  { background: #10b981; color: white; }
.btn-danger   { background: #ef4444; color: white; }
.btn-secondary { background: #374151; color: white; }

.info {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #374151;
  text-align: left;
}

.info h2 {
  font-size: 1rem;
  color: #e94560;
  margin-bottom: 1rem;
}

.info li {
  padding: 0.4rem 0;
  color: #9ca3af;
  font-size: 0.85rem;
  list-style: none;
  padding-left: 0;
}

.info li::before {
  content: '→ ';
  color: #e94560;
}
```

---

### 🚀 Chạy dự án:
```bash
# Chế độ phát triển (Development)
npm run dev

# Build cho Production
npm run build

# Xem trước bản build
npm run preview
```

---

### ✅ Kết quả mong đợi:
- Server phát triển khởi động cực nhanh (< 1 giây)
- Hot Module Replacement (HMR) - cập nhật tức thì khi sửa code
- Counter hoạt động đúng với giới hạn 0-100
- Code được module hóa rõ ràng

### 🎯 Điểm học được:
- Cách khởi tạo và cấu hình dự án Vite
- ES Modules với `import`/`export`
- Hot Module Replacement (HMR)
- Sử dụng `import.meta.env` trong Vite
- Build production với `npm run build`

### ⚡ Tại sao Vite nhanh?
| Vite | Webpack/CRA |
|------|-------------|
| Native ES Modules | Bundle tất cả |
| Khởi động < 1s | Khởi động 10-30s |
| HMR tức thì | HMR chậm hơn |
| Esbuild cho Dependencies | Babel/Terser |

---
> 📅 Ngày: 08/06/2026 | 👤 Phạm Minh Đức - 221A290087
