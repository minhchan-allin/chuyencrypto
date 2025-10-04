// src/app/huongdan/[san]/page.tsx

// Map ref theo sàn => đọc trực tiếp từ ENV
const REF_LINKS: Record<string, string | undefined> = {
  binance: process.env.REF_BINANCE,
  bybit: process.env.REF_BYBIT,
  // sau này thêm okx: process.env.REF_OKX, ...
}


type Step = { title: string; desc: string }
type VideoSpec =
  | { type: "file"; src: string; note?: string }
  | { type: "youtube"; src: string; note?: string }

type Section = {
  heading: string
  steps: Step[]
  video?: VideoSpec
}

type Guide = {
  title: string
  intro: string
  sections: Section[] // Binance có 5, Bybit có 3 — tuỳ ý
}

/* --------- Video component --------- */
function Video({ video }: { video?: VideoSpec }) {
  if (!video) return null
  if (video.type === "youtube") {
    return (
      <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-white/10">
        <iframe
          className="h-full w-full"
          src={video.src}
          title="Video hướng dẫn"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
      <video controls className="w-full">
        <source src={video.src} />
      </video>
      {video.note && <p className="mt-2 text-xs text-slate-400">{video.note}</p>}
    </div>
  )
}

function SectionBlock({
  s,
  index,
  refUrl,
}: {
  s: Section
  index: number
  refUrl?: string
}) {
  return (
    <section id={`cach-${index + 1}`} className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-6">
      <h2 className="text-xl font-bold">{s.heading}</h2>

      <ol className="mt-4 space-y-3">
        {s.steps.map((st, i) => (
          <li key={i} className="rounded-xl border border-white/10 p-4">
            {/* Nếu là bước đầu tiên (Mở link ref) thì hiển thị nút Đăng ký bên phải */}
            <div className="flex items-start justify-between gap-3">
              <div className="pr-3">
                <p className="font-semibold">{st.title}</p>
                <p className="text-sm text-slate-300">{st.desc}</p>
              </div>

              {/* Nút "Đăng ký" chỉ hiện ở BƯỚC 1 của CÁCH 1 (tùy bạn muốn) */}
              {index === 0 && i === 0 && refUrl && (
                <a
                  href={refUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 whitespace-nowrap rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400 transition"
                >
                  Đăng ký
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <Video video={s.video} />
    </section>
  )
}


/* --------- Dữ liệu hướng dẫn --------- */
const GUIDES: Record<string, Guide> = {
  binance: {
    title: "Hướng dẫn Binance",
    intro:
      "Các bước đăng ký, KYC, bảo mật và nạp tiền trên Binance. Khuyến nghị bật 2FA và xác minh danh tính (KYC) để bảo mật và mở đầy đủ tính năng.",
    sections: [
      {
        heading: "Cách 1: Đăng ký tài khoản",
        steps: [
          { title: "Mở link ref", desc: "Nhấn nút Đăng ký ở trang chủ để mở link ref CHUYENCRYPTO." },
          { title: "Chọn phương thức", desc: "Đăng ký bằng email hoặc số điện thoại, đặt mật khẩu đủ mạnh." },
          { title: "Xác minh email/OTP", desc: "Nhập mã xác thực gửi về email/điện thoại." },
          { title: "Đồng ý điều khoản", desc: "Đọc kỹ TOS và xác nhận." },
          { title: "Đăng nhập lần đầu", desc: "Hoàn tất tạo tài khoản và đăng nhập." },
        ],
        // video: { type: "file", src: "/videos/binance-register.mp4", note: "Đặt file vào public/videos/binance-register.mp4" },
        video: { type: "youtube", src: "https://www.youtube.com/embed/n20sFivqyug?si=bdqbT7NUrikLeazP" },
      },
      {
        heading: "Cách 2: KYC tài khoản",
        steps: [
          { title: "Vào Profile → Identification", desc: "Chọn Begin Verification." },
          { title: "Tải giấy tờ", desc: "CMND/CCCD/Hộ chiếu còn hạn." },
          { title: "Xác thực khuôn mặt", desc: "Làm theo hướng dẫn trên màn hình." },
          { title: "Chờ duyệt", desc: "Vài phút tới vài giờ." },
          { title: "Kiểm tra trạng thái", desc: "Khi KYC Passed, tính năng được mở rộng." },
        ],
      },
      {
        heading: "Cách 3: Bật bảo mật 2FA",
        steps: [
          { title: "Vào Security", desc: "Bật Google Authenticator/SMS 2FA." },
          { title: "Lưu khoá khôi phục", desc: "Cất giữ secret key/backup codes cẩn thận." },
          { title: "Anti-phishing code", desc: "Thiết lập mã để nhận diện email chính chủ Binance." },
          { title: "Whitelist rút tiền", desc: "Chỉ cho phép địa chỉ ví tin cậy." },
          { title: "Rà soát đăng nhập", desc: "Sign out phiên lạ nếu có." },
        ],
      },
      {
        heading: "Cách 4: Nạp tiền",
        steps: [
          { title: "Chọn phương thức", desc: "P2P (VND), on-chain (USDT/USDC/BTC/ETH…), hoặc chuyển khoản đối tác." },
          { title: "Chọn mạng đúng", desc: "USDT có ERC20/TRC20/BSC… phải trùng với bên gửi." },
          { title: "Sao chép địa chỉ ví", desc: "Đúng token/memo (nếu có) trước khi gửi." },
          { title: "Xác nhận lệnh", desc: "Kiểm tra phí và thời gian xử lý." },
          { title: "Kiểm tra số dư", desc: "Sau khi vào ví, kiểm tra ở Wallet → Spot." },
        ],
        video: { type: "file", src: "/videos/binance-deposit.mp4", note: "Đặt file vào public/videos/binance-deposit.mp4" },
      },
      {
        heading: "Cách 5: Giao dịch cơ bản",
        steps: [
          { title: "Chọn chế độ", desc: "Convert (đơn giản) hoặc Spot (đầy đủ lệnh)." },
          { title: "Chọn cặp", desc: "Ví dụ BTC/USDT." },
          { title: "Đặt lệnh", desc: "Market/Limit tuỳ nhu cầu." },
          { title: "Theo dõi lịch sử", desc: "Order History / Trade History." },
          { title: "Rút tiền", desc: "Chọn mạng và phí phù hợp trước khi rút." },
        ],
        video: { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID_BINANCE_TRADE" },
      },
    ],
  },
  bybit: {
    title: "Hướng dẫn Bybit",
    intro:
      "Các bước đăng ký, nạp tiền và lưu ý giao dịch phái sinh trên Bybit. Luôn quản trị rủi ro khi dùng đòn bẩy.",
    sections: [
      {
        heading: "Cách 1: Đăng ký tài khoản",
        steps: [
          { title: "Mở link ref", desc: "Nhấn nút Đăng ký (ref CHUYENCRYPTO) ở trang chủ." },
          { title: "Nhập thông tin", desc: "Email/SĐT, mật khẩu mạnh." },
          { title: "Xác minh OTP", desc: "Nhập mã xác thực gửi về." },
          { title: "KYC", desc: "Thực hiện xác minh danh tính để mở tính năng." },
          { title: "Bật 2FA", desc: "Bật Google Authenticator/SMS." },
        ],
        video: { type: "file", src: "/videos/bybit-register.mp4", note: "Đặt file vào public/videos/bybit-register.mp4" },
      },
      {
        heading: "Cách 2: Nạp tiền",
        steps: [
          { title: "Assets → Deposit", desc: "Chọn tài sản và mạng (ví dụ USDT TRC20 phí rẻ)." },
          { title: "Copy địa chỉ ví", desc: "Đúng token/memo nếu yêu cầu." },
          { title: "Gửi từ ví/sàn khác", desc: "Theo dõi hash trên explorer." },
          { title: "Chờ xác nhận", desc: "On-chain xong sẽ thấy số dư." },
          { title: "Kiểm tra ví", desc: "Spot/Derivatives theo lựa chọn của bạn." },
        ],
        video: { type: "file", src: "/videos/bybit-deposit.mp4", note: "Đặt file vào public/videos/bybit-deposit.mp4" },
      },
      {
        heading: "Cách 3: Lưu ý phái sinh",
        steps: [
          { title: "Chọn chế độ ký quỹ", desc: "Isolated để giới hạn rủi ro từng lệnh; Cross cho người có kinh nghiệm." },
          { title: "Đòn bẩy hợp lý", desc: "Bắt đầu nhỏ; tránh over-leverage." },
          { title: "Đặt SL/TP", desc: "Luôn có stop-loss để bảo vệ tài khoản." },
          { title: "Funding & phí", desc: "Theo dõi funding mỗi 8h; chú ý phí giao dịch." },
          { title: "Kỷ luật giao dịch", desc: "Không FOMO, có kế hoạch quản trị vốn." },
        ],
        video: { type: "youtube", src: "https://www.youtube.com/embed/VIDEO_ID_BYBIT_DERI" },
      },
    ],
  },
}

/* --------- Page --------- */
export default function Page({ params }: { params: { san: string } }) {
  const key = params.san?.toLowerCase()
  const guide = GUIDES[key]
  const refUrl = REF_LINKS[key]


  if (!guide) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <a href="/" className="text-sm text-slate-400 hover:text-slate-200">← Về trang chủ</a>
        <h1 className="mt-3 text-3xl font-bold">Không tìm thấy hướng dẫn cho: {params.san}</h1>
        <p className="mt-2 text-slate-300">Hãy kiểm tra lại đường dẫn.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <a href="/" className="text-sm text-slate-400 hover:text-slate-200">← Về trang chủ</a>
      <h1 className="mt-3 text-3xl font-bold">{guide.title}</h1>
      <p className="mt-2 text-slate-300">{guide.intro}</p>

      {/* Mục lục nhanh */}
      <nav className="mt-6 flex flex-wrap gap-2">
        {guide.sections.map((s, i) => (
          <a key={i} href={`#cach-${i + 1}`} className="rounded-lg border border-white/10 px-3 py-1 text-sm text-slate-200 hover:bg-white/5">
            {s.heading}
          </a>
        ))}
      </nav>

      {guide.sections.map((s, i) => (
        <SectionBlock key={i} s={s} index={i} />
      ))}

      <div className="mt-10 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-400">
        Lưu ý: Crypto là tài sản rủi ro cao. Giao dịch có trách nhiệm.
      </div>
    </div>
  )

   return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* ... title, intro, toc ... */}
      {guide.sections.map((s, i) => (
        <SectionBlock key={i} s={s} index={i} refUrl={refUrl} />
      ))}
    </div>
  )

}
