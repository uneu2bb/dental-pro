import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date, locale = "ar-SY") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date, locale = "ar-SY") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const UPPER_RIGHT = [18, 17, 16, 15, 14, 13, 12, 11];
export const UPPER_LEFT = [21, 22, 23, 24, 25, 26, 27, 28];
export const LOWER_LEFT = [31, 32, 33, 34, 35, 36, 37, 38];
export const LOWER_RIGHT = [48, 47, 46, 45, 44, 43, 42, 41];

export const TOOTH_CONDITIONS: Record<string, { label_ar: string; color: string }> = {
  healthy: { label_ar: "سليم", color: "#22c55e" },
  decay: { label_ar: "تسوس", color: "#ef4444" },
  filled: { label_ar: "حشوة", color: "#3b82f6" },
  crown: { label_ar: "تاج", color: "#a855f7" },
  root_canal: { label_ar: "علاج عصب", color: "#f59e0b" },
  missing: { label_ar: "مفقود", color: "#6b7280" },
  implant: { label_ar: "زراعة", color: "#14b8a6" },
  bridge: { label_ar: "جسر", color: "#8b5cf6" },
  extraction_needed: { label_ar: "يحتاج خلع", color: "#dc2626" },
  fractured: { label_ar: "مكسور", color: "#ea580c" },
  impacted: { label_ar: "مطمور", color: "#ca8a04" },
  other: { label_ar: "أخرى", color: "#64748b" },
};

export const APPOINTMENT_STATUS: Record<string, { label_ar: string; color: string }> = {
  pending: { label_ar: "قيد الانتظار", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  confirmed: { label_ar: "مؤكد", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  arrived: { label_ar: "وصل", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" },
  in_progress: { label_ar: "جاري العلاج", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  completed: { label_ar: "مكتمل", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  cancelled: { label_ar: "ملغى", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  no_show: { label_ar: "لم يحضر", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
};

export const TREATMENT_CATEGORIES: Record<string, string> = {
  consultation: "فحص واستشارة",
  cleaning: "تنظيف الأسنان",
  whitening: "تبييض الأسنان",
  filling: "حشوات",
  root_canal: "علاج العصب",
  extraction: "خلع الأسنان",
  implant: "زراعة الأسنان",
  orthodontics: "تقويم الأسنان",
  crown_bridge: "تيجان وجسور",
  periodontics: "علاج اللثة",
  surgery: "جراحة الفم",
  pediatric: "طب أسنان الأطفال",
  other: "خدمات أخرى",
};
