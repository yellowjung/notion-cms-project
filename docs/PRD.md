# Notion Portfolio CMS MVP PRD

## 핵심 정보

**목적**: Notion API를 CMS로 활용하여 코드 수정 없이 콘텐츠를 관리할 수 있는 개인 포트폴리오 사이트 구축
**사용자**: Notion으로 콘텐츠를 관리하며 포트폴리오·블로그를 운영하는 1인 개발자

---

## 사용자 여정

```
1. 홈 페이지 (/)
   ↓ 히어로 섹션 확인 + Featured 프로젝트 카드 클릭
   ↓ 최근 블로그 글 카드 클릭

2. [분기]
   [프로젝트 클릭] → 프로젝트 상세 페이지 (/projects/[slug]) → 뒤로가기 또는 GithubUrl/DemoUrl 이동
   [블로그 글 클릭] → 블로그 상세 페이지 (/blog/[slug]) → 뒤로가기

   ↓ 내비게이션 메뉴 직접 클릭

3. 프로젝트 목록 페이지 (/projects)
   ↓ 태그 필터 선택 → 필터링된 카드 그리드 표시
   ↓ 카드 클릭

4. 프로젝트 상세 페이지 (/projects/[slug])
   - Notion 블록 렌더링 (설명, 이미지, 코드 등)
   - GithubUrl / DemoUrl 링크 버튼

5. 블로그 목록 페이지 (/blog)
   ↓ 글 카드 클릭

6. 블로그 상세 페이지 (/blog/[slug])
   - Notion 블록 렌더링

7. About 페이지 (/about)
   - Notion 단일 페이지 블록 렌더링 (소개, 기술 스택, 연락처)
```

---

## 기능 명세

### 1. MVP 핵심 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|--------------|------------|
| **F001** | 프로젝트 목록 조회 | Notion Projects DB를 쿼리하여 Published 상태의 프로젝트 카드 그리드 표시 | 포트폴리오의 핵심 콘텐츠 노출 | 홈 페이지, 프로젝트 목록 페이지 |
| **F002** | 프로젝트 태그 필터 | multi_select Tags 값을 기반으로 프로젝트 목록 클라이언트 필터링 | 방문자가 원하는 기술 스택을 빠르게 탐색 | 프로젝트 목록 페이지 |
| **F003** | 프로젝트 상세 조회 | Slug 기반으로 단일 프로젝트 조회 및 Notion 블록 렌더링 | 프로젝트 내용 전달 | 프로젝트 상세 페이지 |
| **F004** | 블로그 목록 조회 | Notion Posts DB를 쿼리하여 Published 글 목록 표시 | 블로그 콘텐츠 노출 | 홈 페이지, 블로그 목록 페이지 |
| **F005** | 블로그 상세 조회 | Slug 기반으로 단일 게시글 조회 및 Notion 블록 렌더링 | 블로그 본문 전달 | 블로그 상세 페이지 |
| **F006** | About 페이지 렌더링 | 단일 Notion 페이지 ID로 소개·기술스택·연락처 블록 렌더링 | 개인 소개 전달 | About 페이지 |
| **F007** | Notion 블록 렌더러 | paragraph, heading1-3, code, image, bulleted_list, numbered_list, quote, divider 블록 타입 직접 구현 | 모든 콘텐츠 페이지의 렌더링 기반 | 프로젝트 상세 페이지, 블로그 상세 페이지, About 페이지 |
| **F008** | ISR 콘텐츠 갱신 | revalidate: 3600 설정으로 빌드 없이 1시간 주기 콘텐츠 갱신 | Notion 수정 내용의 자동 반영 | 전체 페이지 |
| **F009** | Featured 프로젝트 노출 | Projects DB의 Featured 체크박스가 true인 프로젝트를 홈에 우선 노출 | 방문자 첫인상 구성 | 홈 페이지 |

### 2. MVP 필수 지원 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|--------------|------------|
| **F010** | Notion API 클라이언트 | `@notionhq/client` 초기화, 환경변수(NOTION_TOKEN, DB ID 등) 관리 | 모든 데이터 조회의 기반 | 전체 페이지 (서버 사이드) |
| **F011** | 반응형 레이아웃 | 기존 Header/Footer 컴포넌트 활용, 모바일·태블릿·데스크톱 대응 | 다양한 기기에서 정상 열람 | 전체 페이지 |

### 3. MVP 이후 기능 (제외)

- 댓글 기능
- 검색 기능 (전문 검색, 태그 검색 통합)
- 다국어(i18n) 지원
- 인증 및 관리자 UI
- On-Demand Revalidation (Notion Webhook 연동)
- RSS 피드
- 조회수 집계

---

## 메뉴 구조

```
내비게이션 (공통 Header)
├── 홈 (/)
│   └── 기능: F001 (Featured 프로젝트), F004 (최근 블로그 글), F009
├── 프로젝트 (/projects)
│   └── 기능: F001, F002 (태그 필터)
├── 블로그 (/blog)
│   └── 기능: F004 (블로그 목록)
└── About (/about)
    └── 기능: F006 (Notion 단일 페이지 렌더링)

페이지 내부 이동 (내비게이션 없음)
├── 프로젝트 상세 (/projects/[slug])
│   └── 기능: F003, F007
└── 블로그 상세 (/blog/[slug])
    └── 기능: F005, F007
```

