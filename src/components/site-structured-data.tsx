import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { business } from "@/lib/business";
import { owner } from "@/data/owner";
export function SiteStructuredData() {
  const org = absoluteUrl("/#organization");
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: SITE_NAME,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/brand/mark.svg"),
        sameAs: [business.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${business.whatsapp}`,
          contactType: "customer service",
        },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: SITE_NAME,
        publisher: { "@id": org },
      },
      {
        "@type": "Person",
        "@id": absoluteUrl("/about#owner"),
        name: owner.name,
        url: absoluteUrl("/about"),
        image: absoluteUrl(owner.portrait),
        jobTitle: "Owner",
        worksFor: { "@id": org },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
