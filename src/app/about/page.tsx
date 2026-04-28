import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

/**
 * About 페이지
 * - 단일 Notion 페이지(NOTION_ABOUT_PAGE_ID) 블록 렌더링 (F006, F007)
 * - 소개, 기술 스택, 연락처 포함
 * - ISR revalidate: 3600 (F008)
 */
export const revalidate = 3600

export default async function AboutPage() {
  // TODO: getAboutBlocks()로 Notion 페이지 블록 조회

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container size="md" className="py-12">
          <h1 className="mb-8 text-3xl font-bold">About</h1>

          {/* Notion 블록 렌더러 — 추후 구현 */}
          <div>{/* TODO: <NotionRenderer blocks={blocks} /> */}</div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
