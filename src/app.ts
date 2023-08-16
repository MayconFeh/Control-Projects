import "express-async-errors"
import "dotenv/config";
import express, { Application, json } from "express";
import { handleError } from "./errors/handleErrors";
import { devRouter, projectRouter } from "./router";

const app: Application = express();
app.use(json())

app.use('/developers', devRouter)
app.use('/projects', projectRouter)

app.use(handleError)


export default app;
