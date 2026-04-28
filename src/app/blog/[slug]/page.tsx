import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

/**
 * 블로그 상세 페이지
 * - slug 기반 단일 게시글 조회 (F005)
 * - Notion 블록 렌더링 (F007)
 * - generateStaticParams + ISR (F008)
 */
export const revalidate = 3600

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

// 빌드 타임에 정적 경로 생성 — 추후 Notion API 연동
export async function generateStaticParams() {
  // TODO: getPosts()로 slug 목록 반환
  return []
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  // TODO: getPostBySlug(slug)로 게시글 데이터 조회
  // 데이터가 없으면 404 처리
  if (!slug) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container size="md" className="py-12">
          {/* 게시글 메타 영역 */}
          <div className="mb-8">
            {/* TODO: Cover 이미지 */}
            <h1 className="text-3xl font-bold">{slug}</h1>
            {/* TODO: Tags Badge, PublishedAt */}
          </div>

          {/* Notion 블록 렌더러 — 추후 구현 */}
          <div>{/* TODO: <NotionRenderer blocks={blocks} /> */}</div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
