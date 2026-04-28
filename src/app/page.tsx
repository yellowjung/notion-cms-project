import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

/**
 * 홈 페이지
 * - 히어로 섹션
 * - Featured 프로젝트 카드 그리드 (F001, F009)
 * - 최근 블로그 글 3개 (F004)
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* 히어로 섹션 */}
        <section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                안녕하세요
              </h1>
              <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
                Notion으로 관리하는 개인 포트폴리오입니다.
              </p>
            </div>
          </Container>
        </section>

        {/* Featured 프로젝트 섹션 — 추후 Notion API 연동 */}
        <section className="py-12">
          <Container>
            <h2 className="mb-8 text-2xl font-bold">주요 프로젝트</h2>
            {/* TODO: NotionProject[] 데이터로 카드 그리드 렌더링 */}
          </Container>
        </section>

        {/* 최근 블로그 글 섹션 — 추후 Notion API 연동 */}
        <section className="py-12">
          <Container>
            <h2 className="mb-8 text-2xl font-bold">최근 글</h2>
            {/* TODO: NotionPost[] 데이터로 카드 목록 렌더링 */}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  )
}
