import type { Metadata } from "next"
import "./globals.css"
import FloatingZalo from "@/components/FloatingZalo"

export const metadata: Metadata = {
  title: "Chuyện Crypto",
  description: "Cộng đồng học hỏi, chia sẻ – thị trường Crypto Việt Nam",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
        <FloatingZalo />
      </body>
    </html>
  )
}
