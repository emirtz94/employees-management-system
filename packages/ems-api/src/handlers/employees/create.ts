import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, ResultSetHeader } from "mysql2/promise";
import { Logger } from "pino";

export const create =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, gender, hire_date, birth_date } = req.body;

      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO employees (first_name, last_name, gender, hire_date, birth_date)
         VALUES (?, ?, ?, ?, ?)`,
        [first_name, last_name, gender, hire_date, birth_date]
      );

      const insertId = result.insertId;

      res.status(StatusCodes.CREATED).json({
        emp_no: insertId,
        first_name,
        last_name,
        gender,
        hire_date,
        birth_date,
      });
    } catch (error) {
      const message = "Failed to create employee";
      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
