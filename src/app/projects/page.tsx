import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

/**
 * 프로젝트 목록 페이지
 * - Notion Projects DB에서 Published 프로젝트 목록 표시 (F001)
 * - 태그 필터링 (F002, 클라이언트 사이드)
 * - ISR revalidate: 3600 (F008)
 */
export const revalidate = 3600

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <h1 className="mb-8 text-3xl font-bold">프로젝트</h1>

          {/* 태그 필터 — 추후 구현 */}
          <div className="mb-8">{/* TODO: 태그 필터 버튼 렌더링 */}</div>

          {/* 프로젝트 카드 그리드 — 추후 Notion API 연동 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* TODO: NotionProject[] 데이터로 카드 렌더링 */}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
