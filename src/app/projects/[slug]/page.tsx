import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getProject, getProjects } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Portfolio
          </Button>
        </Link>

        <div className="border-b border-gray-300 pb-6">
          <h1 className="text-3xl font-bold text-black mb-2">{project.title}</h1>
          <p className="text-gray-600 mb-4">{project.description}</p>

          {project.date && <p className="text-sm text-gray-500 mb-4">{project.date}</p>}

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold text-black mt-8 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold text-black mt-6 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold text-black mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="ml-4">{children}</li>,
            code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
            pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">{children}</blockquote>
            ),
          }}
        >
          {project.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
