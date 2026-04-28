/**
 * Notion Projects DB 쿼리 함수 (F001, F003, F009)
 * @notionhq/client 설치 및 client.ts 설정 후 구현 예정
 */

import type { NotionProject } from '@/types/notion'

/**
 * Published 상태의 프로젝트 전체 목록 조회
 * @returns NotionProject 배열 (최신순 정렬)
 */
export async function getProjects(): Promise<NotionProject[]> {
  // TODO: notionClient.databases.query() 구현
  // - filter: status === 'Published'
  // - sorts: startDate 내림차순
  return []
}

/**
 * Featured 프로젝트 목록 조회 (홈 페이지용)
 * @returns featured === true 인 NotionProject 배열
 */
export async function getFeaturedProjects(): Promise<NotionProject[]> {
  // TODO: getProjects() 결과에서 featured === true 필터링
  return []
}

/**
 * slug로 단일 프로젝트 조회
 * @param slug - 프로젝트 URL 식별자
 * @returns NotionProject 또는 null
 */
export async function getProjectBySlug(
  slug: string
): Promise<NotionProject | null> {
  // TODO: notionClient.databases.query()로 slug 필터 조회
  void slug
  return null
}
