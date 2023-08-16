import { client } from "../database/database";
import { ErrorApp } from "../errors/errorApp";
import { ProjectResult } from "../interfaces/projects.interface";
import { Request, Response, NextFunction } from "express";

const idExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { developerId } = req.body;

  const query: ProjectResult = await client.query(
    'SELECT * FROM "developers" WHERE "id" = $1',
    [developerId]
  );

  if (!query.rowCount) {
    throw new ErrorApp("Developer not found.", 404);
  }

  return next();
};

export default idExists;
