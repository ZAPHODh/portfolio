import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  slug: string
  date?: string
  technologies?: string[]
}

export function ProjectCard({ title, description, slug, date, technologies }: ProjectCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            <Link href={`/projects/${slug}`} className="hover:text-blue-600 transition-colors">
              {title}
            </Link>
          </CardTitle>
          {date && <span className="text-sm text-gray-500">{date}</span>}
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      {technologies && technologies.length > 0 && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
