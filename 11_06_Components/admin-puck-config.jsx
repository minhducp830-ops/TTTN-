import React, { useState } from "react";
import AdminHeading from "./components/admin-heading";
import AdminText from "./components/admin-text";
import AdminImage from "./components/admin-image";
import AdminSection from "./components/admin-section";
import AdminHero from "./components/admin-hero";

// Config — đăng ký 8 components với fields + defaultProps + render.
const AdminHeroBanner = ({
  background = {},
  cardPosition = "left",
  cardBorderRadius = 20,
  label = "",
  title = "Sen Hồng",
  titleColor = "#f5c518",
  titleSize = 52,
  description = "",
  descriptionColor = "#ffffff",
  descriptionSize = 13,
  button = {},
}) => {
  const getBgStyle = () => {
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
    return { backgroundColor: background.color || "#1a237e", opacity };
  };

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
        ...getBgStyle(),
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div style={getCardContainerStyle()}>
          {/* Glassmorphism card */}
          <div
            className="sh-hero-card"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderRadius: `${cardBorderRadius}px`,
              border: "1px solid rgba(255,255,255,0.25)",
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
                  padding: "10px 26px",
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
  const getBgStyle = () => {
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
        background: `linear-gradient(${background.direction || "135deg"}, ${background.fromColor || "#c5cae9"}, ${background.toColor || "#90caf9"})`,
        opacity,
      };
    }
    return { backgroundColor: background.color || "#e8edf5", opacity };
  };

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
        ...getBgStyle(),
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
          {items.map((item, idx) => (
            <div
              key={idx}
              className="sh-ban-card"
              style={{
                background: "linear-gradient(135deg, #3a7bd5 0%, #1565c0 100%)",
                borderRadius: `0 ${item.borderRadius !== undefined ? item.borderRadius : 40}px 0 ${item.borderRadius !== undefined ? item.borderRadius : 40}px`,
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
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "13px",
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
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.45)",
                  borderRadius: `${item.buttonBorderRadius !== undefined ? item.buttonBorderRadius : 20}px`,
                  padding: "6px 16px",
                  fontSize: "12px",
                  textDecoration: "none",
                  fontWeight: "500",
                  letterSpacing: "0.2px",
                }}
              >
                {item.buttonText || "Xem hoạt động →"}
              </a>
            </div>
          ))}
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

  const getBgStyle = () => {
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
        background: `linear-gradient(${background.direction || "135deg"}, ${background.fromColor || "#e8edf8"}, ${background.toColor || "#d0d8f0"})`,
        opacity,
      };
    }
    return { backgroundColor: background.color || "#f0f4ff", opacity };
  };

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
        ...getBgStyle(),
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

          return (
            <div
              key={colIdx}
              className="sh-org-card"
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "32px",
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
                          borderBottom: mIdx < visibleMembers.length - 1 ? "1px solid #f0f4f8" : "none",
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
                            <p style={{ fontSize: "13px", color: "#333", marginBottom: "4px" }}>
                              <b style={{ color: "#1a237e" }}>Họ tên:</b> {member.name}
                            </p>
                          )}
                          {member.clbRole && (
                            <p style={{ fontSize: "13px", color: "#333", marginBottom: "4px" }}>
                              <b style={{ color: "#1a237e" }}>Chức vụ CLB:</b> {member.clbRole}
                            </p>
                          )}
                          {member.bizRole && (
                            <p style={{ fontSize: "13px", color: "#333", marginBottom: "4px" }}>
                              <b style={{ color: "#1a237e" }}>Chức vụ Doanh nghiệp:</b> {member.bizRole}
                            </p>
                          )}
                          {member.company && (
                            <p style={{ fontSize: "13px", color: "#333" }}>
                              <b style={{ color: "#1a237e" }}>Doanh nghiệp:</b> {member.company}
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
        background: {
          type: "object",
          label: "Nền banner",
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
            color: { type: "text", label: "Màu nền", default: "#1a237e" },
            fromColor: { type: "text", label: "Gradient từ", default: "#667eea" },
            toColor: { type: "text", label: "Gradient đến", default: "#764ba2" },
            direction: { type: "text", label: "Hướng gradient", default: "135deg" },
            imageUrl: { type: "text", label: "URL ảnh nền" },
            opacity: { type: "number", label: "Độ mờ", min: 0, max: 1, step: 0.1, default: 1 },
          },
        },
        cardPosition: {
          type: "select",
          label: "Vị trí cụm nội dung",
          options: [
            { label: "Bên trái", value: "left" },
            { label: "Giữa", value: "center" },
            { label: "Bên phải", value: "right" },
          ],
        },
        cardBorderRadius: {
          type: "number",
          label: "Bo góc thẻ nội dung (px)",
          min: 0,
          max: 60,
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
          },
        },
      },
      defaultProps: {
        background: { type: "image", imageUrl: "", color: "#1a237e" },
        cardPosition: "left",
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
        },
      },
      render: (props) => <AdminHeroBanner {...props} />,
    },

    BanChuyenMon: {
      label: "Các Ban Chuyên Môn",
      fields: {
        background: {
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
            color: { type: "text", label: "Màu nền", default: "#e8edf5" },
            fromColor: { type: "text", label: "Gradient từ", default: "#c5cae9" },
            toColor: { type: "text", label: "Gradient đến", default: "#90caf9" },
            direction: { type: "text", label: "Hướng gradient", default: "135deg" },
            imageUrl: { type: "text", label: "URL ảnh nền" },
            opacity: { type: "number", label: "Độ mờ", min: 0, max: 1, step: 0.1, default: 1 },
          },
        },
        title: { type: "text", label: "Tiêu đề chính", contentEditable: true },
        subtitle: { type: "text", label: "Tiêu đề phụ", contentEditable: true },
        items: {
          type: "array",
          label: "Danh sách ban (5–7 cục)",
          arrayFields: {
            iconUrl: { type: "text", label: "URL icon / hình ảnh" },
            title: { type: "text", label: "Tên ban", contentEditable: true },
            borderRadius: {
              type: "number",
              label: "Độ cong bo lá (px)",
              min: 0,
              max: 80,
            },
            buttonText: {
              type: "text",
              label: "Chữ nút",
              contentEditable: true,
            },
            buttonUrl: { type: "text", label: "URL nút" },
            buttonBorderRadius: {
              type: "number",
              label: "Bo góc nút (px)",
              min: 0,
              max: 40,
            },
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
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBorderRadius: 20,
          },
          {
            iconUrl: "",
            title: "Ban Văn hóa – Thể thao",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBorderRadius: 20,
          },
          {
            iconUrl: "",
            title: "Ban Xã hội – Cộng đồng",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBorderRadius: 20,
          },
          {
            iconUrl: "",
            title: "Ban Khởi nghiệp",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBorderRadius: 20,
          },
          {
            iconUrl: "",
            title: "Ban Giao thương quốc tế",
            borderRadius: 40,
            buttonText: "Xem hoạt động →",
            buttonUrl: "#",
            buttonBorderRadius: 20,
          },
        ],
      },
      render: (props) => <AdminBanChuyenMon {...props} />,
    },

    AboutOrg: {
      label: "Về CLB & Cơ Cấu Tổ Chức",
      fields: {
        background: {
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
            color: { type: "text", label: "Màu nền", default: "#f0f4ff" },
            fromColor: { type: "text", label: "Gradient từ", default: "#e8edf8" },
            toColor: { type: "text", label: "Gradient đến", default: "#d0d8f0" },
            direction: { type: "text", label: "Hướng gradient", default: "135deg" },
            imageUrl: { type: "text", label: "URL ảnh nền" },
            opacity: { type: "number", label: "Độ mờ", min: 0, max: 1, step: 0.1, default: 1 },
          },
        },
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
  },

  // Sidebar categories
  categoryGroups: [
    { title: "Cơ bản", components: ["Heading", "Text", "Image"] },
    { title: "Layout", components: ["Section"] },
    { title: "Nâng cao", components: ["Hero"] },
    {
      title: "CLB – Sen Hồng",
      components: ["HeroBanner", "BanChuyenMon", "AboutOrg"],
    },
  ],

  // Root config
  root: {
    render: ({ children }) => <div className="min-h-screen">{children}</div>,
  },
};

export default puckConfig;
