// Dữ liệu mẫu cho trang Hexagon (trang chủ VI + EN)
const LOGO_URL = 'https://beta.hexagon.xyz/assets/images/logo-hhc.png';
const HERO_IMG = 'https://beta.hexagon.xyz/assets/images/logo-hhc.png';

const homepageVI = {
  content: [
    {
      type: 'HexNavbar',
      props: {
        id: 'navbar-vi',
        logoUrl: LOGO_URL,
        logoText: 'HEXAGON',
        menuItems: [
          { label: 'Trang chủ', url: '/#trang-chu' },
          { label: 'Giới thiệu', url: '/#gioi-thieu' },
          { label: 'Dịch vụ', url: '/#dich-vu' },
          { label: 'Tin tức', url: '/#tin-tuc' },
          { label: 'Liên hệ', url: '/#lien-he' },
        ],
        showLangSwitcher: true,
        background: { type: 'color', color: '#1A6B49' },
        textColor: '#ffffff',
      },
    },
    {
      type: 'HexHero',
      props: {
        id: 'hero-vi',
        tagline: 'Công nghệ tương lai',
        title: 'HEXAGON Solutions',
        subtitle:
          'Hexagon kiến tạo các giải pháp chuyển đổi số toàn diện, từ phần mềm, AI đến an ninh mạng, giúp doanh nghiệp bứt phá trong kỷ nguyên số.',
        typewriterItems: [
          { text: 'Giải pháp công nghệ' },
          { text: 'Giải pháp thi công & lắp đặt' },
          { text: 'Cung cấp thiết bị CNTT' },
          { text: 'Dịch vụ Công nghệ thông tin' },
        ],
        buttons: [
          { text: 'Khám phá Dịch vụ', url: '#dich-vu', style: 'primary' },
          { text: 'Liên hệ Tư vấn', url: '#lien-he', style: 'secondary' },
        ],
        imageUrl: '/globalmyc.webp',
        scrollLabel: 'Cuộn xuống để khám phá',
        scrollUrl: '#gioi-thieu',
        background: { type: 'gradient', from: '#135237', to: '#41b67d', direction: 'to bottom right' },
        animate: true,
      },
    },
    {
      type: 'HexAbout',
      props: {
        id: 'about-vi',
        title: 'Về Hexagon',
        description:
          'Hexagon Corporation – Công nghệ tiên phong, nơi chúng tôi không ngừng kiến tạo và đổi mới để mang đến những giá trị vượt trội trong kỷ nguyên số. Với tầm nhìn đa chiều và khát vọng vươn tầm, Hexagon tự hào là đối tác tin cậy, đồng hành cùng bạn trên hành trình chinh phục những đỉnh cao công nghệ.',
        imageUrl: 'https://beta.hexagon.xyz/assets/images/VPX16.jpg',
        quoteText: '"Làm ngày, làm đêm, làm thêm ngày nghỉ ^_^"',
        quoteAuthor: 'Hexagon Culture',
        cards: [
          { title: 'Sứ mệnh', content: 'Kiến tạo tương lai số bằng các giải pháp tiên tiến.' },
          { title: 'Tầm nhìn', content: 'Trở thành biểu tượng về hệ sinh thái công nghệ đổi mới.' },
          { title: 'Giá trị cốt lõi', content: 'Đổi mới - Đồng hành - Tiên phong - Minh bạch.' },
          { title: 'Nền tảng', content: 'Hệ sinh thái đa ngành, vững chắc và linh hoạt.' },
        ],
        accentColor: '#1D6A49',
        sectionId: 'gioi-thieu',
        background: { type: 'color', color: '#ffffff' },
      },
    },
    {
      type: 'HexServices',
      props: {
        id: 'services-vi',
        title: 'Lĩnh vực hoạt động',
        subtitle: 'Tại Hexagon, chúng tôi tập trung phát triển hệ sinh thái công nghệ toàn diện, bao gồm:',
        items: [
          {
            name: 'Giải pháp công nghệ',
            description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            url: 'https://beta.hexagon.xyz/vi/giai-phap-cong-nghe',
          },
          {
            name: 'Giải pháp thi công & lắp đặt',
            description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            url: 'https://beta.hexagon.xyz/vi/giai-phap-thi-cong-lap-dat',
          },
          {
            name: 'Cung cấp thiết bị CNTT',
            description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            url: 'https://beta.hexagon.xyz/vi/cung-cap-thiet-bi-cntt',
          },
          {
            name: 'Dịch vụ Công nghệ thông tin',
            description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
            url: 'https://beta.hexagon.xyz/vi/dich-vu-cong-nghe-thong-tin',
          },
        ],
        accentColor: '#1A6B49',
        sectionId: 'dich-vu',
        background: { type: 'color', color: '#f8fafc' },
        animate: true,
      },
    },
    {
      type: 'HexStats',
      props: {
        id: 'stats-vi',
        items: [
          { number: '50+', label: 'Dự án hoàn thành', icon: '🚀' },
          { number: '30+', label: 'Đối tác tin cậy', icon: '🤝' },
          { number: '5+', label: 'Năm kinh nghiệm', icon: '📅' },
          { number: '99%', label: 'Khách hàng hài lòng', icon: '⭐' },
        ],
        textColor: '#ffffff',
        background: { type: 'gradient', from: '#1A6B49', to: '#41b67d', direction: 'to right' },
        animate: true,
      },
    },
    {
      type: 'HexNews',
      props: {
        id: 'news-vi',
        title: 'Tin tức',
        subtitle: 'Cập nhật tin tức, sự kiện và thông tin mới nhất từ Hexagon Corporation.',
        readMoreLabel: 'Xem chi tiết',
        viewAllLabel: 'Xem tất cả bài viết',
        viewAllUrl: '/vi/bai-viet',
        items: [
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
            excerpt: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại khu nghỉ dưỡng Vinpearl Nha Trang.',
            date: '26 thg 6, 2026',
            url: 'https://beta.hexagon.xyz/vi/hoat-dong/khong-khi-tung-bung-tai-chuong-trinh-teambuilding-myh25-tai-ngoi-nha-hung-hau',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            excerpt: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong chương trình “VHE Startup Devote’’.',
            date: '26 thg 6, 2026',
            url: 'https://beta.hexagon.xyz/vi/hoat-dong/dong-hanh-cung-sinh-vien-dai-hoc-van-hien-tai-ngay-hoi-sinh-vien',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
            excerpt: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé ‘Lục Giác’ để chọn cho mình những siêu phẩm hỗ trợ đắc lực cho công việc và giải trí:',
            date: '26 thg 6, 2026',
            url: 'https://beta.hexagon.xyz/vi/su-kien/sam-tet-cong-nghe-nang-cap-thiet-bi-khoi-dau-but-pha',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            title: 'Bài viết 4',
            excerpt: 'Bài viết 4',
            date: '25 thg 6, 2026',
            url: 'https://beta.hexagon.xyz/vi/tin-tuc/bai-viet-4',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            title: 'Bài viết 5',
            excerpt: 'Bài viết 5',
            date: '25 thg 6, 2026',
            url: 'https://beta.hexagon.xyz/vi/tin-tuc/bai-viet-5',
          },
        ],
        sectionId: 'tin-tuc',
        background: { type: 'color', color: '#ffffff' },
        animate: true,
      },
    },
    {
      type: 'HexPartners',
      props: {
        id: 'partners-vi',
        title: 'Các đối tác liên kết',
        logos: [
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi E.png', alt: 'Khối E' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi C.png', alt: 'Khối C' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi D.png', alt: 'Khối D' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Happy Food.png', alt: 'Happy Food' },
          { isSvg: true, svgType: 'ecobook', alt: 'ECOBOOK' },
          { isSvg: true, svgType: 'comoon', alt: 'COMOON' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/B.png', alt: 'Binh Minh' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi F.png', alt: 'Khối F' },
        ],
        background: { type: 'gradient', from: '#0f826b', to: '#86efac', direction: 'to bottom' },
        animate: true,
      },
    },
    {
      type: 'HexContact',
      props: {
        id: 'contact-vi',
        title: 'Liên hệ với chúng tôi',
        description: 'Sẵn sàng cho dự án tiếp theo? Đội ngũ chuyên gia của Hexagon luôn ở đây để lắng nghe và đưa ra giải pháp tốt nhất cho bạn.',
        address: '615 Âu Cơ, Phường Tân Phú, TP. Hồ Chí Minh',
        email: 'contact@hexagon.xyz',
        phone: '096 446 0333',
        socialLinks: [
          { platform: 'Facebook', url: '#' },
          { platform: 'LinkedIn', url: '#' },
          { platform: 'YouTube', url: '#' },
          { platform: 'Zalo', url: '#' },
        ],
        mapEmbed: 'https://maps.google.com/maps?width=600&height=400&hl=vi&q=615+%C3%82u+C%C6%A1+T%C3%A2n+Ph%C3%BA&t=p&z=14&ie=UTF8&iwloc=B&output=embed',
        sectionId: 'lien-he',
        background: { type: 'color', color: '#f8fafc' },
      },
    },
    {
      type: 'HexFooter',
      props: {
        id: 'footer-vi',
        companyName: 'Hexagon Corporation',
        tagline: 'Hệ sinh thái Công nghệ Hexagon',
        copyright: 'Copyright 2026 ©',
        links: [],
        socialLinks: [
          { platform: 'Facebook', icon: 'facebook', url: '#' },
          { platform: 'LinkedIn', icon: 'linkedin', url: '#' },
          { platform: 'YouTube', icon: 'youtube', url: '#' },
        ],
        textColor: '#9ca3af',
        background: { type: 'color', color: '#0D5939' },
      },
    },
  ],
  root: { props: {} },
};

