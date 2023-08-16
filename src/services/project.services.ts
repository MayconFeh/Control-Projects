import format from "pg-format";
import { DeveloperResult } from "../interfaces/developer.interface";
import { Project, ProjectResult, ProjectCreate, ProjectUpdate, ProjectRetrieve } from "../interfaces/projects.interface";
import { client } from "../database/database";

const createProject = async (payload: ProjectCreate): Promise<Project> => {
  const queryFormat: string = format(
    'INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: ProjectResult = await client.query(queryFormat);

  return query.rows[0];
};

const retrieveProject = async (projectId: string): Promise<ProjectRetrieve> => {
  const query: ProjectResult = await client.query(
    'SELECT * FROM "projects" WHERE "id" = $1;',
    [projectId]
  );

  const project = query.rows[0];

  const dev: DeveloperResult = await client.query(
    'SELECT * FROM "developers" WHERE "id" = $1;',
    [project.developerId]
  );

  const projectReturn: ProjectRetrieve = {
    projectId: project.id,
    projectName: project.name,
    projectDescription: project.description,
    projectRepository: project.repository,
    projectStartDate: project.startDate,
    projectEndDate: project.endDate,
    projectDeveloperName: dev.rows[0].name,
  };

  return projectReturn;
};

const updateProject = async (payload: ProjectUpdate, projectId: string): Promise<Project> => {
  const queryFormat: string = format(
    'UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: ProjectResult = await client.query(queryFormat, [projectId]);

  return query.rows[0];
};

export default { retrieveProject, createProject, updateProject };