---

## 페이지별 상세 기능

### 홈 페이지

> **구현 기능:** `F001`, `F004`, `F008`, `F009`, `F011` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 방문자 첫 진입점. 히어로 섹션 + Featured 프로젝트 + 최근 블로그 글로 포트폴리오 요약 제공 |
| **진입 경로** | 도메인 루트 직접 접근, 내비게이션 홈 클릭 |
| **사용자 행동** | 히어로 섹션 읽기, Featured 프로젝트 카드 클릭, 최근 블로그 글 카드 클릭, 각 섹션의 "더 보기" 링크 클릭 |
| **주요 기능** | • 히어로 섹션 (이름, 한 줄 소개, CTA 버튼)<br>• Featured 프로젝트 카드 그리드 (Thumbnail, Title, Description, Tags, DemoUrl)<br>• 최근 블로그 글 3개 카드 (Cover, Title, Summary, PublishedAt)<br>• **프로젝트 더 보기** → 프로젝트 목록 페이지<br>• **블로그 더 보기** → 블로그 목록 페이지 |
| **다음 이동** | 프로젝트 카드 클릭 → 프로젝트 상세 페이지, 블로그 카드 클릭 → 블로그 상세 페이지 |

---

### 프로젝트 목록 페이지

> **구현 기능:** `F001`, `F002`, `F008`, `F011` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | Notion Projects DB의 Published 프로젝트 전체를 카드 그리드로 표시하고 태그 필터 제공 |
| **진입 경로** | 내비게이션 "프로젝트" 클릭, 홈 "프로젝트 더 보기" 클릭 |
| **사용자 행동** | 태그 버튼 클릭으로 필터링, 프로젝트 카드 클릭으로 상세 이동 |
| **주요 기능** | • 전체 태그 목록 버튼 (All + 각 태그)<br>• 선택 태그 기준 카드 필터링 (클라이언트 사이드)<br>• 프로젝트 카드: Thumbnail, Title, Description, Tags Badge, StartDate~EndDate<br>• **카드 클릭** → 프로젝트 상세 페이지 |
| **다음 이동** | 카드 클릭 → 프로젝트 상세 페이지 |

---

### 프로젝트 상세 페이지

> **구현 기능:** `F003`, `F007`, `F008`, `F011` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 단일 프로젝트의 메타데이터와 Notion 페이지 본문 블록을 렌더링 |
| **진입 경로** | 프로젝트 목록 페이지 또는 홈 페이지의 카드 클릭 (`/projects/[slug]`) |
| **사용자 행동** | 프로젝트 설명 읽기, GitHub 링크 또는 데모 링크 클릭, 뒤로가기 |
| **주요 기능** | • 페이지 상단 메타: Title, Tags Badge, StartDate~EndDate, Thumbnail<br>• **GitHub 링크** 버튼 (GithubUrl 값이 있을 때만 표시)<br>• **데모 링크** 버튼 (DemoUrl 값이 있을 때만 표시)<br>• Notion 블록 렌더러로 본문 표시 (F007)<br>• generateStaticParams로 빌드 타임 경로 생성 + ISR |
| **다음 이동** | 외부 링크(GitHub/Demo) 새 탭, 브라우저 뒤로가기 → 프로젝트 목록 페이지 |

---

### 블로그 목록 페이지

> **구현 기능:** `F004`, `F008`, `F011` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | Notion Posts DB의 Published 게시글 전체를 최신순으로 표시 |
| **진입 경로** | 내비게이션 "블로그" 클릭, 홈 "블로그 더 보기" 클릭 |
| **사용자 행동** | 글 목록 스크롤, 글 카드 클릭으로 상세 이동 |
| **주요 기능** | • 게시글 카드 목록: Cover, Title, Summary, Tags Badge, PublishedAt<br>• PublishedAt 기준 최신순 정렬<br>• **카드 클릭** → 블로그 상세 페이지 |
| **다음 이동** | 카드 클릭 → 블로그 상세 페이지 |

---

### 블로그 상세 페이지

> **구현 기능:** `F005`, `F007`, `F008`, `F011` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 단일 게시글의 메타데이터와 Notion 페이지 본문 블록을 렌더링 |
| **진입 경로** | 블로그 목록 페이지 또는 홈 페이지의 글 카드 클릭 (`/blog/[slug]`) |
| **사용자 행동** | 본문 읽기, 뒤로가기 |
| **주요 기능** | • 페이지 상단 메타: Cover, Title, Tags Badge, PublishedAt<br>• Notion 블록 렌더러로 본문 표시 (F007)<br>• generateStaticParams로 빌드 타임 경로 생성 + ISR |
| **다음 이동** | 브라우저 뒤로가기 → 블로그 목록 페이지 |

---

