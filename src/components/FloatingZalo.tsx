"use client"
import Image from "next/image"

const ZALO_PHONE = "0905246473" // có thể chuyển sang ENV: process.env.NEXT_PUBLIC_ZALO_PHONE

export default function FloatingZalo() {
  const zaloHref = `https://zalo.me/${ZALO_PHONE}` // hoạt động tốt cả mobile & desktop

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ripple */}
      <span className="absolute inset-0 -z-10 rounded-full bg-cyan-500/40 blur-xl animate-ping" />
      <a
        href={zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 shadow-lg ring-1 ring-white/20
                   hover:scale-105 active:scale-95 transition"
      >
        <Image src="/icons/zalo.png" alt="Zalo" width={35} height={35} priority />
      </a>
    </div>
  )
}
