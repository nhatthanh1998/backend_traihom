import { Router } from 'express'
import * as apiRouter from "./routes"

export const api = Router();
api.use("/categories", apiRouter.categoryRouter);