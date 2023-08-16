import { DeveloperResult } from "./../interfaces/developer.interface";
import { NextFunction, Request, Response } from "express";
import { client } from "../database/database";
import { ErrorApp } from "../errors/errorApp";

const emailAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    return next();
  }

  const query: DeveloperResult = await client.query(
    'SELECT * FROM "developers" WHERE "email" = $1',
    [email]
  );

  if (query.rowCount) throw new ErrorApp("Email already exists", 409);

  return next();
};

export default emailAlreadyExists;
