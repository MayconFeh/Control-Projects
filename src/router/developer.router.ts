import { Router } from "express";
import { devInfoAlreadyExists, emailAlreadyExists, verifyIdExists, verifyOSExists } from "../middlewares";
import developersController from "../controllers/developers.controller";

const devRouter: Router = Router();

devRouter.use("/:id", verifyIdExists);

devRouter.post("",emailAlreadyExists, developersController.createDev);

devRouter.get("/:id", developersController.retrieveDev);
devRouter.patch("/:id", emailAlreadyExists, developersController.updateDev);
devRouter.delete("/:id", developersController.destroyDev);

devRouter.post("/:id/infos", verifyOSExists,devInfoAlreadyExists,developersController.createDevInfos);

export default devRouter;
