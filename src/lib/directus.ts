import { authentication, createDirectus, readItems, rest } from "@directus/sdk";

const directus = createDirectus("https://openbb-cms.directus.app/")
  .with(rest())
  .with(authentication("json"));

const directusToken = import.meta.env.DIRECTUS_TOKEN;
if (!directusToken) {
  console.warn(
    "[Directus] DIRECTUS_TOKEN is not set — using anonymous CMS access. Content that requires authentication will be skipped.",
  );
}
directus.setToken(directusToken);

export interface DirectusBlogItem {
  authorImgUrl: string;
  authorImgUrl2: string;
  authorImgUrl3: string;
  authorName: string;
  authorName2: string;
  authorName3: string;
  body: string;
  cover: string;
  date_created: string;
  date_updated: string;
  excerpt: string;
  id: string;
  keywords: string[];
  publishDate: string;
  slug: string;
  status: string;
  title: string;
  type: PostType;
  gallery?: {
    directus_files_id: {
      id: string;
      title: string;
      description: string;
    };
  }[];
}

export const WIND_DOWN_SLUG = "openbb-belongs-to-everyone";

export const postTypes = [
  "announcements",
  "company",
  "engineering",
  "academia",
  "collaborations",
] as const;

export type PostType = (typeof postTypes)[number];

export function calculateTimeToRead(body: string, wpm = 200): number {
  if (!body) return 0;
  return Math.ceil(body.split(" ").length / wpm);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getPublishedPosts(): Promise<DirectusBlogItem[]> {
  try {
    const data = await directus.request(
      readItems("Blog", {
        sort: ["-publishDate"],
        limit: -1,
        filter: { status: { _eq: "published" } },
        fields: ["*", "gallery.directus_files_id.*"],
      }),
    );
    return (data as DirectusBlogItem[]) ?? [];
  } catch (error) {
    console.error("[Directus] getPublishedPosts error:", error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
  { includeDrafts = false } = {},
): Promise<DirectusBlogItem | null> {
  try {
    const [item] = await directus.request(
      readItems("Blog", {
        filter: {
          slug: { _eq: slug },
          ...(includeDrafts ? {} : { status: { _eq: "published" } }),
        },
        limit: 1,
      }),
    );
    return (item as DirectusBlogItem) ?? null;
  } catch (error) {
    console.error("[Directus] getPostBySlug error:", error);
    return null;
  }
}

export function directusAssetUrl(id: string): string {
  return `https://openbb-cms.directus.app/assets/${id}`;
}
