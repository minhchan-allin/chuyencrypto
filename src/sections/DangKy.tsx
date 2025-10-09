"use client"
import Image from "next/image"
import Link from "next/link"

export default function DangKy() {
  return (
    <section id="dang-ky" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-8">Đăng ký sàn</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- Binance Card --- */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-lg border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/exchanges/binance.png"
                alt="Binance Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <h3 className="text-lg font-semibold text-white">Binance</h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Binance là sàn giao dịch tiền mã hóa lớn nhất thế giới, hỗ trợ hàng nghìn loại coin và
              dịch vụ tài chính như Spot, Futures, Earn, Launchpad...  
              Giao diện thân thiện, thanh khoản cực cao và phí thấp.
            </p>

            <div className="flex gap-3">
              <a
                href={process.env.NEXT_PUBLIC_REF_BINANCE || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-amber-500 hover:bg-amber-400 transition text-slate-950 font-semibold px-5 py-2"
              >
                Đăng ký
              </a>
              <Link
                href="/huongdan/binance"
                className="rounded-lg border border-white/20 hover:bg-white/10 transition text-white font-semibold px-5 py-2"
              >
                Hướng dẫn
              </Link>
            </div>
          </div>

          {/* --- Bybit Card --- */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-lg border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/exchanges/bybit.png"
                alt="Bybit Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <h3 className="text-lg font-semibold text-white">Bybit</h3>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Bybit là sàn giao dịch phái sinh tiền điện tử hàng đầu, nổi bật với tốc độ xử lý lệnh
              cực nhanh, bảo mật cao và giao diện tối ưu cho trader chuyên nghiệp.  
              Nhiều chương trình thưởng, airdrop và ưu đãi hấp dẫn.
            </p>

            <div className="flex gap-3">
              <a
                href={process.env.NEXT_PUBLIC_REF_BYBIT || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-amber-500 hover:bg-amber-400 transition text-slate-950 font-semibold px-5 py-2"
              >
                Đăng ký
              </a>
              <Link
                href="/huongdan/bybit"
                className="rounded-lg border border-white/20 hover:bg-white/10 transition text-white font-semibold px-5 py-2"
              >
                Hướng dẫn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
