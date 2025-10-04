// src/lib/phone.ts

// Chuẩn hoá: "0905 246 473", "84 905..." → "+84905246473"
export function normalizePhoneVN(input: string): string {
  let p = input.replace(/[\s.\-()]/g, "") // bỏ khoảng trắng / dấu
  // +84...  → giữ nguyên
  if (p.startsWith("+84")) return "+84" + p.slice(3).replace(/^0+/, "")
  // 84...   → thêm +
  if (p.startsWith("84"))  return "+84" + p.slice(2).replace(/^0+/, "")
  // 0...    → bỏ 0, thêm +84
  if (p.startsWith("0"))   return "+84" + p.slice(1)
  // Không có prefix → coi như đang thiếu 0 đầu, thêm +84 trực tiếp
  return "+84" + p
}

// Kiểm tra hợp lệ số di động VN (10 số, đầu 03/05/07/08/09 sau khi giữ "0" local)
export function isValidVNMobileLocal(local: string): boolean {
  const only = local.replace(/[\s.\-()]/g, "")
  // dạng local: 0xxxxxxxxx (10 số)
  if (!/^0\d{9}$/.test(only)) return false
  // Prefix theo quy hoạch đầu số di động hiện hành
  return /^(03|05|07|08|09)/.test(only)
}

// Validate E.164: +84 + 9 số
export function isValidVNMobileE164(e164: string): boolean {
  return /^\+84\d{9}$/.test(e164)
}
