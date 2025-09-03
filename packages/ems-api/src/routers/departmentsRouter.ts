import { Router } from "express";
import { Pool } from "mysql2/promise";
import { Logger } from "pino";
import { validate } from "../midleware/validate";
import { create, getById, getList, update } from "../handlers/departments";
import { createSchema, getListSchema, updateSchema } from "../schema/departments";

export const departmentsRouter = (pool: Pool, logger: Logger) => {
  const router = Router();
  router.get(
    "/",
    validate({ query: getListSchema }),
    getList(pool, logger)
  );

  router.get("/:id", getById(pool, logger));

  router.post(
    "/",
    validate({ body: createSchema }),
    create(pool, logger)
  );

  router.put(
    "/:id",
    validate({ body: updateSchema }),
    update(pool, logger)
  );

  return router;
};
