import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "./site.ts";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  options: { noindex?: boolean; image?: string } = {},
): Metadata {
  const image = absoluteUrl(options.image || "/brand/social-preview.png");
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: !options.noindex, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      images: [
        {
          url: image,
          alt: options.image
            ? title
            : "Bloomies by Aadar — handcrafted gifting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
