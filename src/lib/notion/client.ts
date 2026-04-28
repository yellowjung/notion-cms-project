/**
 * Notion API 클라이언트 초기화 (F010)
 * @notionhq/client 설치 후 활성화:
 *   npm install @notionhq/client
 */

// TODO: @notionhq/client 설치 후 아래 코드를 활성화하세요
//
// import { Client } from '@notionhq/client'
//
// export const notionClient = new Client({
//   auth: process.env.NOTION_TOKEN,
// })

/** 환경 변수 검증 — Notion API 연동 전 확인용 */
export function validateNotionEnv() {
  const required = [
    'NOTION_TOKEN',
    'NOTION_PROJECTS_DB_ID',
    'NOTION_POSTS_DB_ID',
    'NOTION_ABOUT_PAGE_ID',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Notion 환경 변수가 설정되지 않았습니다: ${missing.join(', ')}`
    )
  }
}
