import { Router } from "express";
import {
  create,
  deleteEmployee,
  getById,
  getList,
  update,
} from "../handlers/employees";
import { Pool } from "mysql2/promise";
import { Logger } from "pino";
import { createSchema, getListSchema, updateSchema } from "../schema/employees";
import { validate } from "../midleware/validate";

export const employeesRouter = (pool: Pool, logger: Logger) => {
  const router = Router();

  router.get("/", validate({ query: getListSchema }), getList(pool, logger));

  router.get("/:id", getById(pool, logger));

  router.post("/", validate({ body: createSchema }), create(pool, logger));

  router.put("/:id", validate({ body: updateSchema }), update(pool, logger));

  router.delete("/:id", deleteEmployee(pool, logger));

  return router;
};
