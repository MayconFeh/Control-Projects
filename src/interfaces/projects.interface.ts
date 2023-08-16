import { QueryResult } from "pg"

interface Project {
    id: number,
    name: string,
    description: string,
    repository: string,
    startDate: Date,
    endDate?: Date | undefined | null,
    developerId?: number | undefined | null
}

type ProjectCreate = Omit<Project, "id" | "developerId">
type ProjectUpdate = Partial<ProjectCreate>
type ProjectResult = QueryResult<Project>

interface ProjectRetrieve {
    projectId: number,
    projectName: string,
    projectDescription: string,
    projectRepository: string,
    projectStartDate: Date,
    projectEndDate: Date | null | undefined,
    projectDeveloperName: string
}

export {Project,ProjectCreate,ProjectUpdate,ProjectResult,ProjectRetrieve}