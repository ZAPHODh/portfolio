"use client"

import Link from "next/link"
import { Download, Mail, Github, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useRef } from "react"
import { useEffect, useState } from "react"

interface Project {
  slug: string
  title: string
  description: string
  date?: string
  technologies?: string[]
  content: string
}

export default function Portfolio() {
  const componentRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data)
    }
    loadProjects()
  }, [])

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      const printButton = document.querySelector(".no-print") as HTMLElement
      if (printButton) {
        printButton.style.display = "none"
      }

      const printStyles = `
        <style>
          @media print {
            body { 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print { display: none !important; }
            .bg-gray-50 { background: white !important; }
            .separator { border-color: #e5e7eb !important; }
            @page {
              size: A4;
              margin: 0.5in;
            }
          }
        </style>
      `

      const styleElement = document.createElement("div")
      styleElement.innerHTML = printStyles
      document.head.appendChild(styleElement)

      window.print()

      setTimeout(() => {
        document.head.removeChild(styleElement)
        if (printButton) {
          printButton.style.display = "flex"
        }
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Button
        onClick={handlePrint}
        variant="outline"
        className="fixed top-6 right-6 z-50 bg-white border-gray-300 hover:bg-gray-50 no-print"
        size="sm"
      >
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>

      <div ref={componentRef} className="max-w-4xl mx-auto p-8 bg-white">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Luis Paulo Martins</h1>
          <p className="text-lg text-gray-600 mb-6">Full Stack Developer</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              luispaulo.ni@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              github.com/ZAPHODh
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Brasil
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +55 (21) 99528-7456
            </div>
          </div>
        </header>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Habilidades Técnicas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Linguagens</h3>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "JavaScript", "SQL", "Java"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Frameworks & Bibliotecas</h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "Node.js", "Express", "Tailwind CSS", "Prisma", "Styled-components", "StoryBook", "AngularJS", "Vue", "NestJS", "Strapi", "SpringBoot",].map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Ferramentas & Banco de Dados</h3>
              <div className="flex flex-wrap gap-2">
                {["PostgreSQL", "MongoDB", "MySQL", "GraphQL", "Redis", "Git", "Docker"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Experiência Profissional</h2>
          <div className="space-y-8">
            <div className="border-l-2 border-gray-200 pl-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Full Stack Developer</h3>
                  <p className="text-gray-600">Freelancer - Remoto</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2023 - Atual</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>Desenvolvimento de aplicações web completas usando Next.js e TypeScript</li>
                <li>Criação de APIs RESTful robustas com Node.js e Express</li>
                <li>Implementação de sistemas de autenticação e autorização com JWT</li>
                <li>Integração com bancos de dados relacionais e não-relacionais</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />


        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Projetos em Destaque</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.slug} className="group hover:bg-gray-50 p-4 rounded-md transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  Ver detalhes →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Educação</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Escola Estadual Professora Maria José Raunheitti Duccini</h3>
                <p className="text-gray-600 text-sm">Ensino médio completo</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Estácio de Sá</h3>
                <p className="text-gray-600 text-sm">Análise e Desenvolvimento de Sistemas - Incompleto</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Certificações</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Next.js Certified Developer</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  2024
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">TypeScript Advanced</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  2023
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Node.js Professional</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  2022
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">React Developer</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  2023
                </Badge>
              </div>
            </div>
          </section>
        </div>

        <Separator className="my-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Idiomas</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Português</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Nativo
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Inglês</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Intermediário
                </Badge>
              </div>

            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>545 contribuições no GitHub no último ano</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Especialista em desenvolvimento front-end</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Experiência com APIs e integrações</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Foco em performance e boas práticas</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
