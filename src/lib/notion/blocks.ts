/**
 * Notion 블록 조회 함수 (F007)
 * @notionhq/client 설치 및 client.ts 설정 후 구현 예정
 */

import type { NotionBlock } from '@/types/notion'

/**
 * Notion 페이지의 블록 목록 조회
 * @param pageId - Notion 페이지 ID
 * @returns NotionBlock 배열
 */
export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  // TODO: notionClient.blocks.children.list() 구현
  // - 지원 블록 타입: paragraph, heading_1~3, code, image,
  //   bulleted_list_item, numbered_list_item, quote, divider
  // - Notion API 응답을 NotionBlock 타입으로 변환(매핑)
  void pageId
  return []
}

/**
 * About 페이지 블록 조회 (NOTION_ABOUT_PAGE_ID 사용)
 * @returns NotionBlock 배열
 */
export async function getAboutBlocks(): Promise<NotionBlock[]> {
  // TODO: process.env.NOTION_ABOUT_PAGE_ID로 getPageBlocks 호출
  return []
}
