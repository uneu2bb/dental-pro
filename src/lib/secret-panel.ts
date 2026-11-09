const STORAGE_KEY = "dental_pro_secret_panel_pw";
const UNLOCK_KEY = "dental_pro_secret_unlocked";
const DEFAULT_PASSWORD = "0000";

export function getPanelPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_PASSWORD;
}

export function setPanelPassword(next: string): void {
  localStorage.setItem(STORAGE_KEY, next);
}

export function isPanelUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(UNLOCK_KEY) === "1";
}

export function unlockPanel(): void {
  sessionStorage.setItem(UNLOCK_KEY, "1");
}

export function lockPanel(): void {
  sessionStorage.removeItem(UNLOCK_KEY);
}

export function verifyPanelPassword(input: string): boolean {
  return input === getPanelPassword();
}
