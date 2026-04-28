# Notion Portfolio CMS

Notion을 CMS로 활용한 개인 포트폴리오 사이트입니다.
Notion API를 통해 코드 수정 없이 프로젝트·블로그·소개 콘텐츠를 관리할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19 + TypeScript 5
- **CMS**: Notion API (`@notionhq/client`)
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york)
- **Icons**: Lucide React

## 주요 기능

- **프로젝트 포트폴리오**: Notion Projects DB 연동, 태그 필터 지원
- **블로그/TIL**: Notion Posts DB 연동
- **About 페이지**: Notion 단일 페이지로 관리
- **Notion 블록 렌더러**: 직접 구현 (paragraph, heading, code, image, list, quote 등)
- **ISR**: 1시간 주기 자동 콘텐츠 갱신 (빌드 불필요)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local.example` 파일을 복사하여 `.env.local`을 생성하고 값을 입력하세요.

```bash
cp .env.local.example .env.local
```

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_PROJECTS_DB_ID=your_projects_database_id
NOTION_POSTS_DB_ID=your_posts_database_id
NOTION_ABOUT_PAGE_ID=your_about_page_id
```

Notion Integration 생성 방법: [Notion Developers](https://developers.notion.com/docs/getting-started)

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인하세요.

## Notion 데이터베이스 구조

### Projects DB

| 필드        | 타입         | 설명              |
| ----------- | ------------ | ----------------- |
| Title       | title        | 프로젝트명        |
| Slug        | rich_text    | URL 식별자        |
| Description | rich_text    | 한 줄 설명        |
| Tags        | multi_select | 기술 스택 태그    |
| Status      | select       | Published / Draft |
| StartDate   | date         | 시작일            |
| EndDate     | date         | 종료일            |
| GithubUrl   | url          | GitHub 링크       |
| DemoUrl     | url          | 데모 링크         |
| Thumbnail   | files        | 대표 이미지       |
| Featured    | checkbox     | 메인 노출 여부    |

### Posts DB

| 필드        | 타입         | 설명          |
| ----------- | ------------ | ------------- |
| Title       | title        | 게시글 제목   |
| Slug        | rich_text    | URL 식별자    |
| Summary     | rich_text    | 요약          |
| Tags        | multi_select | 카테고리 태그 |
| Published   | checkbox     | 공개 여부     |
| PublishedAt | date         | 발행일        |
| Cover       | files        | 커버 이미지   |

## 개발 명령어

```bash
npm run dev          # 개발 서버 실행 (Turbopack)
npm run build        # 프로덕션 빌드
npm run check-all    # 타입체크 + 린트 + 포맷 통합 검사
```

## 프로젝트 문서

- [PRD](./docs/PRD.md) — 제품 요구사항 명세서
