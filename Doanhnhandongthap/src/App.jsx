import { useState } from "react";
import { Puck, Render } from "@measured/puck";
import "@measured/puck/puck.css";

// Import file cấu hình chứa các component kéo thả của bạn
import config from "./blocks/admin-puck-config";

// Khởi tạo dữ liệu trang trắng ban đầu
const initialData = {
  content: [],
  root: {},
};

function App() {
  // Lấy dữ liệu đã lưu từ localStorage nếu có, nếu không thì dùng dữ liệu trắng ban đầu
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("puck-page-data");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [isEditing, setIsEditing] = useState(true);

  // Hàm xử lý khi người dùng bấm nút "Publish" trên giao diện
  const handlePublish = (newData) => {
    setData(newData);
    localStorage.setItem("puck-page-data", JSON.stringify(newData));
    alert("Đã lưu và xuất bản giao diện thành công! Bạn có thể nhấn nút 'Xem trang web' màu xanh lam ở góc trên để xem kết quả.");
  };

  return (
    <div className="h-screen w-full relative">
      {/* Nút chuyển đổi chế độ Chỉnh sửa / Xem trang web */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="fixed top-[12px] right-[180px] z-[9999] px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
        style={{
          background: isEditing 
            ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" 
            : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "#ffffff",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 6px 15px rgba(37, 99, 235, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
      >
        {isEditing ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem trang web
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Quay lại chỉnh sửa
          </>
        )}
      </button>

      {isEditing ? (
        <Puck config={config} data={data} onPublish={handlePublish} />
      ) : (
        <div className="w-full min-h-screen bg-white">
          <Render config={config} data={data} />
        </div>
      )}
    </div>
  );
}

export default App;
