import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

/**
 * 블로그 목록 페이지
 * - Notion Posts DB에서 Published 게시글 목록 표시 (F004)
 * - PublishedAt 기준 최신순 정렬
 * - ISR revalidate: 3600 (F008)
 */
export const revalidate = 3600

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          <h1 className="mb-8 text-3xl font-bold">블로그</h1>

          {/* 게시글 카드 목록 — 추후 Notion API 연동 */}
          <div className="space-y-6">
            {/* TODO: NotionPost[] 데이터로 카드 렌더링 */}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
