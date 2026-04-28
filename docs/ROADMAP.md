# Notion Portfolio CMS 개발 로드맵

> Notion API를 CMS로 활용하여 코드 수정 없이 콘텐츠를 관리하는 1인 개발자용 포트폴리오 사이트 구축 로드맵

- **프로젝트명**: Notion Portfolio CMS
- **시작일 기준**: 2026-04-28
- **기술 스택**: Next.js 15.5.3 (App Router + Turbopack), React 19.1.0, TypeScript 5, TailwindCSS v4, shadcn/ui, @notionhq/client, Zod, React Hook Form
- **배포**: Vercel (ISR `revalidate: 3600`)

---

## 개요

Notion Portfolio CMS는 Notion으로 콘텐츠를 관리하며 포트폴리오·블로그를 운영하는 **1인 개발자**를 위한 CMS 기반 정적 포트폴리오 사이트로 다음 기능을 제공합니다:

- **Notion 기반 CMS 콘텐츠 관리**: Projects DB, Posts DB, About 단일 페이지를 Notion에서 직접 관리
- **프로젝트 / 블로그 / About 페이지 렌더링**: Notion 블록을 React 컴포넌트로 직접 렌더링
- **ISR 자동 갱신**: 1시간 주기 콘텐츠 갱신으로 빌드 없이 최신 상태 유지
- **태그 필터링 & Featured 노출**: 클라이언트 사이드 태그 필터, 홈에 Featured 프로젝트 우선 노출
- **반응형 레이아웃**: 모바일·태블릿·데스크톱 전 디바이스 대응

