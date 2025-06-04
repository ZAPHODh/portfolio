import { NextResponse } from "next/server"
import { getProjects } from "@/lib/projects"

export async function GET() {

  const projects = await getProjects()
  console.log("Projects fetched:", projects)
  return NextResponse.json(projects)

}
