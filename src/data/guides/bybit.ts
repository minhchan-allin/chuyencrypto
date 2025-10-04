import type { Guide } from "@/types/guide"

const bybitGuide: Guide = {
  title: "Hướng dẫn Bybit",
  intro: "Đăng ký, nạp tiền và lưu ý khi giao dịch phái sinh trên Bybit.",
  sections: [
    {
      heading: "Cách 1: Đăng ký tài khoản",
      steps: [
        { title: "Mở link ref", desc: "Nhấn Đăng ký (ref CHUYENCRYPTO)." },
        { title: "Điền thông tin", desc: "Email/SĐT + mật khẩu mạnh." },
        { title: "Xác minh OTP", desc: "Nhập mã gửi về." },
        { title: "KYC cơ bản", desc: "Tăng hạn mức/tính năng." },
        { title: "Bật 2FA", desc: "Google Authenticator/SMS." },
      ],
      video: { type: "file", src: "/videos/bybit-register.mp4" },
    },
    {
      heading: "Cách 2: Nạp tiền",
      steps: [
        { title: "Assets → Deposit", desc: "Chọn tài sản & mạng (USDT TRC20…)" },
        { title: "Copy địa chỉ ví", desc: "Đảm bảo đúng token/memo." },
        { title: "Gửi từ nơi khác", desc: "Theo dõi hash trên explorer." },
        { title: "Kiểm tra số dư", desc: "Spot/Derivatives theo lựa chọn." },
        { title: "Ghi chú phí", desc: "Cân nhắc mạng phí rẻ." },
      ],
      video: { type: "file", src: "/videos/bybit-deposit.mp4" },
    },
    {
      heading: "Cách 3: Lưu ý phái sinh",
      steps: [
        { title: "Đòn bẩy hợp lý", desc: "Bắt đầu nhỏ, quản trị rủi ro." },
        { title: "Đặt SL/TP", desc: "Luôn có stop-loss." },
        { title: "Funding & phí", desc: "Theo dõi funding mỗi 8h." },
        { title: "Isolated vs Cross", desc: "Chọn chế độ phù hợp." },
        { title: "Không overtrade", desc: "Tuân thủ kỷ luật." },
      ],
      video: { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID_3" },
    },
  ],
}

export default bybitGuide