const homepageEN = {
  content: [
    {
      type: 'HexNavbar',
      props: {
        id: 'navbar-en',
        logoUrl: LOGO_URL,
        logoText: 'HEXAGON',
        menuItems: [
          { label: 'Home', url: '/en/trang-chu#trang-chu' },
          { label: 'About', url: '/en/trang-chu#gioi-thieu' },
          { label: 'Services', url: '/en/trang-chu#dich-vu' },
          { label: 'News', url: '/en/trang-chu#tin-tuc' },
          { label: 'Contact', url: '/en/trang-chu#lien-he' },
        ],
        showLangSwitcher: true,
        background: { type: 'color', color: '#1A6B49' },
        textColor: '#ffffff',
      },
    },
    {
      type: 'HexHero',
      props: {
        id: 'hero-en',
        tagline: 'Technology of the Future',
        title: 'HEXAGON Solutions',
        subtitle:
          'Hexagon builds comprehensive digital transformation solutions — from software and AI to cybersecurity — helping businesses thrive in the digital era.',
        typewriterItems: [
          { text: 'Technology Solutions' },
          { text: 'Construction & Installation Solutions' },
          { text: 'Providing IT Equipment' },
          { text: 'Information Technology Services' },
        ],
        buttons: [
          { text: 'Explore Services', url: '#dich-vu', style: 'primary' },
          { text: 'Contact Us', url: '#lien-he', style: 'secondary' },
        ],
        imageUrl: '/globalmyc.webp',
        scrollLabel: 'Scroll down to explore',
        scrollUrl: '#gioi-thieu',
        background: { type: 'gradient', from: '#135237', to: '#41b67d', direction: 'to bottom right' },
        animate: true,
      },
    },
    {
      type: 'HexAbout',
      props: {
        id: 'about-en',
        title: 'About Hexagon',
        description:
          'Hexagon Corporation – A pioneering technology company dedicated to creating and innovating to deliver outstanding values in the digital age. With a multidimensional vision and an ambition to reach new heights, Hexagon is proud to be a trusted partner on your journey to conquer technology frontiers.',
        imageUrl: 'https://beta.hexagon.xyz/assets/images/VPX16.jpg',
        quoteText: '"Work all day, work all night, work on weekends too ^_^"',
        quoteAuthor: 'Hexagon Culture',
        cards: [
          { title: 'Mission', content: 'Building the digital future through advanced solutions.' },
          { title: 'Vision', content: 'Becoming an icon of an innovative technology ecosystem.' },
          { title: 'Core Values', content: 'Innovation - Partnership - Pioneer - Transparency.' },
          { title: 'Foundation', content: 'A multi-sector ecosystem, robust and flexible.' },
        ],
        accentColor: '#1D6A49',
        sectionId: 'gioi-thieu',
        background: { type: 'color', color: '#ffffff' },
      },
    },
    {
      type: 'HexServices',
      props: {
        id: 'services-en',
        title: 'Our Services',
        subtitle: 'At Hexagon, we focus on developing a comprehensive technology ecosystem, including:',
        items: [
          {
            name: 'Technology Solutions',
            description: 'Develop and deliver customized software solutions to optimize business operations, enhance efficiency, and flexibly adapt to specific requirements and long-term growth strategies.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
            url: 'https://beta.hexagon.xyz/en/giai-phap-cong-nghe',
          },
          {
            name: 'Construction & Installation Solutions',
            description: 'Comprehensive digital transformation consulting, helping businesses optimize processes, enhance customer experience and achieve sustainable growth in the digital environment.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
            url: 'https://beta.hexagon.xyz/en/giai-phap-thi-cong-lap-dat',
          },
          {
            name: 'Providing IT Equipment',
            description: 'Offer AI and data analytics solutions to enable intelligent decision-making, automate processes, and unlock the full value of enterprise data assets.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
            url: 'https://beta.hexagon.xyz/en/cung-cap-thiet-bi-cntt',
          },
          {
            name: 'Information Technology Services',
            description: 'Design and install professional camera surveillance and WiFi systems, ensuring security, stable connectivity, and scalability for businesses of all sizes.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
            url: 'https://beta.hexagon.xyz/en/dich-vu-cong-nghe-thong-tin',
          },
        ],
        accentColor: '#1A6B49',
        sectionId: 'dich-vu',
        background: { type: 'color', color: '#f8fafc' },
        animate: true,
      },
    },
    {
      type: 'HexStats',
      props: {
        id: 'stats-en',
        items: [
          { number: '50+', label: 'Projects Completed', icon: '🚀' },
          { number: '30+', label: 'Trusted Partners', icon: '🤝' },
          { number: '5+', label: 'Years of Experience', icon: '📅' },
          { number: '99%', label: 'Customer Satisfaction', icon: '⭐' },
        ],
        textColor: '#ffffff',
        background: { type: 'gradient', from: '#1A6B49', to: '#41b67d', direction: 'to right' },
        animate: true,
      },
    },
    {
      type: 'HexNews',
      props: {
        id: 'news-en',
        title: 'News',
        subtitle: 'Stay updated with the latest news, events, and announcements from Hexagon Corporation.',
        readMoreLabel: 'Read more',
        viewAllLabel: 'View all articles',
        viewAllUrl: '/en/news',
        items: [
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            title: 'A lively atmosphere at the myH25 Teambuilding Program at Hung Hau House.',
            excerpt: "Let's look back at the most beautiful and memorable moments of the HHC family during the MYH25 TEAMBUILDING, held at the Vinpearl Nha Trang resort.",
            date: 'Jun 26, 2026',
            url: 'https://beta.hexagon.xyz/en/work/khong-khi-tung-bung-tai-chuong-trinh-teambuilding-myh25-tai-ngoi-nha-hung-hau',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            title: 'Accompanying Van Hien Univerity Students at the student festival',
            excerpt: 'Hexagon JSC. is honored to accompany the IT students at Van Hien University in the “VHE Startup Devote” competition.',
            date: 'Jun 26, 2026',
            url: 'https://beta.hexagon.xyz/en/work/dong-hanh-cung-sinh-vien-dai-hoc-van-hien-tai-ngay-hoi-sinh-vien',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            title: 'Upgrade your tech - Empower your new year breakthrough',
            excerpt: 'New Year, New Success, New Gear! Investing in technology is investing in your future.',
            date: 'Jun 26, 2026',
            url: 'https://beta.hexagon.xyz/en/event/sam-tet-cong-nghe-nang-cap-thiet-bi-khoi-dau-but-pha',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            title: '4',
            excerpt: '4',
            date: 'Jun 25, 2026',
            url: 'https://beta.hexagon.xyz/en/news/bai-viet-4',
          },
          {
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            title: '5',
            excerpt: '5',
            date: 'Jun 25, 2026',
            url: 'https://beta.hexagon.xyz/en/news/bai-viet-5',
          },
        ],
        sectionId: 'tin-tuc',
        background: { type: 'color', color: '#ffffff' },
        animate: true,
      },
    },
    {
      type: 'HexPartners',
      props: {
        id: 'partners-en',
        title: 'Our Partners',
        logos: [
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi E.png', alt: 'Block E' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi C.png', alt: 'Block C' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi D.png', alt: 'Block D' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Happy Food.png', alt: 'Happy Food' },
          { isSvg: true, svgType: 'ecobook', alt: 'ECOBOOK' },
          { isSvg: true, svgType: 'comoon', alt: 'COMOON' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/B.png', alt: 'Binh Minh' },
          { imageUrl: 'https://webdemo.hexagon.xyz/medias/Logo Khoi F.png', alt: 'Block F' },
        ],
        background: { type: 'gradient', from: '#0f826b', to: '#86efac', direction: 'to bottom' },
        animate: true,
      },
    },
    {
      type: 'HexContact',
      props: {
        id: 'contact-en',
        title: 'Contact Us',
        description: 'Ready for your next project? Our team of experts at Hexagon is here to listen and provide the best solutions for you.',
        address: '615 Au Co, Tan Phu Ward, Ho Chi Minh City',
        email: 'contact@hexagon.xyz',
        phone: '+84 964 460 333',
        socialLinks: [
          { platform: 'Facebook', url: '#' },
          { platform: 'LinkedIn', url: '#' },
          { platform: 'YouTube', url: '#' },
        ],
        mapEmbed: 'https://maps.google.com/maps?width=600&height=400&hl=en&q=615+Au+Co+Tan+Phu&t=p&z=14&ie=UTF8&iwloc=B&output=embed',
        sectionId: 'lien-he',
        background: { type: 'color', color: '#f8fafc' },
      },
    },
    {
      type: 'HexFooter',
      props: {
        id: 'footer-en',
        companyName: 'Hexagon Corporation',
        tagline: 'Hexagon Technology Ecosystem',
        copyright: 'Copyright 2026 ©',
        links: [],
        socialLinks: [
          { platform: 'Facebook', icon: 'facebook', url: '#' },
          { platform: 'LinkedIn', icon: 'linkedin', url: '#' },
          { platform: 'YouTube', icon: 'youtube', url: '#' },
        ],
        textColor: '#9ca3af',
        background: { type: 'color', color: '#0D5939' },
      },
    },
  ],
  root: { props: {} },
};

