import express, { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pino, { Logger } from "pino";
import pinoHttp from "pino-http";
import { employeesRouter } from "./routers/employeesRouter";
import { createDBPool } from "./db";
import { Pool } from "mysql2/promise";
import dotenv from "dotenv";
import { departmentsRouter } from "./routers/departmentsRouter";
import { managersRouter } from "./routers/managersRouter";

dotenv.config();

const createExpressApp = () => {
  console.log({
    VERSION: process.env.VERSION,
    PORT: process.env.PORT,
  });
  const app: Express = express();
  const pool: Pool = createDBPool();

  const logger: Logger = pino();
  app.use(pinoHttp({ logger }));


  app.use(express.json());

  app.use(`/${process.env.VERSION}/employees`, employeesRouter(pool, logger));
  app.use(`/${process.env.VERSION}/departments`, departmentsRouter(pool, logger));
  app.use(`/${process.env.VERSION}/managers`, managersRouter(pool, logger));

  app.get("/healthcheck", (req: Request, res: Response) => {
    try {
      res
        .status(StatusCodes.OK)
        .json({ message: "Service is up and running!" });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Service is down!" });
    }
  });

  app.listen(process.env.PORT, () => {
    logger.info("App is running on port 3000");
  });
};

createExpressApp();