---

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - `/tasks` 디렉토리에 새 작업 파일 생성 (`XXX-description.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함**
     - 각 시나리오는 `[정상]` / `[엣지]` / `[에러]` 케이스로 분류하여 작성
     - 정상 케이스(Happy Path) + 엣지 케이스 + 에러 케이스 모두 포함 필수
     - 각 시나리오에 Playwright MCP로 검증할 내용을 구체적으로 명시
   - 마지막 완료된 작업을 예시로 참조 (초기 상태 샘플은 `000-sample.md`)

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - **[필수]** 각 구현 단계 완료 후 즉시 Playwright MCP로 해당 시나리오 테스트 실행
   - **[필수]** Task의 모든 시나리오가 통과되지 않으면 완료 처리 불가
   - 테스트 실패 시: 원인 분석 → 수정 → 재테스트 사이클 반복
   - `npm run check-all` 및 `npm run build` 통과는 테스트 통과와 별개의 추가 필수 조건
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시 + `See: /tasks/XXX-xxx.md` 추가

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

> 전체 라우트 구조와 타입 시스템, 환경 설정의 골격을 우선 완성합니다. UI/로직과 무관하게 병렬 개발이 가능하도록 모든 페이지의 빈 껍데기와 인터페이스를 먼저 정의합니다.

- **Task 001: 환경 설정 및 환경변수 스키마 구성** - 우선순위
  - 담당 기능: `F010`
  - 관련 파일: `.env.local`, `.env.example`, `src/lib/env.ts`
  - 환경변수 정의: `NOTION_TOKEN`, `NOTION_PROJECTS_DB_ID`, `NOTION_POSTS_DB_ID`, `NOTION_ABOUT_PAGE_ID`
  - Zod 스키마로 환경변수 런타임 검증 (`src/lib/env.ts`)
  - `.env.example` 템플릿 작성 및 `.gitignore` 점검
  - 환경변수 로딩 실패 시 명확한 에러 메시지 출력

- **Task 002: 라우트 구조 및 페이지 골격 생성**
  - 담당 기능: 골격 (`F001`~`F006` 페이지 컨테이너)
  - 관련 파일:
    - `src/app/page.tsx` (홈)
    - `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`
    - `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
    - `src/app/about/page.tsx`
  - Next.js App Router 기반 모든 라우트 생성 (빈 껍데기)
  - 공통 레이아웃(`src/app/layout.tsx`) Header/Footer 연결 확인
  - 내비게이션(`src/components/navigation/main-nav.tsx`, `mobile-nav.tsx`)에 모든 메뉴 링크 추가
  - 각 페이지에 임시 placeholder 텍스트 + 메타데이터(`generateMetadata`) 골격 작성

- **Task 003: 타입 정의 및 인터페이스 설계**
  - 담당 기능: 데이터 모델
  - 관련 파일: `src/types/notion.ts`
  - `NotionProject` 인터페이스 (id, title, slug, description, tags, status, startDate, endDate, githubUrl, demoUrl, thumbnail, featured)
  - `NotionPost` 인터페이스 (id, title, slug, summary, tags, published, publishedAt, cover)
  - `NotionBlock` 유니온 타입 (paragraph, heading_1~3, code, image, bulleted_list_item, numbered_list_item, quote, divider)
  - `RichText` 타입 정의 (Notion Rich Text 배열)
  - 페이지별 props 타입 (`ProjectDetailPageProps`, `PostDetailPageProps`)

---

### Phase 2: UI/UX 완성 (더미 데이터 활용)

> 데이터 레이어 없이 더미 데이터를 사용해 모든 페이지의 UI/UX를 완성합니다. 디자이너/프론트엔드와 백엔드 작업이 병렬로 진행될 수 있도록 합니다.

- **Task 004: 공통 UI 컴포넌트 및 더미 데이터 작성**
  - 담당 기능: `F011` 기반
  - 관련 파일:
    - `src/components/ui/*` (shadcn/ui Button, Card, Badge, Avatar)
    - `src/components/cards/project-card.tsx`
    - `src/components/cards/post-card.tsx`
    - `src/lib/dummy/projects.ts`, `src/lib/dummy/posts.ts`, `src/lib/dummy/blocks.ts`
  - shadcn/ui 컴포넌트 설치 (Button, Card, Badge 등) 및 디자인 시스템 적용
  - `ProjectCard`, `PostCard` 공통 카드 컴포넌트 구현
  - 더미 `NotionProject[]`, `NotionPost[]`, `NotionBlock[]` 시드 데이터 작성
  - 반응형 그리드 레이아웃 유틸 정의 (Tailwind v4)

- **Task 005: 프로젝트 목록/상세 페이지 UI**
  - 담당 기능: `F001`, `F002`, `F003`, `F011` (UI 한정)
  - 관련 파일:
    - `src/app/projects/page.tsx`
    - `src/app/projects/[slug]/page.tsx`
    - `src/components/projects/tag-filter.tsx`
    - `src/components/projects/project-meta.tsx`
  - 프로젝트 목록 카드 그리드 + 태그 필터 버튼(All + 각 태그) 클라이언트 컴포넌트 구현
  - 프로젝트 상세 메타 영역 (Title, Tags, StartDate~EndDate, Thumbnail, GitHub/Demo 버튼) 구현
  - 더미 데이터 기반 동작 검증
  - 모바일/태블릿/데스크톱 반응형 확인

- **Task 006: 블로그 목록/상세 페이지 UI**
  - 담당 기능: `F004`, `F005`, `F011` (UI 한정)
  - 관련 파일:
    - `src/app/blog/page.tsx`
    - `src/app/blog/[slug]/page.tsx`
    - `src/components/blog/post-meta.tsx`
  - 블로그 목록 카드 (Cover, Title, Summary, Tags, PublishedAt) 구현 + 최신순 정렬
  - 블로그 상세 메타 영역(Cover, Title, Tags, PublishedAt) 구현
  - 본문 영역은 NotionRenderer 자리만 확보(placeholder)

- **Task 007: 홈 페이지 / About 페이지 UI**
  - 담당 기능: `F001`, `F004`, `F006`, `F009`, `F011` (UI 한정)
  - 관련 파일:
    - `src/app/page.tsx`
    - `src/app/about/page.tsx`
    - `src/components/sections/hero.tsx`
    - `src/components/sections/featured-projects.tsx`
    - `src/components/sections/recent-posts.tsx`
  - 히어로 섹션(이름, 한 줄 소개, CTA 버튼)
  - Featured 프로젝트 카드 그리드 (`featured: true` 필터 — 더미 기준)
  - 최근 블로그 글 3개 카드 (PublishedAt 기준 최신순)
  - "프로젝트 더 보기", "블로그 더 보기" 링크
  - About 페이지 Notion 블록 렌더 자리(placeholder) 확보

---

### Phase 3: 핵심 기능 구현 (Notion API 연동)

> PRD 구현 순서 1~4단계의 백엔드 데이터 레이어를 완성하고 더미 데이터를 실제 Notion API 호출로 교체합니다.

- **Task 008: Notion API 클라이언트 및 데이터 레이어 구축** - 우선순위
  - 담당 기능: `F010`, `F008`
  - 관련 파일:
    - `src/lib/notion/client.ts`
    - `src/lib/notion/projects.ts`
    - `src/lib/notion/posts.ts`
    - `src/lib/notion/blocks.ts`
  - `@notionhq/client` 초기화 및 싱글톤 클라이언트
  - `getProjects()`, `getProjectBySlug()` — Projects DB 쿼리(Status: Published 필터)
  - `getPosts()`, `getPostBySlug()` — Posts DB 쿼리(Published true + PublishedAt desc)
  - `getPageBlocks(pageId)` — 페이지네이션 처리된 블록 재귀 조회
  - Notion API 응답을 `NotionProject` / `NotionPost` / `NotionBlock`으로 매핑하는 어댑터 함수
  - `revalidate = 3600` ISR 적용 (`fetch` cache 옵션 또는 `export const revalidate = 3600`)
  - **[Playwright MCP 테스트 — 구현 완료 전 통과 필수]**
    - [ ] [정상] `getProjects()` 호출 시 Published 프로젝트 목록이 화면에 표시된다
    - [ ] [정상] `getPosts()` 호출 시 최신순으로 정렬된 글 목록이 표시된다
    - [ ] [엣지] DB에 항목이 없을 때 빈 배열이 반환되고 UI가 정상 처리된다
    - [ ] [에러] NOTION_TOKEN이 유효하지 않을 때 명확한 에러가 출력된다

- **Task 009: Notion 블록 렌더러 구현**
  - 담당 기능: `F007`
  - 관련 파일:
    - `src/components/notion/NotionRenderer.tsx`
    - `src/components/notion/blocks/Paragraph.tsx`
    - `src/components/notion/blocks/Heading.tsx`
    - `src/components/notion/blocks/Code.tsx`
    - `src/components/notion/blocks/Image.tsx`
    - `src/components/notion/blocks/List.tsx`
    - `src/components/notion/blocks/Quote.tsx`
    - `src/components/notion/blocks/Divider.tsx`
    - `src/components/notion/RichText.tsx`
  - 지원 블록 타입: `paragraph`, `heading_1~3`, `code`, `image`, `bulleted_list_item`, `numbered_list_item`, `quote`, `divider`
  - `RichText` 컴포넌트(annotations: bold, italic, code, strikethrough, underline, color + link 처리)
  - `code` 블록의 `language` prop 처리 (구문 강조는 Tailwind/CSS 기본)
  - `bulleted_list_item` / `numbered_list_item` 연속 블록 그룹핑(ul/ol)
  - 이미지 블록의 외부/파일 URL 차이 대응 + Next/Image 활용 검토
  - **[Playwright MCP 테스트 — 구현 완료 전 통과 필수]**
    - [ ] [정상] paragraph, heading_1~3, code, image, bulleted_list_item, numbered_list_item, quote, divider 블록이 각각 올바르게 렌더링된다
    - [ ] [정상] RichText의 bold, italic, code, link 어노테이션이 화면에 반영된다
    - [ ] [엣지] 지원하지 않는 블록 타입이 포함되어도 나머지 블록은 정상 렌더링된다
    - [ ] [에러] 빈 content를 가진 블록이 있어도 페이지가 크래시되지 않는다

- **Task 010: 프로젝트 페이지 Notion 연동**
  - 담당 기능: `F001`, `F002`, `F003`, `F008`
  - 관련 파일:
    - `src/app/projects/page.tsx`
    - `src/app/projects/[slug]/page.tsx`
  - 프로젝트 목록 페이지에서 `getProjects()` 호출, 더미 데이터 제거
  - 태그 필터: 서버에서 전체 태그 추출 후 클라이언트 컴포넌트로 전달, 클라이언트 사이드 필터링
  - 프로젝트 상세: `generateStaticParams`로 슬러그 빌드 타임 생성
  - `getProjectBySlug()` + `getPageBlocks()` 호출 후 `NotionRenderer`로 본문 렌더
  - GithubUrl/DemoUrl 존재 시에만 버튼 노출
  - 존재하지 않는 슬러그는 `notFound()` 처리
  - **[Playwright MCP 테스트 — 구현 완료 전 통과 필수]**
    - [ ] [정상] /projects 접근 시 Notion DB의 Published 프로젝트 카드가 표시된다
    - [ ] [정상] 태그 버튼 클릭 시 해당 태그의 프로젝트만 필터링되어 표시된다
    - [ ] [정상] 프로젝트 카드 클릭 시 /projects/[slug] 상세 페이지로 이동하고 본문이 렌더링된다
    - [ ] [엣지] GithubUrl이 없는 프로젝트에서 GitHub 버튼이 표시되지 않는다
    - [ ] [에러] 존재하지 않는 slug 접근 시 404 페이지가 반환된다

- **Task 011: 블로그 페이지 Notion 연동**
  - 담당 기능: `F004`, `F005`, `F008`
  - 관련 파일:
    - `src/app/blog/page.tsx`
    - `src/app/blog/[slug]/page.tsx`
  - 블로그 목록 페이지에서 `getPosts()` 호출, PublishedAt 최신순 정렬
  - 블로그 상세: `generateStaticParams` + `getPostBySlug()` + `getPageBlocks()` + `NotionRenderer`
  - Cover 이미지 노출 (Next/Image)
  - 존재하지 않는 슬러그는 `notFound()` 처리
  - **[Playwright MCP 테스트 — 구현 완료 전 통과 필수]**
    - [ ] [정상] /blog 접근 시 Published 게시글이 PublishedAt 최신순으로 표시된다
    - [ ] [정상] 글 카드 클릭 시 /blog/[slug] 상세 페이지로 이동하고 본문이 렌더링된다
    - [ ] [엣지] cover 이미지가 없는 게시글도 레이아웃이 깨지지 않는다
    - [ ] [에러] 존재하지 않는 slug 접근 시 404 페이지가 반환된다

- **Task 012: 홈 페이지 Notion 연동 (Featured + 최근 글)**
  - 담당 기능: `F001`, `F004`, `F009`, `F008`
  - 관련 파일: `src/app/page.tsx`, `src/components/sections/featured-projects.tsx`, `src/components/sections/recent-posts.tsx`
  - `getProjects({ featured: true })`로 Featured 프로젝트 노출
  - `getPosts({ limit: 3 })`로 최근 블로그 글 3개 노출
  - 더 보기 링크가 `/projects`, `/blog`로 정상 이동하는지 확인
  - **[Playwright MCP 테스트 — 구현 완료 전 통과 필수]**
    - [ ] [정상] 홈(/) 접근 시 featured: true 프로젝트 카드가 표시된다
    - [ ] [정상] 최근 블로그 글 3개가 PublishedAt 최신순으로 표시된다
    - [ ] [정상] "프로젝트 더 보기" 클릭 시 /projects로, "블로그 더 보기" 클릭 시 /blog로 이동한다
    - [ ] [엣지] Featured 프로젝트가 없을 때 해당 섹션이 빈 상태로 처리된다

- **Task 013: About 페이지 Notion 연동**
  - 담당 기능: `F006`, `F007`, `F008`
  - 관련 파일: `src/app/about/page.tsx`
  - `NOTION_ABOUT_PAGE_ID`로 단일 페이지 블록 조회 + `NotionRenderer` 렌더
  - Notion 내 외부 링크가 새 탭으로 열리는지 검증
  - ISR `revalidate: 3600` 적용
  - **[Playwright MCP 테스트 — 구현 완료 전 통과 필수]**
    - [ ] [정상] /about 접근 시 NOTION_ABOUT_PAGE_ID 페이지의 블록이 렌더링된다
    - [ ] [정상] Notion 내 외부 링크가 새 탭(target="\_blank")으로 열린다
    - [ ] [에러] NOTION_ABOUT_PAGE_ID가 잘못된 경우 에러 페이지 또는 빈 상태가 표시된다

- **Task 013-1: 핵심 기능 통합 E2E 테스트**
  - 담당 기능: 전체 사용자 여정
  - 관련 파일: 신규 `tests/e2e/*.spec.ts` (선택), 또는 Playwright MCP 시나리오 문서화
  - 사용자 여정 전체(홈 → 프로젝트 → 상세 → 블로그 → About) 플로우 검증
  - 태그 필터, Featured 노출, 외부 링크 분기, 404 처리 등 엣지 케이스 검증
  - Notion API 실패 시 에러 핸들링(빈 상태, 폴백 UI) 확인
  - **[Playwright MCP 테스트 — 전체 사용자 여정 통과 필수]**
    - [ ] [정상] 홈 → 프로젝트 카드 클릭 → 상세 페이지 이동 전체 플로우가 동작한다
    - [ ] [정상] 홈 → 블로그 카드 클릭 → 상세 페이지 이동 전체 플로우가 동작한다
    - [ ] [정상] 내비게이션의 모든 메뉴(홈/프로젝트/블로그/About)가 정상 이동한다
    - [ ] [엣지] 태그 필터 선택/해제가 URL 새로고침 없이 동작한다
    - [ ] [에러] 잘못된 URL 직접 접근 시 404 페이지가 반환된다

---

### Phase 4: 고급 기능 및 최적화

> MVP 품질을 보장하고 Vercel 배포까지 완료합니다. PRD의 MVP 제외 범위(검색, 댓글, i18n 등)는 다루지 않습니다.

- **Task 014: 메타데이터 / SEO / OG 이미지 최적화**
  - 담당 기능: `F011` 보조
  - 관련 파일: 각 `page.tsx`의 `generateMetadata`, `src/app/sitemap.ts`(선택), `src/app/robots.ts`(선택)
  - 페이지별 동적 `title`, `description`, `openGraph`, `twitter` 메타 작성
  - 프로젝트/블로그 상세 페이지의 OG 이미지로 thumbnail/cover 활용
  - 사이트맵/robots.txt 생성 (선택)

- **Task 015: 성능 최적화 및 이미지 처리**
  - 담당 기능: `F011`, `F008`
  - 관련 파일: `next.config.ts`, `src/components/notion/blocks/Image.tsx`
  - Notion 이미지 도메인을 `images.remotePatterns`에 추가
  - Next/Image 사용 일관화 + `priority` / `sizes` 최적화
  - 빌드 사이즈 점검, 불필요한 클라이언트 컴포넌트 축소
  - Lighthouse 성능/접근성/베스트 프랙티스 점검

- **Task 016: 품질 보증 및 CI**
  - 관련 파일: `.husky/*`, `package.json` scripts, `.github/workflows/*`(선택)
  - `npm run check-all` (lint + type-check + format) 통과 보장
  - `npm run build` 성공 + ESLint/Prettier/Husky/lint-staged 점검
  - GitHub Actions로 PR CI 구성 (선택)

- **Task 017: Vercel 배포 및 운영 점검**
  - 담당 기능: `F008`, `F010`
  - 관련 파일: `vercel.json`(선택), 배포 환경변수
  - Vercel 프로젝트 연결 + 환경변수 등록(`NOTION_TOKEN`, DB IDs, About Page ID)
  - ISR `revalidate: 3600` 동작 확인 (Notion 수정 1시간 내 반영)
  - 프로덕션 도메인 연결 및 미리보기 배포 검증
  - 운영 점검: 404/500 페이지, 에러 모니터링(콘솔 점검)

---

## 진행 상태 범례

- **Phase 상태**:
  - `### Phase N: ... ✅` — 완료된 Phase
  - `### Phase N: ...` — 진행 중 또는 대기

- **Task 상태**:
  - `✅ - 완료` + `See: /tasks/XXX-xxx.md` — 완료된 작업
  - `- 우선순위` — 즉시 시작해야 할 작업
  - 표시 없음 — 대기 중

- **세부 구현 사항**:
  - `✅` — 완료된 항목
  - `-` — 미완료 항목

- **테스트 조건**:
  - API/비즈니스 로직 Task는 `[Playwright MCP 테스트]` 블록의 모든 시나리오 통과 후 완료 처리
  - 테스트 미통과 상태로 Task를 ✅ 처리 불가
