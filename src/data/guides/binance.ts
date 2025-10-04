import type { Guide } from "@/types/guide"

const binanceGuide: Guide = {
  title: "Hướng dẫn Binance",
  intro: "Quy trình đăng ký, KYC, nạp tiền và thiết lập bảo mật trên Binance.",
  sections: [
    {
      heading: "Cách 1: Đăng ký tài khoản",
      steps: [
        { title: "Mở link ref", desc: "Nhấp nút Đăng ký (ref CHUYENCRYPTO) ở trang chủ." },
        { title: "Điền thông tin", desc: "Email/SĐT, mật khẩu mạnh." },
        { title: "Xác minh OTP", desc: "Nhập mã xác thực gửi về." },
        { title: "Đồng ý điều khoản", desc: "Đọc kỹ TOS, xác nhận." },
        { title: "Đăng nhập lần đầu", desc: "Hoàn tất tạo tài khoản." },
      ],
      video: { type: "file", src: "/videos/binance-register.mp4" },
    },
    {
      heading: "Cách 2: KYC tài khoản",
      steps: [
        { title: "Vào Profile → Identification", desc: "Chọn Begin Verification." },
        { title: "Tải giấy tờ", desc: "CMND/CCCD/Hộ chiếu còn hạn." },
        { title: "Selfie/Face ID", desc: "Thực hiện theo hướng dẫn." },
        { title: "Chờ duyệt", desc: "Thường vài phút tới vài giờ." },
        { title: "Kiểm tra trạng thái", desc: "KYC Passed là xong." },
      ],
      video: { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID_1" },
    },
    {
      heading: "Cách 3: Bật bảo mật 2FA",
      steps: [
        { title: "Vào Security", desc: "Bật Google Authenticator/SMS." },
        { title: "Lưu khóa khôi phục", desc: "Cất nơi an toàn." },
        { title: "Thiết lập Anti-phishing", desc: "Tạo mã chống giả mạo email." },
        { title: "Whitelist rút tiền", desc: "Chỉ cho phép địa chỉ tin cậy." },
        { title: "Kiểm tra đăng nhập", desc: "Tắt sessions lạ." },
      ],
    },
    {
      heading: "Cách 4: Nạp tiền",
      steps: [
        { title: "Chọn phương thức", desc: "P2P (VND) hoặc on-chain USDT/USDC…" },
        { title: "Chọn mạng", desc: "TRC20/BSC/ETH… khớp với bên gửi." },
        { title: "Sao chép địa chỉ ví", desc: "Đúng token/memo (nếu có)." },
        { title: "Thực hiện chuyển", desc: "Xác nhận phí, thời gian." },
        { title: "Kiểm tra số dư", desc: "Vào Wallet → Spot." },
      ],
      video: { type: "file", src: "/videos/binance-deposit.mp4" },
    },
    {
      heading: "Cách 5: Mua/Bán cơ bản",
      steps: [
        { title: "Vào Trade", desc: "Chọn Convert/Spot." },
        { title: "Chọn cặp", desc: "VD: BTC/USDT." },
        { title: "Đặt lệnh", desc: "Market/Limit phù hợp." },
        { title: "Xem lịch sử", desc: "Order History/Trade History." },
        { title: "Rút tiền", desc: "Kiểm tra phí & mạng trước khi rút." },
      ],
      video: { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID_2" },
    },
  ],
}

export default binanceGuide
