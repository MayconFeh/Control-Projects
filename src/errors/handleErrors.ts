import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "./errorApp";

const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorApp) {
    return res.status(err.codestatus).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal Server Error." });
};

export { handleError };
