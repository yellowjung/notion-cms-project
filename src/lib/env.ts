import { z } from 'zod'

/**
 * 환경 변수 스키마 검증
 * Zod를 사용하여 런타임에 환경 변수 유효성 검사
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // ── Notion CMS 설정 ──────────────────────────────────
  /** Notion Integration 시크릿 토큰 */
  NOTION_TOKEN: z.string().optional(),
  /** Notion Projects 데이터베이스 ID */
  NOTION_PROJECTS_DB_ID: z.string().optional(),
  /** Notion Posts 데이터베이스 ID */
  NOTION_POSTS_DB_ID: z.string().optional(),
  /** Notion About 페이지 ID */
  NOTION_ABOUT_PAGE_ID: z.string().optional(),

  // ── 앱 URL ───────────────────────────────────────────
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
  NOTION_PROJECTS_DB_ID: process.env.NOTION_PROJECTS_DB_ID,
  NOTION_POSTS_DB_ID: process.env.NOTION_POSTS_DB_ID,
  NOTION_ABOUT_PAGE_ID: process.env.NOTION_ABOUT_PAGE_ID,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

export type Env = z.infer<typeof envSchema>
