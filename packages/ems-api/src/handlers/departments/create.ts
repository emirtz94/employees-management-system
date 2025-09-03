import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, ResultSetHeader } from "mysql2/promise";
import { Logger } from "pino";

export const create =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const { dept_name } = req.body;

      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO departments (dept_name)
         VALUES (?)`,
        [dept_name]
      );

      const insertId = result.insertId;

      res.status(StatusCodes.CREATED).json({
        dept_no: insertId,
        dept_name,
      });
    } catch (error) {
      const message = "Failed to create department";
      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
