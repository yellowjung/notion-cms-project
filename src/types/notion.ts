/**
 * Notion CMS 데이터 모델 타입 정의
 * PRD 데이터 모델 섹션 기반
 */

// ───────────────────────────────────────────
// Rich Text (Notion 텍스트 블록 공통 타입)
// ───────────────────────────────────────────

/** Notion Rich Text 어노테이션 (굵기, 기울임 등) */
export interface RichTextAnnotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

/** Notion Rich Text 단일 요소 */
export interface RichText {
  type: 'text' | 'mention' | 'equation'
  plainText: string
  href: string | null
  annotations: RichTextAnnotations
}

// ───────────────────────────────────────────
// NotionBlock (블록 렌더러용)
// ───────────────────────────────────────────

/** Notion 블록 타입 목록 (F007 지원 대상) */
export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'code'
  | 'image'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'quote'
  | 'divider'

/** Notion 블록 데이터 */
export interface NotionBlock {
  /** 블록 고유 ID */
  id: string
  /** 블록 타입 */
  type: NotionBlockType
  /** 블록 내용 — Rich Text 배열 또는 이미지 URL */
  content: RichText[] | string
  /** 코드 블록 언어 (code 타입에서만 사용) */
  language: string | null
}

// ───────────────────────────────────────────
// NotionProject (Projects DB 매핑)
// ───────────────────────────────────────────

/** Notion Projects 데이터베이스 항목 */
export interface NotionProject {
  /** Notion 페이지 ID */
  id: string
  /** 프로젝트명 */
  title: string
  /** URL 식별자 */
  slug: string
  /** 한 줄 설명 */
  description: string
  /** 기술 스택 태그 목록 */
  tags: string[]
  /** 공개 상태 */
  status: 'Published' | 'Draft'
  /** 프로젝트 시작일 */
  startDate: string | null
  /** 프로젝트 종료일 */
  endDate: string | null
  /** GitHub 저장소 링크 */
  githubUrl: string | null
  /** 데모 서비스 링크 */
  demoUrl: string | null
  /** 대표 썸네일 이미지 URL */
  thumbnail: string | null
  /** 홈 화면 Featured 노출 여부 */
  featured: boolean
}

// ───────────────────────────────────────────
// NotionPost (Posts DB 매핑)
// ───────────────────────────────────────────

/** Notion Posts 데이터베이스 항목 */
export interface NotionPost {
  /** Notion 페이지 ID */
  id: string
  /** 게시글 제목 */
  title: string
  /** URL 식별자 */
  slug: string
  /** 요약 문장 */
  summary: string
  /** 카테고리 태그 목록 */
  tags: string[]
  /** 공개 여부 */
  published: boolean
  /** 발행일 (ISO 8601) */
  publishedAt: string | null
  /** 커버 이미지 URL */
  cover: string | null
}
