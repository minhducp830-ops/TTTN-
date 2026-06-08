# 🚀 Bài Tập Cơ Bản - Astro Framework

## Thông tin sinh viên
| Họ và tên | Mã sinh viên | Trường | Ngày |
|-----------|-------------|--------|------|
| Phạm Minh Đức | 221A290087 | Đại học Văn Hiến | 08/06/2026 |

---

## Giới thiệu về Astro
**Astro** là một framework web hiện đại giúp xây dựng website nhanh hơn với ít JavaScript hơn.
- Website chính thức: https://astro.build/
- Đặc điểm: Zero JS by default, Component Islands, Server-first

---

## 📝 Bài Tập: Tạo Trang Web Cá Nhân Với Astro

### Yêu cầu bài tập:
Tạo một trang web cá nhân đơn giản sử dụng Astro với các tính năng:
1. Trang chủ `index.astro` có tiêu đề và phần giới thiệu bản thân
2. Component `Header.astro` được tái sử dụng
3. Component `Footer.astro` được tái sử dụng
4. Truyền dữ liệu qua **props**

---

### 📁 Cấu trúc thư mục:
```
my-astro-site/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── pages/
│       └── index.astro
├── public/
└── package.json
```

---

### 💻 Hướng dẫn thực hiện:

#### Bước 1: Khởi tạo dự án Astro
```bash
npm create astro@latest my-astro-site
cd my-astro-site
npm install
npm run dev
```

#### Bước 2: Tạo `src/components/Header.astro`
```astro
---
// Header Component - nhận title từ props
const { title } = Astro.props;
---

<header>
  <h1>{title}</h1>
  <nav>
    <a href="/">Trang chủ</a>
    <a href="/about">Giới thiệu</a>
    <a href="/contact">Liên hệ</a>
  </nav>
</header>

<style>
  header {
    background: #1a1a2e;
    color: white;
    padding: 1rem 2rem;
    text-align: center;
  }
  nav a {
    color: #e94560;
    margin: 0 1rem;
    text-decoration: none;
  }
  nav a:hover {
    text-decoration: underline;
  }
</style>
```

#### Bước 3: Tạo `src/components/Footer.astro`
```astro
---
// Footer Component
const currentYear = new Date().getFullYear();
---

<footer>
  <p>© {currentYear} - Phạm Minh Đức | MSSV: 221A290087</p>
  <p>Sinh viên Đại học Văn Hiến - Được xây dựng với Astro ⚡</p>
</footer>

<style>
  footer {
    background: #0f3460;
    color: #9ca3af;
    padding: 1.5rem;
    text-align: center;
    font-size: 0.9rem;
  }
</style>
```

#### Bước 4: Tạo `src/pages/index.astro`
```astro
---
// Trang chủ - import và sử dụng các component
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

// Khai báo dữ liệu
const name = "Phạm Minh Đức";
const studentId = "221A290087";
const school = "Đại học Văn Hiến";
const skills = ["HTML", "CSS", "JavaScript", "Astro", "TailwindCSS", "Vite"];
---

<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trang Cá Nhân - {name}</title>
</head>
<body>

  <!-- Truyền title vào Header qua props -->
  <Header title={`Xin chào, tôi là ${name}`} />

  <main>
    <!-- Thông tin sinh viên -->
    <section class="card">
      <h2>👤 Thông tin sinh viên</h2>
      <p><strong>Họ tên:</strong> {name}</p>
      <p><strong>Mã sinh viên:</strong> {studentId}</p>
      <p><strong>Trường:</strong> {school}</p>
    </section>

    <!-- Danh sách kỹ năng - render bằng .map() -->
    <section class="card">
      <h2>🛠️ Kỹ năng</h2>
      <ul>
        {skills.map(skill => (
          <li>{skill}</li>
        ))}
      </ul>
    </section>
  </main>

  <Footer />

</body>
</html>

<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #16213e;
    color: white;
  }
  main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .card {
    background: #1a1a2e;
    border: 1px solid #374151;
    border-radius: 12px;
    padding: 1.5rem;
  }
  h2 {
    color: #e94560;
    margin-top: 0;
  }
  li {
    padding: 0.3rem 0;
    color: #9ca3af;
  }
</style>
```

---

### ✅ Kết quả mong đợi:
- Trang web hiển thị đúng thông tin cá nhân
- Header và Footer được tái sử dụng qua component
- Danh sách kỹ năng render tự động bằng `.map()`

### 🎯 Kiến thức học được:
- Tạo và sử dụng `.astro` component
- Truyền dữ liệu qua **props**
- Sử dụng JavaScript trong frontmatter (`---`)
- Scoped CSS trong Astro
- Render danh sách với `.map()`

---
> 📅 Ngày: 08/06/2026 | 👤 Phạm Minh Đức - 221A290087 | 🏫 Đại học Văn Hiến