// ─── Helper: tạo page structure chuẩn ───────────────────────────────────────
const makeNavbar = (lang) => ({
  type: 'HexNavbar',
  props: {
    id: `navbar-${lang}`,
    logoUrl: LOGO_URL,
    logoText: 'HEXAGON',
    menuItems: lang === 'vi'
      ? [
          { label: 'Trang chủ', url: '/trang-chu' },
          { label: 'Giới thiệu', url: '/trang-chu#gioi-thieu' },
          { label: 'Dịch vụ', url: '/trang-chu#dich-vu' },
          { label: 'Tin tức', url: '/bai-viet' },
          { label: 'Liên hệ', url: '/trang-chu#lien-he' },
        ]
      : [
          { label: 'Home', url: '/en/trang-chu' },
          { label: 'About', url: '/en/trang-chu#gioi-thieu' },
          { label: 'Services', url: '/en/trang-chu#dich-vu' },
          { label: 'News', url: '/en/bai-viet' },
          { label: 'Contact', url: '/en/trang-chu#lien-he' },
        ],
    showLangSwitcher: true,
    background: { type: 'color', color: '#1A6B49' },
    textColor: '#ffffff',
  },
});

const makeFooter = (lang) => ({
  type: 'HexFooter',
  props: {
    id: `footer-subpage-${lang}`,
    companyName: 'Hexagon Corporation',
    tagline: lang === 'vi' ? 'Hệ sinh thái Công nghệ Hexagon' : 'Hexagon Technology Ecosystem',
    copyright: 'Copyright 2026 ©',
    links: [],
    socialLinks: [
      { platform: 'Facebook', icon: 'facebook', url: '#' },
      { platform: 'LinkedIn', icon: 'linkedin', url: '#' },
      { platform: 'YouTube', icon: 'youtube', url: '#' },
    ],
    textColor: '#9ca3af',
    background: { type: 'color', color: '#0D5939' },
  },
});

