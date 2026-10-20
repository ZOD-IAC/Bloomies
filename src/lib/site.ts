const configured = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://bloomies-omega.vercel.app",
);
if (!["https:", "http:"].includes(configured.protocol))
  throw new Error("NEXT_PUBLIC_SITE_URL must use http or https");
export const SITE_URL = configured.origin;
export const SITE_NAME = "Bloomies by Aadar";
export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).href;
}
