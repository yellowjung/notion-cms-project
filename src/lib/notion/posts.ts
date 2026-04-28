/**
 * Notion Posts DB 쿼리 함수 (F004, F005)
 * @notionhq/client 설치 및 client.ts 설정 후 구현 예정
 */

import type { NotionPost } from '@/types/notion'

/**
 * Published 상태의 게시글 전체 목록 조회
 * @returns NotionPost 배열 (publishedAt 최신순 정렬)
 */
export async function getPosts(): Promise<NotionPost[]> {
  // TODO: notionClient.databases.query() 구현
  // - filter: published === true
  // - sorts: publishedAt 내림차순
  return []
}

/**
 * 최근 게시글 N개 조회 (홈 페이지용)
 * @param count - 조회할 게시글 수 (기본값: 3)
 * @returns NotionPost 배열
 */
export async function getRecentPosts(count = 3): Promise<NotionPost[]> {
  // TODO: getPosts() 결과에서 앞 N개 반환
  void count
  return []
}

/**
 * slug로 단일 게시글 조회
 * @param slug - 게시글 URL 식별자
 * @returns NotionPost 또는 null
 */
export async function getPostBySlug(slug: string): Promise<NotionPost | null> {
  // TODO: notionClient.databases.query()로 slug 필터 조회
  void slug
  return null
}
