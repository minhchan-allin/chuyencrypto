type Props = { params: { san: string } }

export default function HuongDanPage({ params }: Props) {
  const title = params.san === "binance" ? "Hướng dẫn Binance" :
                params.san === "bybit" ? "Hướng dẫn Bybit" :
                `Hướng dẫn ${params.san}`

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-slate-300">
        Trang hướng dẫn đang được cập nhật. (Bạn có thể thêm nội dung chi tiết: cách đăng ký, KYC, bảo mật 2FA…)
      </p>
    </div>
  )
}
