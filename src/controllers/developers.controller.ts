import { Developer } from "../interfaces/developer.interface";
import { DevInfo,DeveloperInfosCreate,} from "../interfaces/developerInfos.interface";
import { Request, Response } from "express";
import developerServices from "../services/developer.services";

const createDev = async (req: Request, res: Response): Promise<Response> => {
  const dev: Developer = await developerServices.create(req.body);

  return res.status(201).json(dev);
};

const retrieveDev = async (req: Request, res: Response): Promise<Response> => {
  const dev: DevInfo = await developerServices.retrieve(req.params.id);

  return res.status(200).json(dev);
};

const updateDev = async (req: Request, res: Response): Promise<Response> => {
  const dev: Developer = await developerServices.update(
    req.body,
    req.params.id
  );
  return res.status(200).json(dev);
};

const destroyDev = async (req: Request, res: Response): Promise<Response> => {
  await developerServices.destroy(req.params.id);
  return res.status(204).json();
};

const createDevInfos = async ( req: Request, res: Response ): Promise<Response> => {
  const payload: DeveloperInfosCreate = {
    ...req.body,
    developerId: req.params.id,
  };
  const devInfos = await developerServices.createInfos(payload);
  return res.status(201).json(devInfos);
};

export default {
  createDev,
  retrieveDev,
  updateDev,
  destroyDev,
  createDevInfos,
};
