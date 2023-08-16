import { Project, ProjectRetrieve } from "./../interfaces/projects.interface";
import { Request, Response } from "express";
import projectServices from "../services/project.services";

const createProject = async (req: Request, res: Response): Promise<Response> => {
  const project: Project = await projectServices.createProject(req.body);
  return res.status(201).json(project);
};

const readProject = async (req: Request, res: Response): Promise<Response> => {
  const project: ProjectRetrieve = await projectServices.retrieveProject(
    req.params.id
  );
  return res.status(200).json(project);
};

const updateProject = async (req: Request, res: Response): Promise<Response> => {
  const project: Project = await projectServices.updateProject(
    req.body,
    req.params.id
  );
  return res.status(200).json(project);
};

export default { createProject, readProject, updateProject };
