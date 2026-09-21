import { useEffect } from "react";

const SITE_URL = "https://motadaka.com";
const SOCIAL_IMAGE = `${SITE_URL}/motadaka-social-preview.png`;

export const personEntity = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Snigdha Motadaka",
  alternateName: ["snieaks", "Snieaks"],
  url: SITE_URL,
  image: `${SITE_URL}/motadaka-icon.png`,
  jobTitle: "AI Systems Architect",
  description:
    "AI systems architect, cybersecurity researcher, AI governance practitioner, and multidisciplinary digital artist.",
  mainEntityOfPage: `${SITE_URL}/`,
  sameAs: [
    "https://www.linkedin.com/in/motadaka",
    "https://github.com/snigui",
    "https://scholar.google.com/citations?hl=en&user=d2B5jccAAAAJ",
    "https://www.youtube.com/@snieaks",
    "https://www.instagram.com/snieaks",
    "https://open.spotify.com/artist/06mzs8F4CeZb90aS788tYl",
  ],
  knowsAbout: [
    "Systems Architecture",
    "Cybersecurity",
    "AI Governance",
    "Technology Strategy",
    "Regulatory Data Integrity",
    "Digital Art",
    "Music Production",
  ],
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Snigdha Motadaka",
  publisher: { "@id": `${SITE_URL}/#person` },
};

type RouteSeoProps = {
  title: string;
  description: string;
  path: string;
  pageSchema?: Record<string, unknown>[];
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function RouteSeo({ title, description, path, pageSchema = [] }: RouteSeoProps) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path}`;
    document.title = title;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:image"]', "property", "og:image", SOCIAL_IMAGE);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", SOCIAL_IMAGE);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let schema = document.head.querySelector<HTMLScriptElement>("#motadaka-entity-graph");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "motadaka-entity-graph";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [personEntity, websiteEntity, ...pageSchema],
    });
  }, [description, pageSchema, path, title]);

  return null;
}
