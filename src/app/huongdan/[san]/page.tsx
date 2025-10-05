// src/app/huongdan/[san]/page.tsx
import Link from "next/link"
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
  steps: { title: string; desc: string }[]
  video?: { type: "youtube" | "file"; src: string; note?: string }
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
            <div className="flex items-start justify-between gap-3">
              <div className="pr-3">
                <p className="font-semibold">{st.title}</p>
                <p className="text-sm text-slate-300">{st.desc}</p>
              </div>

              {/* Chỉ hiện ở Cách 1 - Bước 1 và khi có refUrl */}
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

      {/* Video nếu có */}
      {s.video?.type === "youtube" && (
        <iframe
          className="mt-4 h-96 w-full rounded-lg"
          src={s.video.src}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {s.video?.type === "file" && (
        <video controls className="mt-4 h-96 w-full rounded-lg">
          <source src={s.video.src} type="video/mp4" />
          Trình duyệt không hỗ trợ video.
        </video>
      )}
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
        video: { type: "youtube", src: "https://www.youtube.com/embed/7HYuaAtsg-A?si=67NnykiUZgGulfEN" },
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
        video: { type: "youtube", src: "https://www.youtube.com/embed/oTjbE_j88g8?si=yWGNOmU0LwDd6PQb" },
      },
      {
        heading: "Cách 3: Nạp tiền qua P2P",
        steps: [
          { title: "Chọn phương thức", desc: "P2P (VND), hoặc chuyển khoản đối tác." },
          { title: "Chọn người bán hợp lí", desc: "Phải có lệnh thành công cao, đánh giá tốt từ cộng đồng,..." },
          { title: "Chuyển khoản và Xác nhận lệnh", desc: "Nội dung chuyển phải là số lệnh và đúng số tiền cần mua" },
          { title: "Kiểm tra số dư", desc: "Sau khi vào ví, kiểm tra ở Wallet" },
        ],
        video: { type: "youtube", src: "https://www.youtube.com/embed/gXJGYlYgHWI?si=SYt_FUztqgAoR9n_" },
      },
      {
        heading: "Cách 4: Xóa tài khoản Binance",
        steps: [
          { title: "Chọn cài đặt", desc: "Trong phần tài khoản" },
          { title: "Chọn Security", desc: "Kéo xuống kiếm Manage Account" },
          { title: "Chọn Delete Account", desc: "Chọn No longer want to use this account" },
          { title: "Lưu ý", desc: "Không còn để lệnh limit Future và tổng tài sản dưới 5$" },
        ],
        video: { type: "youtube", src: "https://www.youtube.com/embed/yiCztfJVNag?si=EFLV-imyyagU8Wgz" },
      },
    ],
  },

  // Bybit
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
          { title: "Xác minh OTP", desc: "Nhập mã xác thực gửi về mail." },
          { title: "Đồng ý điều khoản", desc: "Đọc kỹ và xác nhận." },
          { title: "Đăng nhập lần đầu", desc: "Hoàn tất tạo tài khoản và đăng nhập." },
        ],
        video: { type: "youtube", src: "https://www.youtube.com/embed/MaKZlQPhOxQ?si=9U2dSz09TvoEoARb" },
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
        video: { type: "youtube", src: "https://www.youtube.com/embed/gHaz9d2DaWk?si=3k3B32Nxu1kV6fDk" },
      },
      {
        heading: "Cách 3: Hướng dẫn chuyển USDT từ Binance sang Bybit",
        steps: [
          { title: "Chuyển tiền vào ví Spot Binance", desc: "" },
          { title: "Chọn mạng để rút", desc: "Lưu ý mạng của 2 sàn phải giống nhau" },
          { title: "Lưu ảnh địa chỉ ví của sàn cần nạp", desc: "Trường hợp này đơn giản nhất" },
          { title: "Kiểm tra trên chuỗi", desc: "Chờ tiền vào ví" },
          { title: "Lưu ý", desc: "Hãy xem toàn bộ Video rồi thực hành" },
        ],
        video: { type: "youtube", src: "https://www.youtube.com/embed/tehF6rHUEsQ?si=86FrZgiqn1TeQ1eX" },
      },
      {
        heading: "Cách 4: Nạp tiền qua P2P",
        steps: [
          { title: "Lưu ý", desc: "Nội dung chuyển khoản phải đúng với số lệnh" },
        ],
        video: { type: "youtube", src: "https://www.youtube.com/embed/6sodJFFvncQ?si=8-6Yn9vu0KX3qRth" },
      },
    ],
  },
}

/* --------- Page --------- */
export default async function Page(
  { params }: { params: Promise<{ san: string }> } // 🔧 Next 15: params là Promise
) {
  const { san } = await params;                    // ✅ phải await
  const key = san?.toLowerCase();
  const guide = GUIDES[key];
  const refUrl = REF_LINKS[key];

  if (!guide) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">← Về trang chủ</Link>
        <h1 className="mt-3 text-3xl font-bold">Không tìm thấy hướng dẫn cho: {san}</h1>
        <p className="mt-2 text-slate-300">Hãy kiểm tra lại đường dẫn.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">← Về trang chủ</Link>
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
        <SectionBlock key={i} s={s} index={i} refUrl={refUrl} />
      ))}

      <div className="mt-10 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-400">
        Lưu ý: Crypto là tài sản rủi ro cao. Giao dịch có trách nhiệm.
      </div>
    </div>
  )

}
