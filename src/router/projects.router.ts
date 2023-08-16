import { Router } from "express";
import { idExists, verifyIdProject } from "../middlewares";
import projectsController from "../controllers/projects.controller";

const projectRouter: Router = Router();

projectRouter.use("/:id" ,verifyIdProject);

projectRouter.post("", idExists,projectsController.createProject);
projectRouter.get("/:id" ,projectsController.readProject);
projectRouter.patch("/:id", idExists,projectsController.updateProject);

export default projectRouter;
