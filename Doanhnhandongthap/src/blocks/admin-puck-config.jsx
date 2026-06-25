import React, { useState, useRef } from "react";
import AdminHeading from "./admin-heading";
import AdminText from "./admin-text";
import AdminImage from "./admin-image";
import AdminSection from "./admin-section";
import AdminHero from "./admin-hero";

// Shared utilities for background handling
const resolveBackgroundStyle = (background, defaultColor) => {
  if (!background) return { backgroundColor: defaultColor, opacity: 1 };
  const type = background.type;
  const opacity = background.opacity !== undefined ? background.opacity : 1;
  if ((type === "image" || type === "gif") && background.imageUrl) {
    return {
      backgroundImage: `url('${background.imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity,
    };
  }
  if (type === "gradient") {
    return {
      background: `linear-gradient(${background.direction || "135deg"}, ${background.fromColor || "#667eea"}, ${background.toColor || "#764ba2"})`,
      opacity,
    };
  }
  return { backgroundColor: background.color || defaultColor, opacity };
};

const sharedBackgroundField = (defaultColor, defaultFrom, defaultTo) => ({
  type: "object",
  label: "Nền section",
  objectFields: {
    type: {
      type: "select",
      label: "Loại",
      options: [
        { label: "Màu", value: "color" },
        { label: "Gradient", value: "gradient" },
        { label: "Hình ảnh (png/jpg)", value: "image" },
        { label: "GIF động", value: "gif" },
      ],
    },
    color: { type: "text", label: "Màu nền", default: defaultColor },
    fromColor: { type: "text", label: "Gradient từ", default: defaultFrom },
    toColor: { type: "text", label: "Gradient đến", default: defaultTo },
    direction: { type: "text", label: "Hướng gradient", default: "135deg" },
    imageUrl: { type: "text", label: "URL ảnh nền" },
    opacity: {
      type: "number",
      label: "Độ mờ",
      min: 0,
      max: 1,
      step: 0.1,
      default: 1,
    },
  },
});

// ─── AdminHanhTrinhBanner ───────────────────────────────────────────────────
// Dùng useRef để giữ id ổn định (không đổi khi re-render → không mất CSS)
// Dùng useState để theo dõi hover → hiệu ứng hoạt động ngay trong Puck Editor
const AdminHanhTrinhBanner = ({
  background = {},
  paddingY = 50,
  centerTitle = "HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ",
  centerTitleColor = "#a78bfa",
  centerTitleSize = 16,
  centerImageUrl = "",
  centerImageWidth = 380,
  centerImageHeight = 260,
  centerImageOpacity = 0.9,
  centerImageBorderRadius = 12,
  numberColor = "#ffffff",
  numberSize = 44,
  descColor = "rgba(255,255,255,0.75)",
  descSize = 13,
  hoverEffect = "combo",
  stats = [],
}) => {
  // useRef → id KHÔNG thay đổi giữa các lần re-render
  const idRef = useRef(`htb-${Math.random().toString(36).slice(2, 7)}`);
  const styleId = idRef.current;

  // useState → theo dõi ô nào đang được hover (hoạt động trong Puck Editor)
  const [hoveredPos, setHoveredPos] = useState(null);

  const bgStyle = resolveBackgroundStyle(background, "#1a0533");

  // Tính style động cho từng StatBlock khi hover
  const getHoverTransform = (pos) => {
    if (hoveredPos !== pos) return {};
    if (hoverEffect === "lift")  return { transform: "translateY(-10px)" };
    if (hoverEffect === "scale") return { transform: "scale(1.12)" };
    if (hoverEffect === "glow")  return {};
    if (hoverEffect === "combo") return { transform: "translateY(-10px) scale(1.08)" };
    return {};
  };
  const getHoverNumberStyle = (pos) => {
    if (hoveredPos !== pos) return {};
    if (hoverEffect === "glow")  return { textShadow: "0 0 20px currentColor, 0 0 40px currentColor" };
    if (hoverEffect === "combo") return { textShadow: "0 0 20px rgba(255,255,255,0.6)" };
    return {};
  };

  // Phân loại stats vào 4 cột theo trường position
  const byPos = { "0": null, "1": null, "2": null, "3": null };
  (stats || []).forEach((s) => { byPos[s.position] = s; });
  const s0 = byPos["0"], s1 = byPos["1"], s2 = byPos["2"], s3 = byPos["3"];

  const StatBlock = ({ stat, pos }) => {
    if (!stat) return <div />;
    return (
      <div
        onMouseEnter={() => setHoveredPos(pos)}
        onMouseLeave={() => setHoveredPos(null)}
        style={{
          textAlign: "center",
          cursor: "default",
          padding: "8px 12px",
          transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)",
          ...getHoverTransform(pos),
        }}
      >
        {/* Số liệu lớn */}
        <div
          style={{
            fontSize: numberSize,
            fontWeight: 800,
            color: stat.customNumberColor || numberColor,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            transition: "text-shadow 0.3s ease",
            ...getHoverNumberStyle(pos),
          }}
        >
          {stat.number}
        </div>
        {/* Mô tả */}
        <div
          style={{
            fontSize: descSize,
            color: descColor,
            marginTop: 8,
            lineHeight: 1.5,
            maxWidth: 180,
            margin: "8px auto 0",
            minHeight: 60,
          }}
        >
          {stat.description}
        </div>
      </div>
    );
  };

  return (
    <div
      id={styleId}
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: paddingY,
        paddingBottom: paddingY,
        ...bgStyle,
      }}
    >
      {/* CSS responsive */}
      <style>{`
        @media (max-width: 768px) {
          #${styleId} .htb-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          #${styleId} .htb-outer-col {
            align-items: center !important;
            padding-bottom: 0 !important;
          }
          #${styleId} .htb-center-col {
            order: -1 !important;
          }
          #${styleId} .htb-inner-stat {
            position: static !important;
            transform: none !important;
            display: flex;
            justify-content: center;
            gap: 24px;
          }
        }
      `}</style>

      {/* GRID 3 cột: [500+] [ảnh + 20+/1000+ đè lên] [100+] */}
      <div
        className="htb-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 1fr",
          alignItems: "stretch",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          gap: 0,
        }}
      >
        {/* Cột 0 – 500+ ngoài cùng trái */}
        <div className="htb-outer-col" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1, paddingBottom: 20 }}>
          <StatBlock stat={s0} pos="0" />
        </div>

        {/* Cột CENTER – ảnh + tiêu đề + 20+ và 1.000+ đè absolute */}
        <div
          className="htb-center-col"
          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Ảnh hoặc placeholder */}
          {centerImageUrl ? (
            <img
              src={centerImageUrl}
              alt="Hình trung tâm"
              style={{
                width: "100%",
                maxWidth: centerImageWidth,
                height: centerImageHeight,
                objectFit: "cover",
                borderRadius: centerImageBorderRadius,
                opacity: centerImageOpacity,
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                maxWidth: centerImageWidth,
                height: centerImageHeight,
                borderRadius: centerImageBorderRadius,
                background: "rgba(255,255,255,0.04)",
                border: "2px dashed rgba(167,139,250,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "rgba(167,139,250,0.6)",
                fontSize: 13,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span>Nhập URL hình ảnh trong thanh bên</span>
            </div>
          )}

          {/* Tiêu đề đè lên trên ảnh */}
          {centerTitle && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 4,
                textAlign: "center",
                fontSize: centerTitleSize,
                fontWeight: 700,
                color: centerTitleColor,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                width: "88%",
                textShadow: "0 2px 14px rgba(0,0,0,0.8)",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                pointerEvents: "none",
              }}
            >
              {centerTitle}
            </div>
          )}

          {/* 20+ – đè lên phía dưới-trái của ảnh (absolute) */}
          {s1 && (
            <div
              className="htb-inner-stat"
              style={{
                position: "absolute",
                bottom: 20,
                left: "18%",
                zIndex: 5,
                textAlign: "center",
              }}
            >
              <StatBlock stat={s1} pos="1" />
            </div>
          )}

          {/* 1.000+ – đè lên phía dưới-phải của ảnh (absolute) */}
          {s2 && (
            <div
              className="htb-inner-stat"
              style={{
                position: "absolute",
                bottom: 20,
                right: "18%",
                zIndex: 5,
                textAlign: "center",
              }}
            >
              <StatBlock stat={s2} pos="2" />
            </div>
          )}
        </div>

        {/* Cột 3 – 100+ ngoài cùng phải */}
        <div className="htb-outer-col" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1, paddingBottom: 20 }}>
          <StatBlock stat={s3} pos="3" />
        </div>
      </div>
    </div>
  );
};


// ─── AdminTinTucSuKien ────────────────────────────────────────────────────────
const AdminTinTucSuKien = ({
  background = {},
  paddingY = 60,
  sectionTitle = "TIN TỨC & SỰ KIỆN",
  sectionTitleColor = "#4dd0e1",
  sectionTitleSize = 26,
  viewAllText = "Xem thêm →",
  viewAllUrl = "#",
  viewAllColor = "#ffffff",
  cardBg = "#1a1240",
  cardBorderColor = "rgba(255,255,255,0.08)",
  cardBorderRadius = 16,
  cardBorderRadiusType = "all",
  dateFontSize = 12,
  dateColor = "rgba(255,255,255,0.55)",
  titleColor = "#4dd0e1",
  titleFontSize = 18,
  descColor = "rgba(255,255,255,0.7)",
  descFontSize = 13,
  tagBg = "#f59e0b",
  tagColor = "#ffffff",
  items = [],
}) => {
  const idRef = useRef(`ttsk-${Math.random().toString(36).slice(2, 7)}`);
  const styleId = idRef.current;

  const bgStyle = resolveBackgroundStyle(background, "#0d1b3e");

  const getBorderRadius = () =>
    cardBorderRadiusType === "diagonal"
      ? `0 ${cardBorderRadius}px 0 ${cardBorderRadius}px`
      : `${cardBorderRadius}px`;

  const bigItems = items.slice(0, 2);
  const smallItems = items.slice(2, 5);

  const BigCard = ({ item }) => (
    <div
      className="sh-ttsk-card"
      style={{
        background: cardBg,
        borderRadius: getBorderRadius(),
        border: `1px solid ${cardBorderColor}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
    >
      {/* Hình ảnh */}
      <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title || ""}
            className="sh-ttsk-img"
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s ease",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: 220,
            background: "rgba(77,208,225,0.06)",
            border: "2px dashed rgba(77,208,225,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(77,208,225,0.4)", fontSize: 13,
            flexDirection: "column", gap: 8,
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>Nhập URL hình ảnh</span>
          </div>
        )}
        {item.tag && (
          <span style={{
            position: "absolute", top: 12, right: 12,
            background: tagBg, color: tagColor,
            fontSize: 11, fontWeight: 700, padding: "4px 10px",
            borderRadius: 20, letterSpacing: "0.04em",
            textTransform: "uppercase", boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}>{item.tag}</span>
        )}
      </div>
      {/* Nội dung */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ fontSize: dateFontSize, color: dateColor, marginBottom: 8 }}>{item.date || ""}</div>
        <div style={{
          fontSize: titleFontSize, fontWeight: 700, color: titleColor,
          marginBottom: 12, lineHeight: 1.4,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>{item.title || "Tiêu đề bài viết"}</div>
        <div style={{
          fontSize: descFontSize, color: descColor,
          lineHeight: 1.65, flexGrow: 1, marginBottom: 16,
        }}>{item.description || ""}</div>
        <a href={item.url || "#"} className="sh-ttsk-link" style={{
          fontSize: 13, color: viewAllColor, fontWeight: 600,
          textDecoration: "none", display: "inline-flex",
          alignItems: "center", gap: 4, letterSpacing: "0.02em",
          transition: "color 0.2s",
        }}>Xem thêm →</a>
      </div>
    </div>
  );

  const SmallCard = ({ item }) => (
    <div
      className="sh-ttsk-card"
      style={{
        background: cardBg, borderRadius: getBorderRadius(),
        border: `1px solid ${cardBorderColor}`,
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)", cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title || ""}
            className="sh-ttsk-img"
            style={{ width: "100%", height: 160, objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
          />
        ) : (
          <div style={{
            width: "100%", height: 160,
            background: "rgba(77,208,225,0.06)", border: "2px dashed rgba(77,208,225,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(77,208,225,0.4)", fontSize: 13, flexDirection: "column", gap: 8,
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>Nhập URL hình ảnh</span>
          </div>
        )}
      </div>
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", flexGrow: 1, position: "relative" }}>
        <div style={{ fontSize: dateFontSize, color: dateColor, marginBottom: 7 }}>{item.date || ""}</div>
        <div style={{
          fontSize: Math.max(14, titleFontSize - 3), fontWeight: 700, color: titleColor,
          marginBottom: 8, lineHeight: 1.4, fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>{item.title || "Tiêu đề bài viết"}</div>
        <div style={{
          fontSize: descFontSize, color: descColor, lineHeight: 1.6,
          flexGrow: 1, marginBottom: 36,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{item.description || ""}</div>
        <a href={item.url || "#"} className="sh-ttsk-arrowbtn" style={{
          position: "absolute", bottom: 16, right: 18,
          width: 34, height: 34, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.7)", textDecoration: "none",
          fontSize: 16, fontWeight: 600,
          transition: "all 0.25s ease",
        }}>→</a>
      </div>
    </div>
  );

  return (
    <div id={styleId} style={{ paddingTop: paddingY, paddingBottom: paddingY, ...bgStyle }}>
      <style>{`
        .sh-ttsk-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .sh-ttsk-card:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(77,208,225,0.18), 0 4px 16px rgba(0,0,0,0.4) !important; border-color: rgba(77,208,225,0.45) !important; }
        .sh-ttsk-img { transition: transform 0.4s ease; }
        .sh-ttsk-card:hover .sh-ttsk-img { transform: scale(1.04); }
        .sh-ttsk-link { transition: color 0.2s; }
        .sh-ttsk-card:hover .sh-ttsk-link { color: #4dd0e1 !important; }
        .sh-ttsk-arrowbtn { transition: all 0.25s ease; }
        .sh-ttsk-card:hover .sh-ttsk-arrowbtn { background: rgba(77,208,225,0.25) !important; border-color: rgba(77,208,225,0.6) !important; color: #4dd0e1 !important; }
        @media (max-width: 992px) {
          #${styleId} .ttsk-big-grid { grid-template-columns: 1fr !important; }
          #${styleId} .ttsk-small-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          #${styleId} .ttsk-big-grid { grid-template-columns: 1fr !important; }
          #${styleId} .ttsk-small-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <h2 style={{
            fontSize: sectionTitleSize, fontWeight: 800, color: sectionTitleColor,
            margin: 0, letterSpacing: "0.04em", textTransform: "uppercase",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}>{sectionTitle}</h2>
          {viewAllText && (
            <a href={viewAllUrl || "#"} style={{
              fontSize: 14, color: viewAllColor, textDecoration: "none",
              fontWeight: 600, letterSpacing: "0.03em", opacity: 0.85, transition: "opacity 0.2s",
            }}>{viewAllText}</a>
          )}
        </div>

        {bigItems.length > 0 && (
          <div className="ttsk-big-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            {bigItems.map((item, idx) => <BigCard key={idx} item={item} />)}
          </div>
        )}
        {smallItems.length > 0 && (
          <div className="ttsk-small-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {smallItems.map((item, idx) => <SmallCard key={idx} item={item} />)}
          </div>
        )}
        {items.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "rgba(255,255,255,0.3)", fontSize: 14,
            border: "2px dashed rgba(255,255,255,0.1)", borderRadius: getBorderRadius(),
          }}>Chưa có bài viết nào. Hãy thêm bài viết trong thanh bên →</div>
        )}
      </div>
    </div>
  );
};


// ─── AdminGiaTriCongDong ──────────────────────────────────────────────────────
const AdminGiaTriCongDong = ({
  background = {},
  paddingY = 60,
  sectionTitle = "GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG",
  sectionTitleColor = "#4dd0e1",
  sectionTitleSize = 24,
  viewAllText = "Xem thêm →",
  viewAllUrl = "#",
  viewAllColor = "#ffffff",
  cardBg = "rgba(10,20,60,0.75)",
  cardBorderColor = "rgba(77,208,225,0.2)",
  cardBorderRadius = 20,
  cardBorderRadiusType = "all",
  iconSize = 72,
  titleColor = "#4dd0e1",
  titleFontSize = 16,
  descColor = "rgba(255,255,255,0.75)",
  descFontSize = 13,
  btnBg = "rgba(77,208,225,0.15)",
  btnColor = "#4dd0e1",
  btnBorderColor = "rgba(77,208,225,0.5)",
  btnBorderRadius = 20,
  items = [],
}) => {
  const idRef = useRef(`gtcd-${Math.random().toString(36).slice(2, 7)}`);
  const styleId = idRef.current;
  const bgStyle = resolveBackgroundStyle(background, "#061533");

  const getCardRadius = () =>
    cardBorderRadiusType === "diagonal"
      ? `0 ${cardBorderRadius}px 0 ${cardBorderRadius}px`
      : `${cardBorderRadius}px`;

  const getCardOffset = (idx) => {
    const offsets = [40, 0, 80, 20, 60];
    return offsets[idx % offsets.length] || 0;
  };

  return (
    <div id={styleId} style={{ paddingTop: paddingY, paddingBottom: paddingY, ...bgStyle, overflow: "hidden" }}>
      <style>{`
        .sh-gtcd-card {
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .sh-gtcd-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(77,208,225,0.22), 0 4px 20px rgba(0,0,0,0.5) !important;
          border-color: rgba(77,208,225,0.55) !important;
        }
        .sh-gtcd-icon { transition: background 0.3s ease; }
        .sh-gtcd-card:hover .sh-gtcd-icon { background: rgba(77,208,225,0.18) !important; }
        .sh-gtcd-btn { transition: all 0.25s ease; }
        .sh-gtcd-btn:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(77,208,225,0.3); }
        @media (max-width: 768px) {
          #${styleId} .gtcd-grid { flex-direction: column !important; align-items: center !important; }
          #${styleId} .gtcd-card { margin-top: 0 !important; width: 280px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
          <h2 style={{
            fontSize: sectionTitleSize, fontWeight: 800, color: sectionTitleColor,
            margin: 0, letterSpacing: "0.05em", textTransform: "uppercase",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}>{sectionTitle}</h2>
          {viewAllText && (
            <a href={viewAllUrl || "#"} style={{
              fontSize: 14, color: viewAllColor, textDecoration: "none", fontWeight: 600, opacity: 0.85,
            }}>{viewAllText}</a>
          )}
        </div>

        {items.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: "rgba(255,255,255,0.25)", border: "2px dashed rgba(255,255,255,0.08)",
            borderRadius: getCardRadius(), fontSize: 14,
          }}>Chưa có thẻ giá trị nào. Hãy thêm trong thanh bên →</div>
        ) : (
          <div className="gtcd-grid" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 20, paddingBottom: 60 }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="sh-gtcd-card gtcd-card"
                style={{
                  flex: "1 1 0", minWidth: 180, maxWidth: 260,
                  marginTop: getCardOffset(idx),
                  background: cardBg,
                  borderRadius: getCardRadius(),
                  border: `1px solid ${cardBorderColor}`,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow: "0 6px 32px rgba(0,0,0,0.35)",
                  padding: "32px 24px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center", gap: 14,
                  cursor: "default",
                }}
              >
                <div className="sh-gtcd-icon" style={{
                  width: iconSize, height: iconSize, borderRadius: "50%",
                  background: "rgba(77,208,225,0.08)",
                  border: "1.5px solid rgba(77,208,225,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", flexShrink: 0,
                }}>
                  {item.iconUrl ? (
                    <img src={item.iconUrl} alt={item.title || ""} style={{ width: iconSize * 0.62, height: iconSize * 0.62, objectFit: "contain" }} />
                  ) : (
                    <svg width={iconSize * 0.48} height={iconSize * 0.48} viewBox="0 0 24 24" fill="none" stroke="rgba(77,208,225,0.5)" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                    </svg>
                  )}
                </div>
                <div style={{
                  fontSize: titleFontSize, fontWeight: 700,
                  color: item.customTitleColor || titleColor,
                  lineHeight: 1.35, fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}>{item.title || "Tiêu đề"}</div>
                <div style={{ fontSize: descFontSize, color: descColor, lineHeight: 1.65, flexGrow: 1 }}>{item.description || ""}</div>
                {item.btnText && (
                  <a href={item.btnUrl || "#"} className="sh-gtcd-btn" style={{
                    display: "inline-block", marginTop: 4, padding: "8px 20px",
                    fontSize: 12, fontWeight: 600,
                    color: item.btnColor || btnColor,
                    background: item.btnBg || btnBg,
                    border: `1px solid ${item.btnBorderColor || btnBorderColor}`,
                    borderRadius: `${item.btnBorderRadius !== undefined ? item.btnBorderRadius : btnBorderRadius}px`,
                    textDecoration: "none", letterSpacing: "0.03em",
                  }}>{item.btnText}</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// ─── AdminLienHeBanner ────────────────────────────────────────────────────────
const AdminLienHeBanner = ({
  background = {},
  paddingY = 72,
  title = "QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM",
  titleColor = "#ffffff",
  titleFontSize = 22,
  email = "info@dte.hunghau.vn",
  emailBg = "rgba(0,0,0,0.35)",
  emailBorderRadius = 8,
  phone = "1800 1568",
  phoneBg = "rgba(0,0,0,0.35)",
  phoneBorderRadius = 8,
  ctaText = "Đăng ký hội viên",
  ctaUrl = "#",
  ctaBg = "#3b5bdb",
  ctaColor = "#ffffff",
  ctaBorderRadius = 8,
  ctaFontSize = 14,
}) => {
  const idRef = useRef(`lhb-${Math.random().toString(36).slice(2, 7)}`);
  const styleId = idRef.current;
  const bgStyle = resolveBackgroundStyle(background, "#6b21a8");

  return (
    <div
      id={styleId}
      style={{
        ...bgStyle,
        paddingTop: paddingY,
        paddingBottom: paddingY,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: "-80px", bottom: "-40px",
          width: 320, height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", right: "-80px", top: "-40px",
          width: 320, height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)",
        }} />
      </div>

      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "0 32px",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: titleFontSize,
          fontWeight: 800,
          color: titleColor,
          lineHeight: 1.55,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          marginBottom: 32,
          whiteSpace: "pre-line",
        }}>{title}</h2>

        {/* Contact chips */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 24,
        }}>
          {email && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: emailBg,
              borderRadius: emailBorderRadius,
              padding: "10px 18px",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              <span style={{ color: "#ffffff", fontSize: 13, fontWeight: 500 }}>{email}</span>
            </div>
          )}
          {phone && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: phoneBg,
              borderRadius: phoneBorderRadius,
              padding: "10px 18px",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72c.127 1.05.36 2.08.7 3.08a2 2 0 01-.45 2.11L6.09 8.01a16 16 0 006.08 6.08l1.1-1.16a2 2 0 012.11-.45c1 .34 2.03.573 3.08.7A2 2 0 0122 15.18v1.74z" />
              </svg>
              <span style={{ color: "#ffffff", fontSize: 13, fontWeight: 500 }}>{phone}</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        {ctaText && (
          <a
            href={ctaUrl || "#"}
            className="sh-lhb-cta"
            style={{
              display: "inline-block",
              padding: "13px 36px",
              background: ctaBg,
              color: ctaColor,
              borderRadius: `${ctaBorderRadius}px`,
              fontSize: ctaFontSize,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >{ctaText}</a>
        )}
      </div>
      <style>{`
        .sh-lhb-cta { transition: all 0.3s ease !important; }
        .sh-lhb-cta:hover { opacity: 0.9; transform: translateY(-3px); box-shadow: 0 8px 32px rgba(59,91,219,0.55) !important; }
        .sh-lhb-chip { transition: all 0.25s ease; }
        .sh-lhb-chip:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
      `}</style>
    </div>
  );
};


// ─── AdminFooter ──────────────────────────────────────────────────────────────
const AdminFooter = ({
  background = {},
  logoUrl = "",
  logoSize = 72,
  orgName = "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP. HỒ CHÍ MINH",
  orgNameColor = "#4dd0e1",
  orgNameSize = 11,
  contactTitle = "TRỤ SỞ CHÍNH",
  contactTitleColor = "#4dd0e1",
  contactItems = [],
  // Legacy props (fallback)
  col2Title = "Liên kết trang",
  col2Links = [],
  col3Title = "Khác",
  col3Links = [],
  col4Title = "",
  col4Links = [],
  // New dynamic columns
  columns = [],
  headingColor = "#4dd0e1",
  linkColor = "rgba(77,208,225,0.85)",
  linkFontSize = 13,
  copyright = "Copyright © CLB Doanh nhân Dong Thap. All rights reserved",
  copyrightColor = "rgba(255,255,255,0.8)",
  socialLinks = [],
  backgroundImage = "",
}) => {
  const bgStyle = resolveBackgroundStyle(background, "#0a2558");
  const idRef = useRef(`ftr-${Math.random().toString(36).slice(2, 7)}`);
  const styleId = idRef.current;

  const FooterLinkList = ({ title, links, titleColor: tc }) => (
    <div style={{ minWidth: 120 }}>
      {title && (
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: tc || headingColor || "#4dd0e1",
          marginBottom: 14,
          letterSpacing: "0.03em",
        }}>{title}</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {(links || []).map((link, i) => (
          <a key={i} href={link.url || "#"} className="sh-footer-link" style={{
            fontSize: linkFontSize,
            color: linkColor,
            textDecoration: "none",
            lineHeight: 1.5,
            transition: "color 0.2s, transform 0.2s",
          }}>{link.label}</a>
        ))}
      </div>
    </div>
  );

  const socialIconPaths = {
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    tiktok: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.28 8.28 0 004.85 1.56V7.04a4.85 4.85 0 01-1.08-.35z",
    youtube: "M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98l5.75 3.02-5.75 3.02z",
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  };

  return (
    <div
      id={styleId}
      style={{
        ...bgStyle,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .sh-footer-link { transition: color 0.25s ease, transform 0.25s ease; display: inline-block; }
        .sh-footer-link:hover { color: #ff2a7a !important; transform: translateX(6px); }
        @media (max-width: 768px) {
          #${styleId} .ftr-cols { flex-direction: column !important; gap: 28px !important; }
        }
      `}</style>

      {/* Decorative wave blob or Image */}
      {backgroundImage ? (
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: "50%",
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          opacity: 0.8,
        }} />
      ) : (
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: "45%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M400 0 C300 80 200 20 300 150 C380 230 400 300 400 300Z' fill='rgba(150,170,240,0.18)'/%3E%3Cpath d='M400 0 C350 100 250 60 320 180 C370 250 400 300 400 300Z' fill='rgba(200,160,240,0.12)'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          pointerEvents: "none",
        }} />
      )}

      {/* Main content */}
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "52px 32px 32px",
        position: "relative",
        zIndex: 2,
      }}>
        <div
          className="ftr-cols"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            marginBottom: 36,
          }}
        >
          {(() => {
            // Determine active columns (use dynamic array if provided, else fallback to legacy props)
            let activeCols = columns;
            if (!activeCols || activeCols.length === 0) {
              activeCols = [
                { colType: "contact", title: contactTitle, logoUrl, orgName, contactItems },
                { colType: "links", title: col2Title, links: col2Links },
                { colType: "links", title: col3Title, links: col3Links },
              ];
              if (col4Title || (col4Links && col4Links.length > 0)) {
                activeCols.push({ colType: "links", title: col4Title, links: col4Links });
              }
            }

            return activeCols.map((col, idx) => {
              if (col.colType === "contact") {
                return (
                  <div key={idx} style={{ flex: "1 1 200px", minWidth: 180 }}>
                    {/* Logo + org name */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                      {col.logoUrl ? (
                        <img src={col.logoUrl} alt="Logo" style={{ width: logoSize * 0.55, height: logoSize * 0.55, objectFit: "contain" }} />
                      ) : (
                        <div style={{
                          width: logoSize * 0.55, height: logoSize * 0.55,
                          borderRadius: "50%",
                          background: "rgba(80,100,180,0.2)",
                          border: "1.5px dashed rgba(80,100,180,0.4)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 18, color: "rgba(80,100,180,0.5)",
                        }}>⚘</div>
                      )}
                      <div style={{
                        fontSize: orgNameSize,
                        fontWeight: 700,
                        color: orgNameColor,
                        lineHeight: 1.45,
                        textTransform: "uppercase",
                        whiteSpace: "pre-line",
                      }}>{col.orgName}</div>
                    </div>

                    {/* Contact heading */}
                    {col.title && (
                      <div style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: contactTitleColor,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}>{col.title}</div>
                    )}

                    {/* Contact list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {(col.contactItems || []).map((c, i) => {
                        const icons = {
                          email: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>,
                          phone: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72c.127 1.05.36 2.08.7 3.08a2 2 0 01-.45 2.11L6.09 8.01a16 16 0 006.08 6.08l1.1-1.16a2 2 0 012.11-.45c1 .34 2.03.573 3.08.7A2 2 0 0122 15.18v1.74z" /></svg>,
                          map: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                        };
                        return (
                          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: linkColor, fontSize: 12 }}>
                            <span style={{ marginTop: 1, opacity: 0.7, flexShrink: 0 }}>{icons[c.type] || icons.email}</span>
                            <span>{c.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return <FooterLinkList key={idx} title={col.title} links={col.links} titleColor="#3d4f8a" />;
            });
          })()}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 18,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }} >
          <span style={{ fontSize: 12, color: copyrightColor, fontWeight: 500 }}>{copyright}</span>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 10 }}>
            {(socialLinks || []).map((s, i) => {
              const path = socialIconPaths[s.type] || socialIconPaths.facebook;
              return (
                <a key={i} href={s.url || "#"} className="sh-footer-social" style={{
                  width: 32, height: 32,
                  borderRadius: "50%",
                  background: s.iconBg || "rgba(77,208,225,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                  transition: "all 0.25s",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={s.iconColor || "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


// Config — đăng ký 8 components với fields + defaultProps + render.
const AdminHeroBanner = ({

  background = {},
  cardPosition = "left",
  cardBg = "rgba(255,255,255,0.12)",
  cardBlur = 14,
  cardBorderColor = "rgba(255,255,255,0.25)",
  cardBorderRadius = 20,
  cardBorderRadiusType = "all",
  label = "",
  title = "Sen Hồng",
  titleColor = "#f5c518",
  titleSize = 52,
  description = "",
  descriptionColor = "#ffffff",
  descriptionSize = 13,
  button = {},
}) => {
  const getCardContainerStyle = () => {
    if (cardPosition === "right")
      return { display: "flex", justifyContent: "flex-end" };
    if (cardPosition === "center")
      return { display: "flex", justifyContent: "center" };
    return { display: "flex", justifyContent: "flex-start" };
  };

  return (
    <>
      <style>{`
        .sh-hero-card { transition: all 0.3s ease; }
        .sh-hero-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.25) !important; }
        .sh-hero-btn { transition: all 0.3s ease !important; }
        .sh-hero-btn:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
      `}</style>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
          padding: "48px 40px",
          boxSizing: "border-box",
          ...resolveBackgroundStyle(background, "#1a237e"),
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={getCardContainerStyle()}>
            {/* Glassmorphism card */}
            <div
              className="sh-hero-card"
              style={{
                background: cardBg || "rgba(255,255,255,0.12)",
                backdropFilter: `blur(${cardBlur !== undefined ? cardBlur : 14}px)`,
                WebkitBackdropFilter: `blur(${cardBlur !== undefined ? cardBlur : 14}px)`,
                borderRadius: cardBorderRadiusType === "diagonal"
                  ? `0 ${cardBorderRadius}px 0 ${cardBorderRadius}px`
                  : `${cardBorderRadius}px`,
                border: `1px solid ${cardBorderColor || "rgba(255,255,255,0.25)"}`,
                padding: "36px 32px",
                maxWidth: "400px",
                width: "100%",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              }}
            >
              {label && (
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2.5px",
                    color: "rgba(255,255,255,0.85)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    fontWeight: "500",
                  }}
                >
                  {label}
                </p>
              )}
              <h1
                style={{
                  fontSize: `${titleSize}px`,
                  color: titleColor,
                  fontWeight: "bold",
                  marginBottom: "14px",
                  lineHeight: 1.15,
                  wordBreak: "break-word",
                }}
              >
                {title}
              </h1>
              {description && (
                <p
                  style={{
                    fontSize: `${descriptionSize}px`,
                    color: descriptionColor,
                    marginBottom: "22px",
                    lineHeight: 1.7,
                    opacity: 0.9,
                  }}
                >
                  {description}
                </p>
              )}
              {button.text && (
                <a
                  href={button.url || "#"}
                  className="sh-hero-btn"
                  style={{
                    display: "inline-block",
                    backgroundColor: button.bgColor || "#2196f3",
                    color: button.textColor || "#ffffff",
                    borderRadius: `${button.borderRadius !== undefined ? button.borderRadius : 20}px`,
                    padding: `${button.paddingY !== undefined ? button.paddingY : 10}px ${button.paddingX !== undefined ? button.paddingX : 26}px`,
                    fontSize: "13px",
                    fontWeight: "600",
                    textDecoration: "none",
                    letterSpacing: "0.3px",
                    transition: "opacity 0.2s",
                  }}
                >
                  {button.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AdminBanChuyenMon = ({
  background = {},
  title = "CÁC BAN CHUYÊN MÔN",
  subtitle = "CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
  items = [],
}) => {
  return (
    <>
      <style>{`
        .sh-ban-card { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
        .sh-ban-card:hover { transform: translateY(-8px); box-shadow: 0 12px 28px rgba(21,101,192,0.45) !important; }
        .sh-ban-btn { transition: all 0.3s ease !important; }
        .sh-ban-btn:hover { background-color: rgba(255,255,255,0.25) !important; transform: scale(1.05); }
      `}</style>
      <section
        style={{
          ...resolveBackgroundStyle(background, "#e8edf5"),
          padding: "64px 32px",
          minHeight: "300px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Tiêu đề */}
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1a237e",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#5c6bc0",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  opacity: 0.85,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {/* Lưới thẻ */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {items.map((item, idx) => {
              const cardBgStyle = {};
              if (item.cardBgType === "color") {
                cardBgStyle.backgroundColor = item.cardBgColor || "#1565c0";
              } else {
                cardBgStyle.background = `linear-gradient(${item.cardBgDirection || "135deg"}, ${item.cardBgFrom || "#3a7bd5"} 0%, ${item.cardBgTo || "#1565c0"} 100%)`;
              }
              const cardRadius = item.borderRadius !== undefined ? item.borderRadius : 40;
              const cardRadiusType = item.borderRadiusType || "diagonal";
              const cardRadiusVal = cardRadiusType === "all"
                ? `${cardRadius}px`
                : `0 ${cardRadius}px 0 ${cardRadius}px`;
              return (
                <div
                  key={idx}
                  className="sh-ban-card"
                  style={{
                    ...cardBgStyle,
                    borderRadius: cardRadiusVal,
                    padding: "28px 20px 24px",
                    width: "200px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    boxShadow: "0 6px 24px rgba(21,101,192,0.35)",
                  }}
                >
                  {item.iconUrl ? (
                    <img
                      src={item.iconUrl}
                      alt={item.title || ""}
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        border: "2px dashed rgba(255,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      ☆
                    </div>
                  )}
                  <p
                    style={{
                      color: item.titleColor || "#ffffff",
                      fontWeight: "600",
                      fontSize: `${item.titleFontSize !== undefined ? item.titleFontSize : 13}px`,
                      lineHeight: 1.4,
                      minHeight: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.title || "Tên ban"}
                  </p>
                  <a
                    href={item.buttonUrl || "#"}
                    className="sh-ban-btn"
                    style={{
                      display: "inline-block",
                      backgroundColor: item.buttonBgColor || "rgba(255,255,255,0.15)",
                      color: item.buttonTextColor || "#ffffff",
                      border: `1px solid ${item.buttonBorderColor || "rgba(255,255,255,0.45)"}`,
                      borderRadius: `${item.buttonBorderRadius !== undefined ? item.buttonBorderRadius : 20}px`,
                      padding: "6px 16px",
                      fontSize: `${item.buttonFontSize !== undefined ? item.buttonFontSize : 12}px`,
                      textDecoration: "none",
                      fontWeight: "500",
                      letterSpacing: "0.2px",
                    }}
                  >
                    {item.buttonText || "Xem hoạt động →"}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const AdminAboutOrg = ({
  background = {},
  membersPerPage = 3,
  columns = [],
}) => {
  const [memberPages, setMemberPages] = useState({});

  const getMemberPage = (colIdx) => memberPages[colIdx] || 0;
  const setMemberPage = (colIdx, page) =>
    setMemberPages((prev) => ({ ...prev, [colIdx]: page }));

  const colCount = Math.max(columns.length || 2, 1);
  const pageSize = Number(membersPerPage) || 3;

  return (
    <>
      <style>{`
        .sh-org-card { transition: all 0.3s ease; }
        .sh-org-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important; }
        .sh-org-pagebtn { transition: all 0.2s ease !important; }
        .sh-org-pagebtn:hover:not(:disabled) { transform: scale(1.1); box-shadow: 0 2px 8px rgba(57,73,171,0.3); }
        .sh-org-pagedot { transition: all 0.2s ease; }
        .sh-org-pagedot:hover { background-color: #3949ab !important; }
      `}</style>
      <section
        style={{
          ...resolveBackgroundStyle(background, "#f0f4ff"),
          padding: "60px 32px",
          minHeight: "300px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            gap: "28px",
            alignItems: "start",
          }}
        >
          {columns.map((col, colIdx) => {
            const colMembers = col.members || [];
            const totalPages = Math.ceil(colMembers.length / pageSize);
            const page = getMemberPage(colIdx);
            const visibleMembers = colMembers.slice(
              page * pageSize,
              page * pageSize + pageSize,
            );

            const colBgStyle = {};
            if (col.colBgType === "gradient") {
              colBgStyle.background = `linear-gradient(${col.colBgDirection || "to bottom"}, ${col.colBgFrom || "#eff6ff"}, ${col.colBgTo || "#f5f3ff"})`;
            } else {
              colBgStyle.backgroundColor = col.colBgColor || "#ffffff";
            }

              const colRadius = col.colBorderRadius !== undefined ? col.colBorderRadius : 16;
              const colRadiusType = col.colBorderRadiusType || "all";
              const colRadiusVal = colRadiusType === "diagonal"
                ? `0 ${colRadius}px 0 ${colRadius}px`
                : `${colRadius}px`;

              return (
                <div
                  key={colIdx}
                  className="sh-org-card"
                  style={{
                    ...colBgStyle,
                    borderRadius: colRadiusVal,
                    padding: `${col.colPadding !== undefined ? col.colPadding : 32}px`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                  }}
                >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#1a237e",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                  }}
                >
                  {col.title || "Tiêu đề cột"}
                </h2>

                {/* Cột loại: Văn bản + Ảnh */}
                {col.type === "text" && (
                  <div>
                    {(col.textParagraphs || []).map((para, pIdx) => (
                      <p
                        key={pIdx}
                        style={{
                          fontSize: "14px",
                          color: "#444",
                          lineHeight: 1.8,
                          marginBottom: "12px",
                        }}
                      >
                        {para.text}
                      </p>
                    ))}
                    {col.imageUrl && (
                      <img
                        src={col.imageUrl}
                        alt={col.title || ""}
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          marginTop: "16px",
                          objectFit: "cover",
                          maxHeight: "220px",
                          display: "block",
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Cột loại: Danh sách thành viên */}
                {col.type === "members" && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                      }}
                    >
                      {visibleMembers.map((member, mIdx) => (
                        <div
                          key={mIdx}
                          style={{
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                            padding: "20px 0",
                            borderBottom:
                              mIdx < visibleMembers.length - 1
                                ? "1px solid #f0f4f8"
                                : "none",
                          }}
                        >
                          {member.photo ? (
                            <img
                              src={member.photo}
                              alt={member.name || ""}
                              style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                flexShrink: 0,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                backgroundColor: "#e8edf5",
                                flexShrink: 0,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "24px",
                              }}
                            >
                              👤
                            </div>
                          )}
                          <div style={{ flex: 1 }}>
                            {member.name && (
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "#333",
                                  marginBottom: "4px",
                                }}
                              >
                                <b style={{ color: "#1a237e" }}>Họ tên:</b>{" "}
                                {member.name}
                              </p>
                            )}
                            {member.clbRole && (
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "#333",
                                  marginBottom: "4px",
                                }}
                              >
                                <b style={{ color: "#1a237e" }}>Chức vụ CLB:</b>{" "}
                                {member.clbRole}
                              </p>
                            )}
                            {member.bizRole && (
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "#333",
                                  marginBottom: "4px",
                                }}
                              >
                                <b style={{ color: "#1a237e" }}>
                                  Chức vụ Doanh nghiệp:
                                </b>{" "}
                                {member.bizRole}
                              </p>
                            )}
                            {member.company && (
                              <p style={{ fontSize: "13px", color: "#333" }}>
                                <b style={{ color: "#1a237e" }}>
                                  Doanh nghiệp:
                                </b>{" "}
                                {member.company}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Phân trang */}
                    {totalPages > 1 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: "22px",
                        }}
                      >
                        <button
                          onClick={() =>
                            setMemberPage(colIdx, Math.max(0, page - 1))
                          }
                          disabled={page === 0}
                          className="sh-org-pagebtn"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            border: "none",
                            background: page === 0 ? "#f0f4ff" : "#e1f0fb",
                            color: page === 0 ? "#bbb" : "#1a237e",
                            cursor: page === 0 ? "default" : "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "none",
                          }}
                        >
                          ‹
                        </button>
                        {Array.from({ length: totalPages }).map((_, dIdx) => (
                          <span
                            key={dIdx}
                            onClick={() => setMemberPage(colIdx, dIdx)}
                            className="sh-org-pagedot"
                            style={{
                              display: "inline-block",
                              width: dIdx === page ? "24px" : "8px",
                              height: "8px",
                              borderRadius: "4px",
                              backgroundColor:
                                dIdx === page ? "#1a237e" : "#e1f0fb",
                              cursor: "pointer",
                              transition: "width 0.25s, background 0.25s",
                            }}
                          />
                        ))}
                        <button
                          onClick={() =>
                            setMemberPage(
                              colIdx,
                              Math.min(totalPages - 1, page + 1),
                            )
                          }
                          disabled={page === totalPages - 1}
                          className="sh-org-pagebtn"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            border: "none",
                            background:
                              page === totalPages - 1 ? "#f0f4ff" : "#e1f0fb",
                            color: page === totalPages - 1 ? "#bbb" : "#1a237e",
                            cursor:
                              page === totalPages - 1 ? "default" : "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "none",
                          }}
                        >
                          ›
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

// ─── Hội Viên Marquee Banner ────────────────────────────────────────────────
const AdminHoiVienBanner = ({
  background = {},
  title = "HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
  titleColor = "#4dd0e1",
  titleSize = 16,
  speed = 30,
  direction = "left",
  gap = 24,
  cardBg = "#0d1b2e",
  cardBorderColor = "rgba(255,255,255,0.08)",
  cardBorderRadius = 16,
  cardWidth = 160,
  cardHeight = 90,
  items = [],
}) => {
  // Duplicate items to create seamless loop
  const displayItems = items.length > 0 ? [...items, ...items] : [];

  const animName = direction === "right" ? "sh-marquee-right" : "sh-marquee-left";
  const totalWidth = items.length * (cardWidth + gap);

  return (
    <>
      <style>{`
        @keyframes sh-marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        @keyframes sh-marquee-right {
          0%   { transform: translateX(-${totalWidth}px); }
          100% { transform: translateX(0); }
        }
        .sh-hoivien-wrapper {
          overflow: hidden;
          width: 100%;
          cursor: pointer;
        }
        .sh-hoivien-track {
          display: flex;
          will-change: transform;
          animation: ${animName} ${speed}s linear infinite;
        }
        /* ★ Dừng hẳn khi di chuột vào bất kỳ thẻ nào trong wrapper */
        .sh-hoivien-wrapper:hover .sh-hoivien-track {
          animation-play-state: paused !important;
        }
        .sh-hoivien-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0;
        }
        .sh-hoivien-card:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 8px 28px rgba(77,208,225,0.28) !important;
        }
      `}</style>
      <section
        style={{
          ...resolveBackgroundStyle(background, "#0d2137"),
          padding: "36px 0 32px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Title */}
        {title && (
          <div style={{ textAlign: "center", marginBottom: "24px", padding: "0 24px" }}>
            <h2
              style={{
                fontSize: `${titleSize}px`,
                fontWeight: "700",
                color: titleColor,
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
        )}

        {/* Marquee wrapper — CSS :hover tự động pause track bên trong */}
        <div className="sh-hoivien-wrapper">
          <div
            className="sh-hoivien-track"
            style={{
              gap: `${gap}px`,
              paddingLeft: `${gap}px`,
              width: "max-content",
            }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                className="sh-hoivien-card"
                style={{
                  backgroundColor: item.cardBg || cardBg,
                  border: `1px solid ${item.cardBorderColor || cardBorderColor}`,
                  borderRadius: `${cardBorderRadius}px`,
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  boxSizing: "border-box",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                }}
              >
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={item.name || ""}
                    style={{
                      maxWidth: "64px",
                      maxHeight: "48px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "8px",
                      background: "rgba(77,208,225,0.12)",
                      border: "1.5px dashed rgba(77,208,225,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                    }}
                  >
                    🏢
                  </div>
                )}
                {item.name && (
                  <p
                    style={{
                      color: item.nameColor || "#4dd0e1",
                      fontSize: `${item.nameFontSize || 11}px`,
                      fontWeight: "600",
                      letterSpacing: "0.8px",
                      textAlign: "center",
                      margin: 0,
                      textTransform: "uppercase",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

export const puckConfig = {
  components: {
    Heading: {
      label: "Tiêu đề",
      fields: {
        content: { type: "text", label: "Nội dung", contentEditable: true },
        level: {
          type: "select",
          label: "Cấp độ",
          options: [
            { label: "H1", value: 1 },
            { label: "H2", value: 2 },
            { label: "H3", value: 3 },
            { label: "H4", value: 4 },
            { label: "H5", value: 5 },
            { label: "H6", value: 6 },
          ],
        },
        align: {
          type: "select",
          label: "Căn lề",
          options: [
            { label: "Trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Phải", value: "right" },
          ],
        },
      },
      defaultProps: { content: "Tiêu đề", level: 2, align: "left" },
      render: (props) => <AdminHeading {...props} />,
    },

    Text: {
      label: "Văn bản",
      fields: {
        content: { type: "textarea", label: "Nội dung", contentEditable: true },
        align: {
          type: "select",
          label: "Căn lề",
          options: [
            { label: "Trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Phải", value: "right" },
            { label: "Đều", value: "justify" },
          ],
        },
      },
      defaultProps: { content: "Nhập văn bản ở đây...", align: "left" },
      render: (props) => <AdminText {...props} />,
    },

    Image: {
      label: "Ảnh",
      fields: {
        src: { type: "text", label: "URL ảnh" },
        alt: { type: "text", label: "Alt text" },
        width: { type: "text", label: "Chiều rộng", default: "100%" },
        height: { type: "text", label: "Chiều cao", default: "auto" },
        borderRadius: { type: "text", label: "Bo góc", default: "0" },
        align: {
          type: "select",
          label: "Căn lề",
          options: [
            { label: "Trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Phải", value: "right" },
          ],
        },
      },
      defaultProps: {
        src: "https://via.placeholder.com/800x400",
        alt: "Ảnh minh họa",
        width: "100%",
        height: "auto",
        borderRadius: "0",
        align: "center",
      },
      render: (props) => <AdminImage {...props} />,
    },

    Section: {
      label: "Khoảng (Section)",
      fields: {
        container: {
          type: "select",
          label: "Chiều rộng",
          options: [
            { label: "Small (640px)", value: "sm" },
            { label: "Medium (768px)", value: "md" },
            { label: "Large (1024px)", value: "lg" },
            { label: "XL (1280px)", value: "xl" },
          ],
        },
        background: {
          type: "object",
          label: "Background",
          objectFields: {
            type: {
              type: "select",
              label: "Loại",
              options: [
                { label: "Màu", value: "color" },
                { label: "Gradient", value: "gradient" },
                { label: "Ảnh", value: "image" },
              ],
            },
            color: { type: "text", label: "Màu nền", default: "#ffffff" },
            fromColor: {
              type: "text",
              label: "Gradient từ",
              default: "#667eea",
            },
            toColor: {
              type: "text",
              label: "Gradient đến",
              default: "#764ba2",
            },
            direction: {
              type: "text",
              label: "Hướng gradient",
              default: "to right",
            },
            bg_image: { type: "text", label: "URL ảnh nền" },
            opacity: {
              type: "number",
              label: "Độ mờ",
              min: 0,
              max: 1,
              step: 0.1,
              default: 1,
            },
          },
        },
        padding_x: {
          type: "number",
          label: "Padding ngang",
          min: 0,
          max: 16,
          default: 4,
        },
        padding_y: {
          type: "number",
          label: "Padding dọc",
          min: 0,
          max: 16,
          default: 4,
        },
        content: { type: "slot" }, // Cho phép nested components
      },
      defaultProps: {
        container: "lg",
        background: { type: "color", color: "#ffffff" },
        padding_x: 4,
        padding_y: 4,
        content: [],
      },
      render: (props) => <AdminSection {...props} />,
    },

    Hero: {
      label: "Hero Banner",
      fields: {
        title: { type: "text", label: "Tiêu đề", contentEditable: true },
        subtitle: {
          type: "textarea",
          label: "Mô tả ngắn",
          contentEditable: true,
        },
        buttons: {
          type: "array",
          label: "Danh sách nút",
          arrayFields: {
            text: { type: "text", label: "Text nút", contentEditable: true },
            url: { type: "text", label: "URL" },
            style: {
              type: "select",
              label: "Style",
              options: [
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
                { label: "Outline", value: "outline" },
              ],
            },
          },
          getItemSummary: (item) => item.text,
        },
        background: {
          type: "object",
          label: "Background",
          objectFields: {
            type: {
              type: "select",
              label: "Loại",
              options: [
                { label: "Màu", value: "color" },
                { label: "Gradient", value: "gradient" },
                { label: "Ảnh", value: "image" },
              ],
            },
            color: { type: "text", label: "Màu nền", default: "#ffffff" },
            gradientFrom: {
              type: "text",
              label: "Gradient từ",
              default: "#667eea",
            },
            gradientTo: {
              type: "text",
              label: "Gradient đến",
              default: "#764ba2",
            },
            gradientDirection: {
              type: "text",
              label: "Hướng",
              default: "to bottom right",
            },
            imageUrl: { type: "text", label: "URL ảnh nền" },
          },
        },
        layout: {
          type: "object",
          label: "Bố cục",
          objectFields: {
            align: {
              type: "select",
              label: "Căn lề",
              options: [
                { label: "Trái", value: "left" },
                { label: "Giữa", value: "center" },
                { label: "Phải", value: "right" },
              ],
            },
          },
        },
      },
      defaultProps: {
        title: "Chào mừng đến với website",
        subtitle: "Chúng tôi cung cấp những sản phẩm và dịch vụ tốt nhất",
        buttons: [
          { text: "Tìm hiểu thêm", url: "#", style: "primary" },
          { text: "Liên hệ", url: "#contact", style: "outline" },
        ],
        background: {
          type: "gradient",
          gradientFrom: "#667eea",
          gradientTo: "#764ba2",
          gradientDirection: "to bottom right",
        },
        layout: { align: "center" },
      },
      render: (props) => <AdminHero {...props} />,
    },

    HeroBanner: {
      label: "Hero Banner (Sen Hồng)",
      fields: {
        background: sharedBackgroundField("#1a237e", "#667eea", "#764ba2"),
        cardPosition: {
          type: "select",
          label: "Vị trí cụm nội dung",
          options: [
            { label: "Bên trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Bên phải", value: "right" },
          ],
        },
        cardBg: {
          type: "text",
          label: "Màu nền thẻ (rgba/hex)",
          default: "rgba(255,255,255,0.12)",
        },
        cardBlur: {
          type: "number",
          label: "Độ nhòe kính thẻ (px)",
          min: 0,
          max: 40,
          default: 14,
        },
        cardBorderColor: {
          type: "text",
          label: "Màu viền thẻ (rgba/hex)",
          default: "rgba(255,255,255,0.25)",
        },
        cardBorderRadiusType: {
          type: "select",
          label: "Kiểu bo góc thẻ",
          options: [
            { label: "Bo 4 góc", value: "all" },
            { label: "Bo 2 góc chéo", value: "diagonal" },
          ],
          default: "all",
        },
        cardBorderRadius: {
          type: "number",
          label: "Bo góc thẻ nội dung (px)",
          min: 0,
          max: 80,
          default: 20,
        },
        label: { type: "text", label: "Nhãn phụ nhỏ phía trên" },
        title: { type: "text", label: "Tiêu đề chính", contentEditable: true },
        titleColor: { type: "text", label: "Màu tiêu đề (VD: #f5c518)" },
        titleSize: {
          type: "number",
          label: "Cỡ chữ tiêu đề (px)",
          min: 16,
          max: 100,
        },
        description: {
          type: "textarea",
          label: "Mô tả",
          contentEditable: true,
        },
        descriptionColor: { type: "text", label: "Màu mô tả (VD: #ffffff)" },
        descriptionSize: {
          type: "number",
          label: "Cỡ chữ mô tả (px)",
          min: 10,
          max: 28,
        },
        button: {
          type: "object",
          label: "Nút bấm",
          objectFields: {
            text: {
              type: "text",
              label: "Chữ trong nút",
              contentEditable: true,
            },
            url: { type: "text", label: "URL liên kết" },
            bgColor: { type: "text", label: "Màu nền nút (VD: #2196f3)" },
            textColor: { type: "text", label: "Màu chữ nút (VD: #ffffff)" },
            borderRadius: {
              type: "number",
              label: "Bo góc nút (px)",
              min: 0,
              max: 60,
            },
            paddingX: {
              type: "number",
              label: "Padding ngang (px)",
              min: 0,
              max: 80,
              default: 26,
            },
            paddingY: {
              type: "number",
              label: "Padding dọc (px)",
              min: 0,
              max: 40,
              default: 10,
            },
          },
        },
      },
      defaultProps: {
        background: { type: "image", imageUrl: "", color: "#1a237e" },
        cardPosition: "left",
        cardBg: "rgba(255,255,255,0.12)",
        cardBlur: 14,
        cardBorderColor: "rgba(255,255,255,0.25)",
        cardBorderRadiusType: "all",
        cardBorderRadius: 20,
        label: "LAN TỎA GIÁ TRỊ ĐẤT",
        title: "Sen Hồng",
        titleColor: "#f5c518",
        titleSize: 52,
        description:
          "CLB Doanh nhân Đồng Tháp tại TPHCM quy tụ những người con quê hương Đất Sen Hồng. Với tinh thần hợp tác – Đổi mới – Phát triển, CLB đóng vai trò thúc đẩy giá trị kinh doanh cho nghĩa tình quê hương.",
        descriptionColor: "#ffffff",
        descriptionSize: 13,
        button: {
          text: "Tham gia cộng đồng",
          url: "#",
          bgColor: "#2196f3",
          textColor: "#ffffff",
          borderRadius: 20,
          paddingX: 26,
          paddingY: 10,
        },
      },
      render: (props) => <AdminHeroBanner {...props} />,
    },

    BanChuyenMon: {
      label: "Các Ban Chuyên Môn",
      fields: {
        background: sharedBackgroundField("#e8edf5", "#c5cae9", "#90caf9"),
        title: { type: "text", label: "Tiêu đề chính", contentEditable: true },
        subtitle: { type: "text", label: "Tiêu đề phụ", contentEditable: true },
        items: {
          type: "array",
          label: "Danh sách ban (5–7 cục)",
          arrayFields: {
            iconUrl: { type: "text", label: "URL icon / hình ảnh" },
            title: { type: "text", label: "Tên ban", contentEditable: true },
            titleColor: { type: "text", label: "Màu chữ tên ban", default: "#ffffff" },
            titleFontSize: { type: "number", label: "Cỡ chữ tên ban", default: 13 },
            cardBgType: {
              type: "select",
              label: "Loại nền thẻ",
              options: [
                { label: "Màu đơn", value: "color" },
                { label: "Gradient", value: "gradient" },
              ],
              default: "gradient",
            },
            cardBgColor: { type: "text", label: "Màu nền thẻ (đơn)", default: "#1565c0" },
            cardBgFrom: { type: "text", label: "Gradient từ", default: "#3a7bd5" },
            cardBgTo: { type: "text", label: "Gradient đến", default: "#1565c0" },
            cardBgDirection: { type: "text", label: "Hướng gradient thẻ", default: "135deg" },
            borderRadiusType: {
              type: "select",
              label: "Kiểu bo góc thẻ",
              options: [
                { label: "Bo 4 góc", value: "all" },
                { label: "Bo 2 góc chéo", value: "diagonal" },
              ],
              default: "diagonal",
            },
            borderRadius: {
              type: "number",
              label: "Độ cong bo lá (px)",
              min: 0,
              max: 80,
              default: 40,
            },
            buttonText: {
              type: "text",
              label: "Chữ nút",
              contentEditable: true,
            },
            buttonUrl: { type: "text", label: "URL nút" },
            buttonBgColor: { type: "text", label: "Màu nền nút", default: "rgba(255,255,255,0.15)" },
            buttonTextColor: { type: "text", label: "Màu chữ nút", default: "#ffffff" },
            buttonBorderColor: { type: "text", label: "Màu viền nút", default: "rgba(255,255,255,0.45)" },
            buttonBorderRadius: {
              type: "number",
              label: "Bo góc nút (px)",
              min: 0,
              max: 40,
              default: 20,
            },
            buttonFontSize: { type: "number", label: "Cỡ chữ nút", default: 12 },
          },
          getItemSummary: (item) => item.title || "Ban chuyên môn",
        },
      },
      defaultProps: {
        background: {
          type: "gradient",
          fromColor: "#c5cae9",
          toColor: "#90caf9",
          direction: "135deg",
          opacity: 1,
        },
        title: "CÁC BAN CHUYÊN MÔN",
        subtitle: "CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
        items: [
          {
            iconUrl: "",
            title: "Ban Kinh tế – Đầu tư",
            titleColor: "#ffffff",
            titleFontSize: 13,
            cardBgType: "gradient",
            cardBgColor: "#1565c0",
            cardBgFrom: "#3a7bd5",
            cardBgTo: "#1565c0",
            cardBgDirection: "135deg",
            borderRadiusType: "diagonal",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBgColor: "rgba(255,255,255,0.15)",
            buttonTextColor: "#ffffff",
            buttonBorderColor: "rgba(255,255,255,0.45)",
            buttonBorderRadius: 20,
            buttonFontSize: 12,
          },
          {
            iconUrl: "",
            title: "Ban Văn hóa – Thể thao",
            titleColor: "#ffffff",
            titleFontSize: 13,
            cardBgType: "gradient",
            cardBgColor: "#1565c0",
            cardBgFrom: "#3a7bd5",
            cardBgTo: "#1565c0",
            cardBgDirection: "135deg",
            borderRadiusType: "diagonal",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBgColor: "rgba(255,255,255,0.15)",
            buttonTextColor: "#ffffff",
            buttonBorderColor: "rgba(255,255,255,0.45)",
            buttonBorderRadius: 20,
            buttonFontSize: 12,
          },
          {
            iconUrl: "",
            title: "Ban Xã hội – Cộng đồng",
            titleColor: "#ffffff",
            titleFontSize: 13,
            cardBgType: "gradient",
            cardBgColor: "#1565c0",
            cardBgFrom: "#3a7bd5",
            cardBgTo: "#1565c0",
            cardBgDirection: "135deg",
            borderRadiusType: "diagonal",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBgColor: "rgba(255,255,255,0.15)",
            buttonTextColor: "#ffffff",
            buttonBorderColor: "rgba(255,255,255,0.45)",
            buttonBorderRadius: 20,
            buttonFontSize: 12,
          },
          {
            iconUrl: "",
            title: "Ban Khởi nghiệp",
            titleColor: "#ffffff",
            titleFontSize: 13,
            cardBgType: "gradient",
            cardBgColor: "#1565c0",
            cardBgFrom: "#3a7bd5",
            cardBgTo: "#1565c0",
            cardBgDirection: "135deg",
            borderRadiusType: "diagonal",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBgColor: "rgba(255,255,255,0.15)",
            buttonTextColor: "#ffffff",
            buttonBorderColor: "rgba(255,255,255,0.45)",
            buttonBorderRadius: 20,
            buttonFontSize: 12,
          },
          {
            iconUrl: "",
            title: "Ban Giao thương quốc tế",
            titleColor: "#ffffff",
            titleFontSize: 13,
            cardBgType: "gradient",
            cardBgColor: "#1565c0",
            cardBgFrom: "#3a7bd5",
            cardBgTo: "#1565c0",
            cardBgDirection: "135deg",
            borderRadiusType: "diagonal",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBgColor: "rgba(255,255,255,0.15)",
            buttonTextColor: "#ffffff",
            buttonBorderColor: "rgba(255,255,255,0.45)",
            buttonBorderRadius: 20,
            buttonFontSize: 12,
          },
        ],
      },
      render: (props) => <AdminBanChuyenMon {...props} />,
    },

    AboutOrg: {
      label: "Về CLB & Cơ Cấu Tổ Chức",
      fields: {
        background: sharedBackgroundField("#f0f4ff", "#e8edf8", "#d0d8f0"),
        membersPerPage: {
          type: "number",
          label: "Số thành viên hiển thị mỗi trang",
          min: 1,
          max: 10,
        },
        columns: {
          type: "array",
          label: "Danh sách cột (2–4 cột)",
          arrayFields: {
            title: {
              type: "text",
              label: "Tiêu đề cột",
              contentEditable: true,
            },
            type: {
              type: "select",
              label: "Loại cột",
              options: [
                { label: "Văn bản + Ảnh", value: "text" },
                { label: "Danh sách thành viên", value: "members" },
              ],
            },
            colBgType: {
              type: "select",
              label: "Loại nền cột",
              options: [
                { label: "Màu đơn", value: "color" },
                { label: "Gradient", value: "gradient" },
              ],
              default: "color",
            },
            colBgColor: { type: "text", label: "Màu nền cột", default: "#ffffff" },
            colBgFrom: { type: "text", label: "Gradient từ", default: "#eff6ff" },
            colBgTo: { type: "text", label: "Gradient đến", default: "#f5f3ff" },
            colBgDirection: { type: "text", label: "Hướng gradient cột", default: "to bottom" },
            colBorderRadiusType: {
              type: "select",
              label: "Kiểu bo góc cột",
              options: [
                { label: "Bo 4 góc", value: "all" },
                { label: "Bo 2 góc chéo", value: "diagonal" },
              ],
              default: "all",
            },
            colBorderRadius: {
              type: "number",
              label: "Bo góc cột (px)",
              min: 0,
              max: 60,
              default: 16,
            },
            colPadding: {
              type: "number",
              label: "Padding cột (px)",
              min: 0,
              max: 80,
              default: 32,
            },
            imageUrl: { type: "text", label: "[Cột văn bản] URL ảnh minh họa" },
            textParagraphs: {
              type: "array",
              label: "[Cột văn bản] Các đoạn văn",
              arrayFields: {
                text: {
                  type: "textarea",
                  label: "Nội dung đoạn",
                  contentEditable: true,
                },
              },
              getItemSummary: (item) =>
                item.text ? item.text.substring(0, 40) + "..." : "Đoạn văn",
            },
            members: {
              type: "array",
              label: "[Cột thành viên] Danh sách thành viên",
              arrayFields: {
                photo: { type: "text", label: "URL ảnh đại diện" },
                name: {
                  type: "text",
                  label: "Họ và tên",
                  contentEditable: true,
                },
                clbRole: {
                  type: "text",
                  label: "Chức vụ trong CLB",
                  contentEditable: true,
                },
                bizRole: {
                  type: "text",
                  label: "Chức vụ Doanh nghiệp",
                  contentEditable: true,
                },
                company: {
                  type: "text",
                  label: "Tên Doanh nghiệp",
                  contentEditable: true,
                },
              },
              getItemSummary: (item) => item.name || "Thành viên",
            },
          },
          getItemSummary: (col) => col.title || "Cột",
        },
      },
      defaultProps: {
        background: {
          type: "gradient",
          fromColor: "#e8edf8",
          toColor: "#d0d8f0",
          direction: "135deg",
          opacity: 1,
        },
        membersPerPage: 3,
        columns: [
          {
            title: "VỀ CÂU LẠC BỘ",
            type: "text",
            colBgType: "color",
            colBgColor: "#ffffff",
            colBgFrom: "#eff6ff",
            colBgTo: "#f5f3ff",
            colBgDirection: "to bottom",
            colBorderRadiusType: "all",
            colBorderRadius: 16,
            colPadding: 32,
            imageUrl: "",
            textParagraphs: [
              {
                text: "CLB Doanh nhân Đồng Tháp tại TP.HCM là nơi hội tụ các doanh nghiệp, nhà quản lý và cá nhân khởi nghiệp trên địa bàn toàn tỉnh.",
              },
              {
                text: "Với tinh thần kết nối – đồng hành – sẻ chia, CLB đóng vai trò thúc đẩy giá trị kinh doanh trong bối cảnh hội nhập và chuyển đổi số.",
              },
            ],
            members: [],
          },
          {
            title: "CƠ CẤU TỔ CHỨC",
            type: "members",
            colBgType: "color",
            colBgColor: "#ffffff",
            colBgFrom: "#eff6ff",
            colBgTo: "#f5f3ff",
            colBgDirection: "to bottom",
            colBorderRadiusType: "all",
            colBorderRadius: 16,
            colPadding: 32,
            imageUrl: "",
            textParagraphs: [],
            members: [
              {
                photo: "",
                name: "Trần Văn Khang",
                clbRole: "Ủy viên BCH",
                bizRole: "Tổng Giám đốc",
                company: "Công ty CP Logistics Đồng Tháp",
              },
              {
                photo: "",
                name: "Đỗ Thu Trang",
                clbRole: "Thủ quỹ CLB",
                bizRole: "Giám đốc Tài chính",
                company: "Công ty TNHH Sen Việt",
              },
              {
                photo: "",
                name: "Vũ Hoàng Long",
                clbRole: "Ủy viên BCH",
                bizRole: "Giám đốc Điều hành",
                company: "Công ty Công nghệ số Mekong",
              },
            ],
          },
        ],
      },
      render: (props) => <AdminAboutOrg {...props} />,
    },

    HoiVienBanner: {
      label: "Banner Hội Viên (Marquee)",
      fields: {
        background: sharedBackgroundField("#0d2137", "#0d1b2e", "#0d2137"),
        title: { type: "text", label: "Tiêu đề banner", contentEditable: true },
        titleColor: { type: "text", label: "Màu tiêu đề", default: "#4dd0e1" },
        titleSize: {
          type: "number",
          label: "Cỡ chữ tiêu đề (px)",
          min: 10,
          max: 40,
          default: 16,
        },
        speed: {
          type: "number",
          label: "Tốc độ chạy (giây / vòng — nhỏ = nhanh)",
          min: 5,
          max: 120,
          default: 30,
        },
        direction: {
          type: "select",
          label: "Chiều chạy",
          options: [
            { label: "← Từ phải sang trái", value: "left" },
            { label: "→ Từ trái sang phải", value: "right" },
          ],
          default: "left",
        },
        gap: {
          type: "number",
          label: "Khoảng cách giữa thẻ (px)",
          min: 0,
          max: 80,
          default: 24,
        },
        cardBg: {
          type: "text",
          label: "Màu nền thẻ mặc định",
          default: "#0d1b2e",
        },
        cardBorderColor: {
          type: "text",
          label: "Màu viền thẻ mặc định",
          default: "rgba(255,255,255,0.08)",
        },
        cardBorderRadius: {
          type: "number",
          label: "Bo góc thẻ (px)",
          min: 0,
          max: 60,
          default: 16,
        },
        cardWidth: {
          type: "number",
          label: "Chiều rộng thẻ (px)",
          min: 80,
          max: 400,
          default: 160,
        },
        cardHeight: {
          type: "number",
          label: "Chiều cao thẻ (px)",
          min: 60,
          max: 300,
          default: 90,
        },
        items: {
          type: "array",
          label: "Danh sách hội viên",
          arrayFields: {
            logoUrl: { type: "text", label: "URL logo / hình ảnh" },
            name: { type: "text", label: "Tên công ty / hội viên", contentEditable: true },
            nameColor: { type: "text", label: "Màu tên", default: "#4dd0e1" },
            nameFontSize: { type: "number", label: "Cỡ chữ tên (px)", min: 8, max: 24, default: 11 },
            cardBg: { type: "text", label: "Màu nền thẻ riêng (để trống = dùng mặc định)" },
            cardBorderColor: { type: "text", label: "Màu viền thẻ riêng (để trống = dùng mặc định)" },
          },
          getItemSummary: (item) => item.name || "Hội viên",
        },
      },
      defaultProps: {
        background: { type: "gradient", fromColor: "#0d2137", toColor: "#0d1b2e", direction: "to bottom" },
        title: "HỘI VIÊN CLB DOANH NHÂN ĐỒNG THÁP TẠI TP. HỒ CHÍ MINH",
        titleColor: "#4dd0e1",
        titleSize: 16,
        speed: 30,
        direction: "left",
        gap: 24,
        cardBg: "#0d1b2e",
        cardBorderColor: "rgba(255,255,255,0.08)",
        cardBorderRadius: 16,
        cardWidth: 160,
        cardHeight: 90,
        items: [
          { logoUrl: "", name: "ECOBOOK", nameColor: "#4dd0e1", nameFontSize: 11, cardBg: "", cardBorderColor: "" },
          { logoUrl: "", name: "COMOON", nameColor: "#4dd0e1", nameFontSize: 11, cardBg: "", cardBorderColor: "" },
          { logoUrl: "", name: "Hội Viên 3", nameColor: "#4dd0e1", nameFontSize: 11, cardBg: "", cardBorderColor: "" },
          { logoUrl: "", name: "Hội Viên 4", nameColor: "#4dd0e1", nameFontSize: 11, cardBg: "", cardBorderColor: "" },
          { logoUrl: "", name: "Hội Viên 5", nameColor: "#4dd0e1", nameFontSize: 11, cardBg: "", cardBorderColor: "" },
        ],
      },
      render: (props) => <AdminHoiVienBanner {...props} />,
    },

    // ────────────────────────────────────────────────────────────────────────────
    // HANH TRINH BANNER - Thống kê hành trình
    // ────────────────────────────────────────────────────────────────────────────
    HanhTrinhBanner: {
      label: "Hành Trình Thống Kê",
      fields: {
        background: {
          type: "object",
          label: "Nền banner",
          objectFields: {
            type: { type: "select", label: "Loại nền", options: [
              { label: "Màu đơn", value: "color" },
              { label: "Gradient", value: "gradient" },
              { label: "Hình ảnh", value: "image" },
            ]},
            color: { type: "text", label: "Màu đơn" },
            fromColor: { type: "text", label: "Màu bắt đầu gradient" },
            toColor: { type: "text", label: "Màu kết thúc gradient" },
            direction: { type: "text", label: "Hướng gradient (vd: 135deg, to right)" },
            imageUrl: { type: "text", label: "URL ảnh nền" },
            opacity: { type: "number", label: "Độ trong suốt (0–1)", min: 0, max: 1 },
          },
        },
        paddingY: { type: "number", label: "Khoảng cách trên/dưới (px)", min: 0, max: 200, default: 40 },
        centerTitle: { type: "text", label: "Tiêu đề trung tâm" },
        centerTitleColor: { type: "text", label: "Màu tiêu đề" },
        centerTitleSize: { type: "number", label: "Cỡ chữ tiêu đề (px)", min: 10, max: 48 },
        centerImageUrl: { type: "text", label: "URL hình ảnh trung tâm" },
        centerImageWidth: { type: "number", label: "Chiều rộng hình trung tâm (px)", min: 100, max: 800 },
        centerImageHeight: { type: "number", label: "Chiều cao hình trung tâm (px)", min: 100, max: 600 },
        centerImageOpacity: { type: "number", label: "Độ mờ hình ảnh (0–1)", min: 0, max: 1 },
        centerImageBorderRadius: { type: "number", label: "Bo góc hình ảnh (px)", min: 0, max: 100 },
        numberColor: { type: "text", label: "Màu số liệu" },
        numberSize: { type: "number", label: "Cỡ chữ số liệu (px)", min: 16, max: 80 },
        descColor: { type: "text", label: "Màu mô tả" },
        descSize: { type: "number", label: "Cỡ chữ mô tả (px)", min: 8, max: 24 },
        hoverEffect: { type: "select", label: "Hiệu ứng hover số liệu", options: [
          { label: "Nổi lên", value: "lift" },
          { label: "Phóng to", value: "scale" },
          { label: "Sáng lên", value: "glow" },
          { label: "Kết hợp", value: "combo" },
        ]},
        stats: {
          type: "array",
          label: "Danh sách thống kê (4 mục)",
          arrayFields: {
            number: { type: "text", label: "Số liệu (vd: 500+)" },
            description: { type: "textarea", label: "Mô tả" },
            position: { type: "select", label: "Vị trí (cột)", options: [
              { label: "Cột 0 – Ngoài cùng trái", value: "0" },
              { label: "Cột 1 – Trong trái (trên ảnh)", value: "1" },
              { label: "Cột 2 – Trong phải (trên ảnh)", value: "2" },
              { label: "Cột 3 – Ngoài cùng phải", value: "3" },
            ]},
            customNumberColor: { type: "text", label: "Màu số riêng (để trống = dùng màu chung)" },
          },
          getItemSummary: (item) => item.number || "Thống kê",
        },
      },
      defaultProps: {
        background: { type: "gradient", fromColor: "#1a0533", toColor: "#0d1b3e", direction: "135deg" },
        paddingY: 50,
        centerTitle: "HÀNH TRÌNH KIẾN TẠO & GẮN KẾT GIÁ TRỊ",
        centerTitleColor: "#a78bfa",
        centerTitleSize: 16,
        centerImageUrl: "",
        centerImageWidth: 380,
        centerImageHeight: 260,
        centerImageOpacity: 0.9,
        centerImageBorderRadius: 12,
        numberColor: "#ffffff",
        numberSize: 44,
        descColor: "rgba(255,255,255,0.75)",
        descSize: 13,
        hoverEffect: "combo",
        stats: [
          { number: "500+", description: "Hội viên là các doanh nghiệp và doanh nhân tiêu biểu tại TP.HCM", position: "0", customNumberColor: "" },
          { number: "20+", description: "Năm hình thành và phát triển mạng lưới kết nối đồng hương", position: "1", customNumberColor: "" },
          { number: "1.000+", description: "Cơ hội giao thương và kêu gọi đầu tư được khởi tạo mỗi năm", position: "2", customNumberColor: "" },
          { number: "100+", description: "Chương trình thiện nguyện và hoạt động hướng về quê hương", position: "3", customNumberColor: "" },
        ],
      },
      render: (props) => <AdminHanhTrinhBanner {...props} />,
    },

    // ────────────────────────────────────────────────────────────────────────────
    // TIN TUC SU KIEN - Tin tức & Sự kiện
    // ────────────────────────────────────────────────────────────────────────────
    TinTucSuKien: {
      label: "Tin Tức & Sự Kiện",
      fields: {
        background: sharedBackgroundField("#0d1b3e", "#0d1b3e", "#1a0533"),
        paddingY: { type: "number", label: "Khoảng cách trên/dưới (px)", min: 0, max: 200, default: 60 },
        sectionTitle: { type: "text", label: "Tiêu đề khối", contentEditable: true },
        sectionTitleColor: { type: "text", label: "Màu tiêu đề khối" },
        sectionTitleSize: { type: "number", label: "Cỡ chữ tiêu đề (px)", min: 14, max: 60, default: 26 },
        viewAllText: { type: "text", label: "Văn bản nút Xem thêm" },
        viewAllUrl: { type: "text", label: "URL nút Xem thêm" },
        viewAllColor: { type: "text", label: "Màu nút Xem thêm" },
        cardBg: { type: "text", label: "Màu nền thẻ" },
        cardBorderColor: { type: "text", label: "Màu viền thẻ" },
        cardBorderRadius: { type: "number", label: "Bo góc thẻ (px)", min: 0, max: 60, default: 16 },
        cardBorderRadiusType: {
          type: "select",
          label: "Kiểu bo góc thẻ",
          options: [
            { label: "Bo tròn toàn bộ", value: "all" },
            { label: "Bo góc chéo (hình lá)", value: "diagonal" },
          ],
          default: "all",
        },
        dateFontSize: { type: "number", label: "Cỡ chữ ngày (px)", min: 8, max: 20, default: 12 },
        dateColor: { type: "text", label: "Màu chữ ngày" },
        titleColor: { type: "text", label: "Màu tiêu đề bài viết" },
        titleFontSize: { type: "number", label: "Cỡ chữ tiêu đề bài viết (px)", min: 12, max: 40, default: 18 },
        descColor: { type: "text", label: "Màu mô tả" },
        descFontSize: { type: "number", label: "Cỡ chữ mô tả (px)", min: 10, max: 24, default: 13 },
        tagBg: { type: "text", label: "Màu nền nhãn (tag)" },
        tagColor: { type: "text", label: "Màu chữ nhãn (tag)" },
        items: {
          type: "array",
          label: "Danh sách bài viết (tối đa 5)",
          arrayFields: {
            imageUrl: { type: "text", label: "URL hình ảnh" },
            tag: { type: "text", label: "Nhãn (vd: Mới nhất) — chỉ hiển thị ở thẻ lớn" },
            date: { type: "text", label: "Ngày tháng (vd: 20/03/2026)" },
            title: { type: "text", label: "Tiêu đề bài viết", contentEditable: true },
            description: { type: "textarea", label: "Mô tả ngắn" },
            url: { type: "text", label: "URL liên kết bài viết" },
          },
          getItemSummary: (item) => item.title || "Bài viết",
        },
      },
      defaultProps: {
        background: { type: "gradient", fromColor: "#0d1b3e", toColor: "#1a0533", direction: "135deg" },
        paddingY: 60,
        sectionTitle: "TIN TỨC & SỰ KIỆN",
        sectionTitleColor: "#4dd0e1",
        sectionTitleSize: 26,
        viewAllText: "Xem thêm →",
        viewAllUrl: "#",
        viewAllColor: "#ffffff",
        cardBg: "#1a1240",
        cardBorderColor: "rgba(255,255,255,0.08)",
        cardBorderRadius: 16,
        cardBorderRadiusType: "all",
        dateFontSize: 12,
        dateColor: "rgba(255,255,255,0.55)",
        titleColor: "#4dd0e1",
        titleFontSize: 18,
        descColor: "rgba(255,255,255,0.7)",
        descFontSize: 13,
        tagBg: "#f59e0b",
        tagColor: "#ffffff",
        items: [
          {
            imageUrl: "",
            tag: "Mới nhất",
            date: "20/03/2026",
            title: "Hội thảo kết nối doanh nghiệp chia sẻ xu hướng phát triển",
            description: "Sự kiện quy tụ nhiều chuyên gia và doanh nhân, cùng thảo luận về chiến lược phát triển, chuyển đổi số và cơ hội hợp tác trong thời đại mới.",
            url: "#",
          },
          {
            imageUrl: "",
            tag: "Mới nhất",
            date: "20/03/2026",
            title: "Kết nối và chia sẻ niềm vui là cách phát triển sự hiệu quả...",
            description: "Khi chúng ta làm việc với một trái tim mở lòng và tinh thần sẻ chia, áp lực sẽ biến thành động lực, và khó khăn sẽ trở thành trải nghiệm.",
            url: "#",
          },
          {
            imageUrl: "",
            tag: "",
            date: "10/03/2026",
            title: "Lan tỏa yêu thương thiện nguyện",
            description: "Các thành viên đã cùng chung tay tổ chức hoạt động trao tặng...",
            url: "#",
          },
          {
            imageUrl: "",
            tag: "",
            date: "23/02/2026",
            title: "Hợp tác giữa các doanh nghiệp",
            description: "Định hướng phát triển tương lai là mở rộng quan hệ hợp tác giữa các ...",
            url: "#",
          },
          {
            imageUrl: "",
            tag: "",
            date: "23/02/2026",
            title: "Đẩy mạnh chuyển đổi số ...",
            description: "Sự phát triển hệ thống chuyển đổi đồng bộ nhằm tối ưu hóa...",
            url: "#",
          },
        ],
      },
      render: (props) => <AdminTinTucSuKien {...props} />,
    },

    // ────────────────────────────────────────────────────────────────────────────
    // GIA TRI CONG DONG
    // ────────────────────────────────────────────────────────────────────────────
    GiaTriCongDong: {
      label: "Giá Trị Khi Tham Gia Cộng Đồng",
      fields: {
        background: sharedBackgroundField("#061533", "#061533", "#0d1b4e"),
        paddingY: { type: "number", label: "Khoảng cách trên/dưới (px)", min: 0, max: 200, default: 60 },
        sectionTitle: { type: "text", label: "Tiêu đề khối", contentEditable: true },
        sectionTitleColor: { type: "text", label: "Màu tiêu đề" },
        sectionTitleSize: { type: "number", label: "Cỡ chữ tiêu đề (px)", min: 14, max: 60, default: 24 },
        viewAllText: { type: "text", label: "Văn bản nút Xem thêm" },
        viewAllUrl: { type: "text", label: "URL nút Xem thêm" },
        viewAllColor: { type: "text", label: "Màu nút Xem thêm" },
        cardBg: { type: "text", label: "Màu nền thẻ" },
        cardBorderColor: { type: "text", label: "Màu viền thẻ" },
        cardBorderRadius: { type: "number", label: "Bo góc thẻ (px)", min: 0, max: 60, default: 20 },
        cardBorderRadiusType: {
          type: "select",
          label: "Kiểu bo góc thẻ",
          options: [
            { label: "Bo tròn toàn bộ", value: "all" },
            { label: "Bo góc chéo (hình lá)", value: "diagonal" },
          ],
          default: "all",
        },
        iconSize: { type: "number", label: "Kích thước vùng icon (px)", min: 40, max: 120, default: 72 },
        titleColor: { type: "text", label: "Màu tiêu đề thẻ" },
        titleFontSize: { type: "number", label: "Cỡ chữ tiêu đề thẻ (px)", min: 12, max: 36, default: 16 },
        descColor: { type: "text", label: "Màu mô tả" },
        descFontSize: { type: "number", label: "Cỡ chữ mô tả (px)", min: 10, max: 24, default: 13 },
        btnBg: { type: "text", label: "Màu nền nút mặc định" },
        btnColor: { type: "text", label: "Màu chữ nút mặc định" },
        btnBorderColor: { type: "text", label: "Màu viền nút mặc định" },
        btnBorderRadius: { type: "number", label: "Bo góc nút mặc định (px)", min: 0, max: 60, default: 20 },
        items: {
          type: "array",
          label: "Danh sách thẻ giá trị (3–5 thẻ)",
          arrayFields: {
            iconUrl: { type: "text", label: "URL icon" },
            title: { type: "text", label: "Tiêu đề thẻ", contentEditable: true },
            customTitleColor: { type: "text", label: "Màu tiêu đề riêng (để trống = dùng màu chung)" },
            description: { type: "textarea", label: "Mô tả" },
            btnText: { type: "text", label: "Chữ trên nút (để trống = ẩn nút)" },
            btnUrl: { type: "text", label: "URL nút" },
            btnBg: { type: "text", label: "Màu nền nút riêng" },
            btnColor: { type: "text", label: "Màu chữ nút riêng" },
            btnBorderColor: { type: "text", label: "Màu viền nút riêng" },
            btnBorderRadius: { type: "number", label: "Bo góc nút riêng (px)", min: 0, max: 60 },
          },
          getItemSummary: (item) => item.title || "Thẻ giá trị",
        },
      },
      defaultProps: {
        background: { type: "gradient", fromColor: "#061533", toColor: "#0d2060", direction: "135deg" },
        paddingY: 60,
        sectionTitle: "GIÁ TRỊ KHI THAM GIA CỘNG ĐỒNG",
        sectionTitleColor: "#4dd0e1",
        sectionTitleSize: 24,
        viewAllText: "Xem thêm →",
        viewAllUrl: "#",
        viewAllColor: "#ffffff",
        cardBg: "rgba(10,20,60,0.75)",
        cardBorderColor: "rgba(77,208,225,0.2)",
        cardBorderRadius: 20,
        cardBorderRadiusType: "all",
        iconSize: 72,
        titleColor: "#4dd0e1",
        titleFontSize: 16,
        descColor: "rgba(255,255,255,0.75)",
        descFontSize: 13,
        btnBg: "rgba(77,208,225,0.15)",
        btnColor: "#4dd0e1",
        btnBorderColor: "rgba(77,208,225,0.5)",
        btnBorderRadius: 20,
        items: [
          { iconUrl: "", title: "Kết nối chất lượng", customTitleColor: "", description: "Tiếp cận mạng lưới doanh nhân uy tín, mở rộng cơ hội hợp tác thực tế.", btnText: "", btnUrl: "#", btnBg: "", btnColor: "", btnBorderColor: "", btnBorderRadius: 20 },
          { iconUrl: "", title: "Phát triển kiến thức", customTitleColor: "", description: "Cập nhật xu hướng, nâng cao tư duy quản trị và kỹ năng kinh doanh.", btnText: "", btnUrl: "#", btnBg: "", btnColor: "", btnBorderColor: "", btnBorderRadius: 20 },
          { iconUrl: "", title: "Cơ hội hợp tác", customTitleColor: "", description: "Tham gia các dự án, hoạt động kết nối và xúc tiến thương mại.", btnText: "", btnUrl: "#", btnBg: "", btnColor: "", btnBorderColor: "", btnBorderRadius: 20 },
        ],
      },
      render: (props) => <AdminGiaTriCongDong {...props} />,
    },

    // ────────────────────────────────────────────────────────────────────────────
    // LIEN HE BANNER
    // ────────────────────────────────────────────────────────────────────────────
    LienHeBanner: {
      label: "Banner Liên Hệ & Hợp Tác",
      fields: {
        background: sharedBackgroundField("#6b21a8", "#4c1d95", "#be185d"),
        paddingY: { type: "number", label: "Khoảng cách trên/dưới (px)", min: 0, max: 200, default: 72 },
        title: { type: "textarea", label: "Tiêu đề (xuống dòng bằng Enter)", contentEditable: true },
        titleColor: { type: "text", label: "Màu tiêu đề" },
        titleFontSize: { type: "number", label: "Cỡ chữ tiêu đề (px)", min: 14, max: 50, default: 22 },
        email: { type: "text", label: "Email" },
        emailBg: { type: "text", label: "Màu nền chip Email" },
        emailBorderRadius: { type: "number", label: "Bo góc chip Email (px)", min: 0, max: 60, default: 8 },
        phone: { type: "text", label: "Số điện thoại" },
        phoneBg: { type: "text", label: "Màu nền chip Điện thoại" },
        phoneBorderRadius: { type: "number", label: "Bo góc chip Điện thoại (px)", min: 0, max: 60, default: 8 },
        ctaText: { type: "text", label: "Chữ nút CTA", contentEditable: true },
        ctaUrl: { type: "text", label: "URL nút CTA" },
        ctaBg: { type: "text", label: "Màu nền nút CTA" },
        ctaColor: { type: "text", label: "Màu chữ nút CTA" },
        ctaBorderRadius: { type: "number", label: "Bo góc nút CTA (px)", min: 0, max: 60, default: 8 },
        ctaFontSize: { type: "number", label: "Cỡ chữ nút CTA (px)", min: 10, max: 28, default: 14 },
      },
      defaultProps: {
        background: { type: "gradient", fromColor: "#4c1d95", toColor: "#be185d", direction: "135deg" },
        paddingY: 72,
        title: "QUAN TÂM VÀ HỢP TÁC\nVỚI CÁC CHƯƠNG TRÌNH HOẠT ĐỘNG\nCỦA CLB DOANH NHÂN ĐỒNG THÁP TẠI TP.HCM",
        titleColor: "#ffffff",
        titleFontSize: 22,
        email: "info@dte.hunghau.vn",
        emailBg: "rgba(0,0,0,0.35)",
        emailBorderRadius: 8,
        phone: "1800 1568",
        phoneBg: "rgba(0,0,0,0.35)",
        phoneBorderRadius: 8,
        ctaText: "Đăng ký hội viên",
        ctaUrl: "#",
        ctaBg: "#3b5bdb",
        ctaColor: "#ffffff",
        ctaBorderRadius: 8,
        ctaFontSize: 14,
      },
      render: (props) => <AdminLienHeBanner {...props} />,
    },

    // ────────────────────────────────────────────────────────────────────────────
    // FOOTER
    // ────────────────────────────────────────────────────────────────────────────
    Footer: {
      label: "Footer (Chân trang)",
      fields: {
        background: sharedBackgroundField("#b8c5e8", "#a8bde0", "#c5d0f0"),
        logoUrl: { type: "text", label: "URL logo" },
        logoSize: { type: "number", label: "Kích thước logo (px)", min: 30, max: 150, default: 72 },
        orgName: { type: "textarea", label: "Tên tổ chức (Enter = xuống dòng)" },
        orgNameColor: { type: "text", label: "Màu tên tổ chức" },
        orgNameSize: { type: "number", label: "Cỡ chữ tên tổ chức (px)", min: 8, max: 18, default: 11 },
        contactTitleColor: { type: "text", label: "Màu tiêu đề cột Liên hệ" },
        columns: {
          type: "array",
          label: "Các cột hiển thị",
          arrayFields: {
            colType: { type: "select", label: "Loại cột", options: [
              { label: "Thông tin Logo & Liên hệ", value: "contact" },
              { label: "Danh sách liên kết", value: "links" },
            ]},
            title: { type: "text", label: "Tiêu đề cột (vd: Trụ sở chính, Liên kết...)" },
            // Fields for "contact"
            logoUrl: { type: "text", label: "Logo URL (chỉ dùng cho loại Liên hệ)" },
            orgName: { type: "textarea", label: "Tên tổ chức (chỉ dùng cho loại Liên hệ)" },
            contactItems: {
              type: "array", label: "Thông tin liên hệ (chỉ dùng cho loại Liên hệ)",
              arrayFields: {
                type: { type: "select", options: [{label:"Email", value:"email"}, {label:"Điện thoại", value:"phone"}, {label:"Địa chỉ", value:"map"}] },
                text: { type: "text", label: "Nội dung" },
              },
              getItemSummary: (item) => item.text || "Mục liên hệ",
            },
            // Fields for "links"
            links: {
              type: "array", label: "Danh sách liên kết (chỉ dùng cho loại Liên kết)",
              arrayFields: {
                label: { type: "text", label: "Nhãn" },
                url: { type: "text", label: "URL" },
              },
              getItemSummary: (item) => item.label || "Liên kết",
            }
          },
          getItemSummary: (item) => item.title || (item.colType === "contact" ? "Cột Liên Hệ" : "Cột Liên Kết")
        },
        headingColor: { type: "text", label: "Màu chữ tiêu đề các cột" },
        linkColor: { type: "text", label: "Màu chữ liên kết" },
        linkFontSize: { type: "number", label: "Cỡ chữ liên kết (px)", min: 10, max: 20, default: 13 },
        copyright: { type: "text", label: "Văn bản copyright" },
        copyrightColor: { type: "text", label: "Màu văn bản copyright" },
        backgroundImage: { type: "text", label: "Ảnh nền góc phải (URL)" },
        socialLinks: {
          type: "array",
          label: "Mạng xã hội",
          arrayFields: {
            type: { type: "select", label: "Loại", options: [
              { label: "Facebook", value: "facebook" },
              { label: "TikTok", value: "tiktok" },
              { label: "YouTube", value: "youtube" },
              { label: "LinkedIn", value: "linkedin" },
            ]},
            url: { type: "text", label: "URL" },
            iconBg: { type: "text", label: "Màu nền icon" },
            iconColor: { type: "text", label: "Màu icon" },
          },
          getItemSummary: (item) => item.type || "Mạng xã hội",
        },
      },
      defaultProps: {
        background: { type: "gradient", fromColor: "#89a1f7", toColor: "#3967d6", direction: "135deg" },
        logoUrl: "",
        logoSize: 72,
        orgName: "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP. HỒ CHÍ MINH",
        orgNameColor: "#4dd0e1",
        orgNameSize: 11,
        contactTitleColor: "#4dd0e1",
        columns: [
          {
            colType: "contact",
            title: "TRỤ SỞ CHÍNH",
            logoUrl: "",
            orgName: "CÂU LẠC BỘ DOANH NHÂN ĐỒNG THÁP\nTẠI TP. HỒ CHÍ MINH",
            contactItems: [
              { type: "map", text: "Phòng Đồng Tháp, HungHau Campus, Trường Đại học Văn Hiến, Đại lộ Nguyễn Văn Linh, Khu đô thị Nam Thành Phố, Thành phố Hồ Chí Minh" },
              { type: "email", text: "Email: info@dte.hunghau.vn" },
              { type: "phone", text: "Hotline: 1800 1568" },
            ]
          },
          {
            colType: "links",
            title: "Liên kết trang",
            links: [
              { label: "Trang chủ", url: "#" },
              { label: "Tin tức và sự kiện", url: "#" },
              { label: "Về chúng tôi", url: "#" },
              { label: "Các lĩnh vực hoạt động", url: "#" },
              { label: "Doanh nghiệp hội viên", url: "#" },
              { label: "Đăng kí", url: "#" },
              { label: "Hoạt động Ban", url: "#" },
            ]
          },
          {
            colType: "links",
            title: "Khác",
            links: [
              { label: "MYH", url: "#" },
              { label: "MYC", url: "#" },
              { label: "HHF", url: "#" },
              { label: "HHL", url: "#" },
              { label: "HHA", url: "#" },
              { label: "COWE", url: "#" },
              { label: "HHN", url: "#" },
              { label: "HYV", url: "#" },
            ]
          }
        ],
        headingColor: "#4dd0e1",
        linkColor: "rgba(77,208,225,0.8)",
        linkFontSize: 13,
        copyright: "Copyright © CLB Doanh nhân Dong Thap. All rights reserved",
        copyrightColor: "#ffffff",
        backgroundImage: "",
        socialLinks: [
          { type: "facebook", url: "#", iconBg: "rgba(77,208,225,0.8)", iconColor: "#ffffff" },
          { type: "tiktok", url: "#", iconBg: "#ffffff", iconColor: "#111111" },
          { type: "youtube", url: "#", iconBg: "rgba(220,53,69,0.9)", iconColor: "#ffffff" },
          { type: "linkedin", url: "#", iconBg: "rgba(77,208,225,0.8)", iconColor: "#ffffff" },
        ],
      },
      render: (props) => <AdminFooter {...props} />,
    },
  },

  // Sidebar categories
  categoryGroups: [
    { title: "Cơ bản", components: ["Heading", "Text", "Image"] },
    { title: "Layout", components: ["Section"] },
    { title: "Nâng cao", components: ["Hero"] },
    {
      title: "CLB – Sen Hồng",
      components: ["HeroBanner", "BanChuyenMon", "AboutOrg", "HoiVienBanner", "HanhTrinhBanner", "TinTucSuKien", "GiaTriCongDong", "LienHeBanner", "Footer"],
    },
  ],

  // Root config
  root: {
    render: ({ children }) => <div className="min-h-screen">{children}</div>,
  },
};

export default puckConfig;
