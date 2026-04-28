import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Container } from '@/components/layout/container'

/**
 * 프로젝트 상세 페이지
 * - slug 기반 단일 프로젝트 조회 (F003)
 * - Notion 블록 렌더링 (F007)
 * - generateStaticParams + ISR (F008)
 */
export const revalidate = 3600

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

// 빌드 타임에 정적 경로 생성 — 추후 Notion API 연동
export async function generateStaticParams() {
  // TODO: getProjects()로 slug 목록 반환
  return []
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params

  // TODO: getProjectBySlug(slug)로 프로젝트 데이터 조회
  // 데이터가 없으면 404 처리
  if (!slug) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-12">
          {/* 프로젝트 메타 영역 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{slug}</h1>
            {/* TODO: Tags Badge, StartDate~EndDate, Thumbnail */}
            {/* TODO: GitHub 링크, 데모 링크 버튼 */}
          </div>

          {/* Notion 블록 렌더러 — 추후 구현 */}
          <div>{/* TODO: <NotionRenderer blocks={blocks} /> */}</div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
