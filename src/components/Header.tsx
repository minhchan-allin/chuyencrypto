"use client"
import { useEffect, useState } from "react"

const links = [
  { id: "thong-tin", label: "Thông tin" },
  { id: "dang-ky", label: "Đăng ký" },
  { id: "doi-ngu", label: "Đội ngũ" },
  { id: "tu-van", label: "Tư vấn" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 transition ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2">
          {/* <img src="/logo.png" alt="Chuyện Crypto" className="h-8 w-8" /> */}
  <span className="text-lg font-semibold">Chuyện Crypto</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm text-slate-200 hover:text-white transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <a
            href="#dang-ky"
            className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-amber-400"
          >
            Đăng ký
          </a>
        </div>
      </div>
    </header>
  )
}
