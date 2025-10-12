import { Router } from "express";
import { Pool } from "mysql2/promise";
import { Logger } from "pino";
import { createSchema, getListSchema } from "../schema/managers";
import { validate } from "../midleware/validate";
import { getList, create } from "../handlers/managers";

export const managersRouter = (pool: Pool, logger: Logger) => {
  const router = Router();

  // list all managers
  router.get("/", validate({ query: getListSchema }), getList(pool, logger));

  // promote emp to manager
  router.post(
    "/",
    validate({ body: createSchema }),
    create(pool, logger)
  );

  return router;
};