### About 페이지

> **구현 기능:** `F006`, `F007`, `F008`, `F011` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 단일 Notion 페이지(About Page ID)의 블록을 렌더링하여 소개·기술스택·연락처 제공 |
| **진입 경로** | 내비게이션 "About" 클릭 |
| **사용자 행동** | 소개 읽기, 기술 스택 확인, 연락처 링크 클릭 |
| **주요 기능** | • Notion 블록 렌더러로 전체 페이지 표시 (F007)<br>• 연락처 링크(이메일, GitHub 등)는 Notion 내 링크 블록으로 관리<br>• ISR revalidate: 3600 적용 |
| **다음 이동** | 연락처 링크 → 외부 링크 새 탭 |

---

## 데이터 모델

### NotionProject (Projects DB 매핑)

| 필드 | 설명 | 타입/관계 |
|------|------|----------|
| id | Notion 페이지 ID | string |
| title | 프로젝트명 | string |
| slug | URL 식별자 | string |
| description | 한 줄 설명 | string |
| tags | 기술 스택 태그 목록 | string[] |
| status | 공개 상태 | "Published" \| "Draft" |
| startDate | 시작일 | string \| null |
| endDate | 종료일 | string \| null |
| githubUrl | GitHub 링크 | string \| null |
| demoUrl | 데모 링크 | string \| null |
| thumbnail | 대표 이미지 URL | string \| null |
| featured | 메인 노출 여부 | boolean |

### NotionPost (Posts DB 매핑)

| 필드 | 설명 | 타입/관계 |
|------|------|----------|
| id | Notion 페이지 ID | string |
| title | 게시글 제목 | string |
| slug | URL 식별자 | string |
| summary | 요약 | string |
| tags | 카테고리 태그 목록 | string[] |
| published | 공개 여부 | boolean |
| publishedAt | 발행일 | string \| null |
| cover | 커버 이미지 URL | string \| null |

### NotionBlock (블록 렌더러용)

| 필드 | 설명 | 타입/관계 |
|------|------|----------|
| id | 블록 ID | string |
| type | 블록 타입 | "paragraph" \| "heading_1" \| "heading_2" \| "heading_3" \| "code" \| "image" \| "bulleted_list_item" \| "numbered_list_item" \| "quote" \| "divider" |
| content | 블록 내용 (Rich Text 배열 또는 URL) | RichText[] \| string |
| language | 코드 블록 언어 (code 타입만) | string \| null |

---

## 기술 스택

### 프론트엔드 프레임워크

- **Next.js 15.5.3** (App Router + Turbopack) — React 풀스택 프레임워크, ISR 지원
- **TypeScript 5** — 타입 안전성, Notion API 응답 타입 정의
- **React 19.1.0** — UI 라이브러리

### 스타일링 & UI

- **TailwindCSS v4** (설정 파일 없는 새로운 엔진) — 유틸리티 CSS
- **shadcn/ui** (new-york style) — Button, Card, Badge, Avatar 등 기존 컴포넌트 활용
- **Lucide React** — 아이콘 라이브러리

### 폼 & 검증

- **React Hook Form 7.x** — 폼 상태 관리 (추후 연락처 폼 등 확장 대비)
- **Zod** — 환경변수 스키마 검증 (`src/env.ts`)

### CMS & 데이터

- **@notionhq/client** — Notion API 공식 클라이언트
- **Notion API** — Projects DB, Posts DB, About 단일 페이지 쿼리

### 배포 & 호스팅

- **Vercel** — Next.js 15 최적화 배포, ISR 지원

### 패키지 관리

- **npm** — 의존성 관리

---

## 구현 순서

1. **환경 설정** — `.env.local` 구성 (`NOTION_TOKEN`, `NOTION_PROJECTS_DB_ID`, `NOTION_POSTS_DB_ID`, `NOTION_ABOUT_PAGE_ID`), Zod 환경변수 스키마
2. **데이터 레이어** — `src/lib/notion/client.ts` (API 클라이언트), `src/lib/notion/projects.ts`, `src/lib/notion/posts.ts`, `src/lib/notion/blocks.ts`
3. **타입 정의** — `src/types/notion.ts` (NotionProject, NotionPost, NotionBlock)
4. **Notion 블록 렌더러** — `src/components/notion/NotionRenderer.tsx` 및 블록 타입별 컴포넌트
5. **프로젝트 페이지** — `/projects` 목록 + `/projects/[slug]` 상세
6. **블로그 페이지** — `/blog` 목록 + `/blog/[slug]` 상세
7. **홈 페이지 수정** — Featured 프로젝트 섹션 + 최근 글 3개 섹션 추가
8. **About 페이지** — `/about` Notion 단일 페이지 블록 렌더링

---

## MVP 제외 범위

- 댓글 기능
- 전문 검색 (Algolia 등)
- 다국어(i18n) 지원
- 인증 및 관리자 UI
- On-Demand Revalidation (Notion Webhook 연동 — 선택 사항으로 추후 추가 가능)
- RSS 피드
- 조회수 집계
