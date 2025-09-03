import { Router } from "express";
import { Pool } from "mysql2/promise";
import { Logger } from "pino";
import { getList } from "../handlers/managers";
import { validate } from "../midleware/validate";
import { getListSchema } from "../schema/managers";

export const managersRouter = (pool: Pool, logger: Logger) => {
  const router = Router();

  // list all managers
  router.get("/", validate({ query: getListSchema }), getList(pool, logger));

  //   router.get("/:id", getById(pool, logger));

  //   router.post("/", validate({ body: createSchema }), create(pool, logger));

  //   router.put("/:id", validate({ body: updateSchema }), update(pool, logger));

  return router;
};
