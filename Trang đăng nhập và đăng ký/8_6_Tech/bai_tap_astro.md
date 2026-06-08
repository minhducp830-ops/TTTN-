# 🚀 Bài Tập Cơ Bản - Astro Framework

## Giới thiệu
**Astro** là một framework web hiện đại giúp xây dựng website nhanh hơn với ít JavaScript hơn.  
Website: https://astro.build/

---

## 📝 Bài Tập 1: Tạo Trang Web Cá Nhân Với Astro

### Yêu cầu:
Tạo một trang web cá nhân đơn giản sử dụng Astro với các tính năng sau:
1. Trang chủ (`index.astro`) có tiêu đề và giới thiệu bản thân
2. Component `Header.astro` dùng lại được
3. Component `Footer.astro` dùng lại được

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

### 💻 Code mẫu:

#### Bước 1: Khởi tạo dự án Astro
```bash
npm create astro@latest my-astro-site
cd my-astro-site
npm install
npm run dev
```

#### Bước 2: Tạo file `src/components/Header.astro`
```astro
---
// Header Component
const { title } = Astro.props;
---

<header style="background: #1a1a2e; color: white; padding: 1rem 2rem; text-align: center;">
  <h1>{title}</h1>
  <nav>
    <a href="/" style="color: #e94560; margin: 0 1rem;">Trang chủ</a>
    <a href="/about" style="color: #e94560; margin: 0 1rem;">Giới thiệu</a>
    <a href="/contact" style="color: #e94560; margin: 0 1rem;">Liên hệ</a>
  </nav>
</header>
```

#### Bước 3: Tạo file `src/components/Footer.astro`
```astro
---
// Footer Component
const currentYear = new Date().getFullYear();
---

<footer style="background: #0f3460; color: white; padding: 1rem; text-align: center;">
  <p>© {currentYear} - Phạm Minh Đức | Mã SV: 221A290087</p>
  <p>Được xây dựng với ❤️ và Astro</p>
</footer>
```

#### Bước 4: Tạo file `src/pages/index.astro`
```astro
---
// Trang chủ
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const name = "Phạm Minh Đức";
const studentId = "221A290087";
const skills = ["HTML", "CSS", "JavaScript", "Astro", "TailwindCSS"];
---

<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trang Cá Nhân - {name}</title>
</head>
<body style="margin: 0; font-family: Arial, sans-serif; background: #16213e; color: white;">

  <!-- Sử dụng Header component -->
  <Header title={`Chào mừng đến trang của ${name}`} />

  <!-- Nội dung chính -->
  <main style="max-width: 800px; margin: 2rem auto; padding: 0 1rem;">
    <section style="background: #1a1a2e; border-radius: 10px; padding: 2rem; margin-bottom: 2rem;">
      <h2>👤 Thông tin sinh viên</h2>
      <p><strong>Họ tên:</strong> {name}</p>
      <p><strong>Mã SV:</strong> {studentId}</p>
      <p><strong>Trường:</strong> Đại học Công nghệ TP.HCM (HUTECH)</p>
    </section>

    <section style="background: #1a1a2e; border-radius: 10px; padding: 2rem;">
      <h2>🛠️ Kỹ năng</h2>
      <ul>
        {skills.map(skill => (
          <li style="padding: 0.3rem 0; color: #e94560;">{skill}</li>
        ))}
      </ul>
    </section>
  </main>

  <!-- Sử dụng Footer component -->
  <Footer />

</body>
</html>
```

---

### ✅ Kết quả mong đợi:
- Trang web hiển thị thông tin cá nhân
- Header và Footer được tái sử dụng như component
- Dữ liệu được truyền qua props

### 🎯 Điểm học được:
- Cách tạo và sử dụng `.astro` component
- Truyền props giữa các component
- Sử dụng JavaScript trong frontmatter (`---`)
- Render danh sách với `.map()`

---
> 📅 Ngày: 08/06/2026 | 👤 Phạm Minh Đức - 221A290087
