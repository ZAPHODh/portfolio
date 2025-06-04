import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Project {
  slug: string
  title: string
  description: string
  date?: string
  technologies?: string[]
  content: string
}

const projectsDirectory = path.join(process.cwd(), "content/projects")

export async function getProjects(): Promise<Project[]> {
  try {
    const fileNames = fs.readdirSync(projectsDirectory)
    const projects = fileNames
      .filter((name) => name.endsWith(".md"))
      .map((name) => {
        const fullPath = path.join(projectsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug: name.replace(/\.md$/, ""),
          title: data.title || name.replace(/\.md$/, ""),
          description: data.description || "",
          date: data.date,
          technologies: data.technologies,
          content,
        }
      })
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return 0
      })

    return projects
  } catch (error) {
    console.error("Error reading projects:", error)
    return []
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date,
      technologies: data.technologies,
      content,
    }
  } catch {
    return null
  }
}