// ─── Service pages data ───────────────────────────────────────────────────────

const servicePageGPCN_VI = {
  content: [
    makeNavbar('vi'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-gpcn-vi',
        title: 'Giải pháp công nghệ',
        description: 'Phát triển và triển khai các giải pháp phần mềm tùy chỉnh, tối ưu vận hành doanh nghiệp, nâng cao hiệu suất, đáp ứng linh hoạt theo nhu cầu và định hướng phát triển dài hạn.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
        ctaText: 'Liên hệ tư vấn',
        ctaUrl: '/trang-chu#lien-he',
        breadcrumbHome: 'Trang chủ',
        breadcrumbParent: 'Dịch vụ',
        breadcrumbParentUrl: '/trang-chu#dich-vu',
        solutionsTitle: 'Giải pháp nổi bật',
        solutions: [
          { title: 'Phát triển phần mềm theo yêu cầu', content: 'Thiết kế và xây dựng phần mềm "đo ni đóng giày" theo quy trình vận hành riêng của doanh nghiệp, giúp tối ưu hiệu suất và tăng khả năng cạnh tranh.' },
          { title: 'Giải pháp chuyển đổi số doanh nghiệp', content: 'Tích hợp công nghệ vào toàn bộ hoạt động (quản lý, bán hàng, vận hành), giúp doanh nghiệp tự động hóa quy trình và nâng cao trải nghiệm khách hàng.' },
          { title: 'Xây dựng hệ thống nền tảng & tích hợp', content: 'Phát triển hệ thống trung tâm (CRM, ERP, Dashboard…) và kết nối các nền tảng hiện có thành một hệ sinh thái đồng bộ, dữ liệu xuyên suốt.' },
        ],
        processTitle: 'Quy trình thực hiện',
        processDescription: 'Quy trình chuyên nghiệp, minh bạch và hiệu quả.',
        processSteps: [
          { title: 'Khảo sát & phân tích yêu cầu', content: '' },
          { title: 'Thiết kế giải pháp & kiến trúc hệ thống', content: '' },
          { title: 'Phát triển & Thử nghiệm', content: '' },
          { title: 'Triển khai & Bảo trì', content: '' },
        ],
        readyTitle: 'Sẵn sàng triển khai?',
        readyDescription: 'Đừng để công nghệ làm rào cản. Hãy biến nó thành lợi thế cạnh tranh của bạn cùng Hexagon.',
        readyCta1Text: 'Về trang chủ', readyCta1Url: '/trang-chu',
        readyCta2Text: 'Liên hệ ngay', readyCta2Url: '/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('vi'),
  ],
  root: { props: {} },
};

const servicePageGPCN_EN = {
  content: [
    makeNavbar('en'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-gpcn-en',
        title: 'Technology Solutions',
        description: 'Develop and deliver customized software solutions to optimize business operations, enhance efficiency, and flexibly adapt to specific requirements and long-term growth strategies.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-3-1782723514885-362139381.jpg',
        ctaText: 'Contact Us',
        ctaUrl: '/en/trang-chu#lien-he',
        breadcrumbHome: 'Home',
        breadcrumbParent: 'Services',
        breadcrumbParentUrl: '/en/trang-chu#dich-vu',
        solutionsTitle: 'Key Solutions',
        solutions: [
          { title: 'Custom Software Development', content: 'Design and build tailor-made software aligned with your unique business processes to optimize performance and boost competitive advantage.' },
          { title: 'Digital Transformation Solutions', content: 'Integrate technology across all operations (management, sales, operations) to automate workflows and enhance customer experience.' },
          { title: 'Platform & Integration Architecture', content: 'Develop centralized systems (CRM, ERP, Dashboard…) and seamlessly connect existing platforms into a unified, data-driven ecosystem.' },
        ],
        processTitle: 'Our Process',
        processDescription: 'A professional, transparent and effective workflow.',
        processSteps: [
          { title: 'Survey & Requirements Analysis', content: '' },
          { title: 'Solution Design & Architecture', content: '' },
          { title: 'Development & Testing', content: '' },
          { title: 'Deployment & Maintenance', content: '' },
        ],
        readyTitle: 'Ready to Deploy?',
        readyDescription: "Don't let technology be a barrier. Turn it into your competitive advantage with Hexagon.",
        readyCta1Text: 'Back to Home', readyCta1Url: '/en/trang-chu',
        readyCta2Text: 'Contact Now', readyCta2Url: '/en/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('en'),
  ],
  root: { props: {} },
};

const servicePageTHICONG_VI = {
  content: [
    makeNavbar('vi'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-thicong-vi',
        title: 'Giải pháp thi công & lắp đặt',
        description: 'Tư vấn chiến lược chuyển đổi số toàn diện, giúp doanh nghiệp tối ưu quy trình, nâng cao trải nghiệm khách hàng và tăng trưởng bền vững trong môi trường số hóa.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
        ctaText: 'Liên hệ tư vấn',
        ctaUrl: '/trang-chu#lien-he',
        breadcrumbHome: 'Trang chủ',
        breadcrumbParent: 'Dịch vụ',
        breadcrumbParentUrl: '/trang-chu#dich-vu',
        solutionsTitle: 'Giải pháp nổi bật',
        solutions: [
          { title: 'Thi công hệ thống camera an ninh', content: 'Lắp đặt và cấu hình hệ thống camera giám sát chuyên nghiệp, đảm bảo an ninh 24/7 cho doanh nghiệp và công trình.' },
          { title: 'Lắp đặt hệ thống mạng WiFi', content: 'Thiết kế và triển khai hạ tầng mạng không dây tốc độ cao, ổn định, phủ sóng toàn diện cho mọi quy mô doanh nghiệp.' },
          { title: 'Hệ thống điều khiển thông minh', content: 'Triển khai giải pháp nhà thông minh và tòa nhà thông minh, tích hợp IoT để tối ưu hóa vận hành và tiết kiệm năng lượng.' },
        ],
        processTitle: 'Quy trình thực hiện',
        processDescription: 'Quy trình thi công chuyên nghiệp, đảm bảo chất lượng.',
        processSteps: [
          { title: 'Khảo sát hiện trường', content: '' },
          { title: 'Lên phương án & báo giá', content: '' },
          { title: 'Thi công & lắp đặt', content: '' },
          { title: 'Nghiệm thu & bảo hành', content: '' },
        ],
        readyTitle: 'Sẵn sàng thi công?',
        readyDescription: 'Đội ngũ kỹ thuật viên chuyên nghiệp của Hexagon sẵn sàng tư vấn và triển khai giải pháp tốt nhất cho bạn.',
        readyCta1Text: 'Về trang chủ', readyCta1Url: '/trang-chu',
        readyCta2Text: 'Liên hệ ngay', readyCta2Url: '/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('vi'),
  ],
  root: { props: {} },
};

const servicePageTHICONG_EN = {
  content: [
    makeNavbar('en'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-thicong-en',
        title: 'Construction & Installation Solutions',
        description: 'Comprehensive digital transformation consulting, helping businesses optimize processes, enhance customer experience and achieve sustainable growth in the digital environment.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-4-1782723514901-308215051.jpg',
        ctaText: 'Contact Us',
        ctaUrl: '/en/trang-chu#lien-he',
        breadcrumbHome: 'Home',
        breadcrumbParent: 'Services',
        breadcrumbParentUrl: '/en/trang-chu#dich-vu',
        solutionsTitle: 'Key Solutions',
        solutions: [
          { title: 'Security Camera System Installation', content: 'Professional installation and configuration of surveillance camera systems, ensuring 24/7 security for businesses and facilities.' },
          { title: 'WiFi Network Infrastructure', content: 'Design and deploy high-speed, stable wireless network infrastructure with comprehensive coverage for any business scale.' },
          { title: 'Smart Control Systems', content: 'Implement smart building and IoT solutions to optimize operations and achieve energy efficiency.' },
        ],
        processTitle: 'Our Process',
        processDescription: 'Professional construction process ensuring quality.',
        processSteps: [
          { title: 'Site Survey', content: '' },
          { title: 'Planning & Quotation', content: '' },
          { title: 'Construction & Installation', content: '' },
          { title: 'Acceptance & Warranty', content: '' },
        ],
        readyTitle: 'Ready to Build?',
        readyDescription: "Hexagon's professional technicians are ready to consult and implement the best solutions for you.",
        readyCta1Text: 'Back to Home', readyCta1Url: '/en/trang-chu',
        readyCta2Text: 'Contact Now', readyCta2Url: '/en/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('en'),
  ],
  root: { props: {} },
};

const servicePageCNTT_VI = {
  content: [
    makeNavbar('vi'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-cntt-vi',
        title: 'Cung cấp thiết bị CNTT',
        description: 'Cung cấp giải pháp trí tuệ nhân tạo và phân tích dữ liệu, hỗ trợ ra quyết định thông minh, tự động hóa quy trình và khai thác tối đa giá trị từ dữ liệu doanh nghiệp.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
        ctaText: 'Liên hệ tư vấn',
        ctaUrl: '/trang-chu#lien-he',
        breadcrumbHome: 'Trang chủ',
        breadcrumbParent: 'Dịch vụ',
        breadcrumbParentUrl: '/trang-chu#dich-vu',
        solutionsTitle: 'Sản phẩm & Giải pháp',
        solutions: [
          { title: 'Máy tính & Laptop doanh nghiệp', content: 'Cung cấp đa dạng dòng máy tính, laptop từ các thương hiệu uy tín như Dell, HP, Lenovo, Apple với giá cạnh tranh và chính sách bảo hành tốt.' },
          { title: 'Thiết bị mạng & Server', content: 'Phân phối thiết bị mạng chuyên nghiệp: router, switch, access point, NAS, server từ Cisco, Mikrotik, Synology và nhiều hãng hàng đầu.' },
          { title: 'Thiết bị ngoại vi & phụ kiện', content: 'Cung cấp màn hình, máy in, scanner, UPS và toàn bộ phụ kiện CNTT phục vụ nhu cầu văn phòng và doanh nghiệp.' },
        ],
        processTitle: 'Quy trình mua hàng',
        processDescription: 'Đơn giản, nhanh chóng và đáng tin cậy.',
        processSteps: [
          { title: 'Tư vấn nhu cầu', content: '' },
          { title: 'Báo giá & xác nhận đơn hàng', content: '' },
          { title: 'Giao hàng & lắp đặt', content: '' },
          { title: 'Hỗ trợ sau bán hàng', content: '' },
        ],
        readyTitle: 'Sẵn sàng đặt hàng?',
        readyDescription: 'Hexagon cam kết cung cấp thiết bị chính hãng, giá tốt và dịch vụ hậu mãi tận tâm.',
        readyCta1Text: 'Về trang chủ', readyCta1Url: '/trang-chu',
        readyCta2Text: 'Liên hệ ngay', readyCta2Url: '/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('vi'),
  ],
  root: { props: {} },
};

const servicePageCNTT_EN = {
  content: [
    makeNavbar('en'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-cntt-en',
        title: 'Providing IT Equipment',
        description: 'Offer AI and data analytics solutions to enable intelligent decision-making, automate processes, and unlock the full value of enterprise data assets.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-2-1782723514900-716634177.jpg',
        ctaText: 'Contact Us',
        ctaUrl: '/en/trang-chu#lien-he',
        breadcrumbHome: 'Home',
        breadcrumbParent: 'Services',
        breadcrumbParentUrl: '/en/trang-chu#dich-vu',
        solutionsTitle: 'Products & Solutions',
        solutions: [
          { title: 'Business Computers & Laptops', content: 'Wide range of computers and laptops from trusted brands like Dell, HP, Lenovo, Apple with competitive pricing and solid warranty.' },
          { title: 'Network & Server Equipment', content: 'Professional network devices: routers, switches, access points, NAS, servers from Cisco, Mikrotik, Synology and leading brands.' },
          { title: 'Peripherals & Accessories', content: 'Monitors, printers, scanners, UPS and all IT accessories for office and enterprise needs.' },
        ],
        processTitle: 'Purchase Process',
        processDescription: 'Simple, fast and reliable.',
        processSteps: [
          { title: 'Needs Consultation', content: '' },
          { title: 'Quotation & Order Confirmation', content: '' },
          { title: 'Delivery & Installation', content: '' },
          { title: 'After-Sales Support', content: '' },
        ],
        readyTitle: 'Ready to Order?',
        readyDescription: 'Hexagon guarantees genuine products, competitive pricing, and dedicated after-sales service.',
        readyCta1Text: 'Back to Home', readyCta1Url: '/en/trang-chu',
        readyCta2Text: 'Contact Now', readyCta2Url: '/en/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('en'),
  ],
  root: { props: {} },
};

const servicePageDVCNTT_VI = {
  content: [
    makeNavbar('vi'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-dvcntt-vi',
        title: 'Dịch vụ Công nghệ thông tin',
        description: 'Thi công và lắp đặt hệ thống camera giám sát, mạng wifi chuyên nghiệp, đảm bảo an ninh, ổn định kết nối và phù hợp với mọi quy mô doanh nghiệp.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
        ctaText: 'Liên hệ tư vấn',
        ctaUrl: '/trang-chu#lien-he',
        breadcrumbHome: 'Trang chủ',
        breadcrumbParent: 'Dịch vụ',
        breadcrumbParentUrl: '/trang-chu#dich-vu',
        solutionsTitle: 'Dịch vụ nổi bật',
        solutions: [
          { title: 'Bảo trì & hỗ trợ IT', content: 'Dịch vụ bảo trì định kỳ, hỗ trợ kỹ thuật từ xa và tại chỗ, đảm bảo hệ thống CNTT của doanh nghiệp luôn hoạt động ổn định.' },
          { title: 'An ninh mạng (Cybersecurity)', content: 'Đánh giá rủi ro bảo mật, triển khai firewall, VPN và các giải pháp bảo vệ dữ liệu cho doanh nghiệp trước các mối đe dọa mạng.' },
          { title: 'Điện toán đám mây (Cloud)', content: 'Tư vấn và triển khai giải pháp điện toán đám mây (AWS, Azure, Google Cloud), giúp doanh nghiệp linh hoạt và tiết kiệm chi phí hạ tầng.' },
        ],
        processTitle: 'Quy trình cung cấp dịch vụ',
        processDescription: 'Nhanh chóng, chuyên nghiệp và hiệu quả.',
        processSteps: [
          { title: 'Tiếp nhận yêu cầu', content: '' },
          { title: 'Phân tích & đề xuất giải pháp', content: '' },
          { title: 'Triển khai dịch vụ', content: '' },
          { title: 'Theo dõi & hỗ trợ liên tục', content: '' },
        ],
        readyTitle: 'Sẵn sàng sử dụng dịch vụ?',
        readyDescription: 'Hexagon cung cấp dịch vụ CNTT chuyên nghiệp, linh hoạt và đáng tin cậy cho mọi doanh nghiệp.',
        readyCta1Text: 'Về trang chủ', readyCta1Url: '/trang-chu',
        readyCta2Text: 'Liên hệ ngay', readyCta2Url: '/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('vi'),
  ],
  root: { props: {} },
};

const servicePageDVCNTT_EN = {
  content: [
    makeNavbar('en'),
    {
      type: 'HexServiceDetail',
      props: {
        id: 'service-dvcntt-en',
        title: 'Information Technology Services',
        description: 'Design and install professional camera surveillance and WiFi systems, ensuring security, stable connectivity, and scalability for businesses of all sizes.',
        heroImage: 'https://beta-api.hexagon.xyz/uploads/dv-1-1782723514912-477828992.jpg',
        ctaText: 'Contact Us',
        ctaUrl: '/en/trang-chu#lien-he',
        breadcrumbHome: 'Home',
        breadcrumbParent: 'Services',
        breadcrumbParentUrl: '/en/trang-chu#dich-vu',
        solutionsTitle: 'Key Services',
        solutions: [
          { title: 'IT Maintenance & Support', content: 'Periodic maintenance, remote and on-site technical support to ensure your IT systems always run smoothly and reliably.' },
          { title: 'Cybersecurity', content: 'Security risk assessment, firewall and VPN deployment, and data protection solutions to guard against cyber threats.' },
          { title: 'Cloud Computing', content: 'Consulting and deploying cloud solutions (AWS, Azure, Google Cloud) for greater flexibility and reduced infrastructure costs.' },
        ],
        processTitle: 'Service Delivery Process',
        processDescription: 'Fast, professional and effective.',
        processSteps: [
          { title: 'Request Intake', content: '' },
          { title: 'Analysis & Solution Proposal', content: '' },
          { title: 'Service Implementation', content: '' },
          { title: 'Monitoring & Ongoing Support', content: '' },
        ],
        readyTitle: 'Ready to Get Started?',
        readyDescription: 'Hexagon provides professional, flexible, and reliable IT services for businesses of all sizes.',
        readyCta1Text: 'Back to Home', readyCta1Url: '/en/trang-chu',
        readyCta2Text: 'Contact Now', readyCta2Url: '/en/trang-chu#lien-he',
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('en'),
  ],
  root: { props: {} },
};

// ─── News listing pages ───────────────────────────────────────────────────────

const newsPageVI = {
  content: [
    makeNavbar('vi'),
    {
      type: 'HexNewsPage',
      props: {
        id: 'news-page-vi',
        title: 'Tin tức',
        subtitle: 'Tin tức mới nhất, cập nhật và thông tin từ Hexagon Corporation.',
        breadcrumbHome: 'Trang chủ',
        readMoreLabel: 'Xem chi tiết',
        sectionId: 'bai-viet',
        articles: [
          {
            title: 'Không khí tưng bừng tại Chương trình Teambuilding myH25 tại Ngôi nhà Hùng Hậu',
            excerpt: 'Cùng nhìn lại những khoảnh khắc đáng nhớ và đẹp nhất của đại gia đình HHC trong chương trình TEAMBUILDING MYH25, diễn ra tại khu nghỉ dưỡng Vinpearl Nha Trang.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            date: '26 thg 6, 2026',
            category: 'hoat-dong',
            categoryLabel: 'Hoạt động',
            url: '#',
          },
          {
            title: 'Đồng hành cùng sinh viên Đại học Văn Hiến tại Ngày hội sinh viên',
            excerpt: 'Công ty Cổ phần Lục Giác hân hạnh được đồng hành cùng các bạn sinh viên khoa Công nghệ Thông tin - Đại học Văn Hiến trong chương trình "VHE Startup Devote".',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            date: '26 thg 6, 2026',
            category: 'hoat-dong',
            categoryLabel: 'Hoạt động',
            url: '#',
          },
          {
            title: 'Sắm tết công nghệ - Nâng cấp thiết bị, khởi đầu bứt phá',
            excerpt: 'Năm mới, vận hội mới, thiết bị cũng phải mới! Đầu tư cho công nghệ là đầu tư cho tương lai. Ghé Lục Giác để chọn cho mình những siêu phẩm hỗ trợ đắc lực.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            date: '26 thg 6, 2026',
            category: 'su-kien',
            categoryLabel: 'Sự kiện',
            url: '#',
          },
          {
            title: 'Bài viết 4',
            excerpt: 'Nội dung bài viết 4',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            date: '25 thg 6, 2026',
            category: 'tin-tuc',
            categoryLabel: 'Tin tức',
            url: '#',
          },
          {
            title: 'Bài viết 5',
            excerpt: 'Nội dung bài viết 5',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            date: '25 thg 6, 2026',
            category: 'tin-tuc',
            categoryLabel: 'Tin tức',
            url: '#',
          },
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('vi'),
  ],
  root: { props: {} },
};

const newsPageEN = {
  content: [
    makeNavbar('en'),
    {
      type: 'HexNewsPage',
      props: {
        id: 'news-page-en',
        title: 'News',
        subtitle: 'Stay updated with the latest news, events, and announcements from Hexagon Corporation.',
        breadcrumbHome: 'Home',
        readMoreLabel: 'Read more',
        sectionId: 'bai-viet',
        articles: [
          {
            title: 'A lively atmosphere at the myH25 Teambuilding Program at Hung Hau House',
            excerpt: "Let's look back at the most beautiful and memorable moments of the HHC family during the MYH25 TEAMBUILDING, held at the Vinpearl Nha Trang resort.",
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/teambuilding-01-1774341835079-253071961.jpg',
            date: 'Jun 26, 2026',
            category: 'hoat-dong',
            categoryLabel: 'Activities',
            url: '#',
          },
          {
            title: 'Accompanying Van Hien University Students at the student festival',
            excerpt: 'Hexagon JSC. is honored to accompany IT students at Van Hien University in the "VHE Startup Devote" competition.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/myc-dong-hanh-1-1774341526337-531129418.jpg',
            date: 'Jun 26, 2026',
            category: 'hoat-dong',
            categoryLabel: 'Activities',
            url: '#',
          },
          {
            title: 'Upgrade your tech - Empower your new year breakthrough',
            excerpt: 'New Year, New Success, New Gear! Investing in technology is investing in your future.',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/sam-tet-cong-nghe-1774343703442-177870451.jpg',
            date: 'Jun 26, 2026',
            category: 'su-kien',
            categoryLabel: 'Events',
            url: '#',
          },
          {
            title: 'Article 4',
            excerpt: 'Article 4 content',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/phattrienphanmem-1773133089066-706455049.png',
            date: 'Jun 25, 2026',
            category: 'tin-tuc',
            categoryLabel: 'News',
            url: '#',
          },
          {
            title: 'Article 5',
            excerpt: 'Article 5 content',
            imageUrl: 'https://beta-api.hexagon.xyz/uploads/ai-phan-tich-du-lieu-1773291405655-118730188-1774254824600-959205718.jpg',
            date: 'Jun 25, 2026',
            category: 'tin-tuc',
            categoryLabel: 'News',
            url: '#',
          },
        ],
        background: { type: 'color', color: '#F8FAFC' },
        animate: 'true',
      },
    },
    makeFooter('en'),
  ],
  root: { props: {} },
};

// ─── SEED_PAGES export ────────────────────────────────────────────────────────

export const SEED_PAGES = [
  // Trang chủ
  {
    id: 'seed-trang-chu-vi',
    title: 'Trang chủ',
    slug: 'trang-chu',
    seoTitle: 'Hexagon Corporation - Hệ sinh thái Công nghệ Hexagon',
    lang: 'vi',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: homepageVI,
  },
  {
    id: 'seed-trang-chu-en',
    title: 'Home',
    slug: 'trang-chu',
    seoTitle: 'Hexagon Corporation - Hexagon Technology Ecosystem',
    lang: 'en',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: homepageEN,
  },

  // Giải pháp công nghệ
  {
    id: 'seed-gpcn-vi',
    title: 'Giải pháp công nghệ',
    slug: 'giai-phap-cong-nghe',
    seoTitle: 'Giải pháp công nghệ - Hexagon Corporation',
    lang: 'vi',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageGPCN_VI,
  },
  {
    id: 'seed-gpcn-en',
    title: 'Technology Solutions',
    slug: 'giai-phap-cong-nghe',
    seoTitle: 'Technology Solutions - Hexagon Corporation',
    lang: 'en',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageGPCN_EN,
  },

  // Giải pháp thi công & lắp đặt
  {
    id: 'seed-thicong-vi',
    title: 'Giải pháp thi công & lắp đặt',
    slug: 'giai-phap-thi-cong-lap-dat',
    seoTitle: 'Giải pháp thi công & lắp đặt - Hexagon Corporation',
    lang: 'vi',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageTHICONG_VI,
  },
  {
    id: 'seed-thicong-en',
    title: 'Construction & Installation Solutions',
    slug: 'giai-phap-thi-cong-lap-dat',
    seoTitle: 'Construction & Installation Solutions - Hexagon Corporation',
    lang: 'en',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageTHICONG_EN,
  },

  // Cung cấp thiết bị CNTT
  {
    id: 'seed-cntt-vi',
    title: 'Cung cấp thiết bị CNTT',
    slug: 'cung-cap-thiet-bi-cntt',
    seoTitle: 'Cung cấp thiết bị CNTT - Hexagon Corporation',
    lang: 'vi',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageCNTT_VI,
  },
  {
    id: 'seed-cntt-en',
    title: 'Providing IT Equipment',
    slug: 'cung-cap-thiet-bi-cntt',
    seoTitle: 'Providing IT Equipment - Hexagon Corporation',
    lang: 'en',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageCNTT_EN,
  },

  // Dịch vụ Công nghệ thông tin
  {
    id: 'seed-dvcntt-vi',
    title: 'Dịch vụ Công nghệ thông tin',
    slug: 'dich-vu-cong-nghe-thong-tin',
    seoTitle: 'Dịch vụ Công nghệ thông tin - Hexagon Corporation',
    lang: 'vi',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageDVCNTT_VI,
  },
  {
    id: 'seed-dvcntt-en',
    title: 'Information Technology Services',
    slug: 'dich-vu-cong-nghe-thong-tin',
    seoTitle: 'Information Technology Services - Hexagon Corporation',
    lang: 'en',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: servicePageDVCNTT_EN,
  },

  // Trang Tin tức
  {
    id: 'seed-news-vi',
    title: 'Tin tức',
    slug: 'bai-viet',
    seoTitle: 'Tin tức - Hexagon Corporation',
    lang: 'vi',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: newsPageVI,
  },
  {
    id: 'seed-news-en',
    title: 'News',
    slug: 'bai-viet',
    seoTitle: 'News - Hexagon Corporation',
    lang: 'en',
    status: 'published',
    updatedAt: '06/07/2026',
    puckData: newsPageEN,
  },
];
export { homepageVI, homepageEN };
