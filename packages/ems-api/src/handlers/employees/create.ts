import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, ResultSetHeader } from "mysql2/promise";
import { Logger } from "pino";

export const create =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, gender, hire_date, birth_date, dept_no } =
        req.body;

      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO employees (first_name, last_name, gender, hire_date, birth_date)
         VALUES (?, ?, ?, ?, ?)`,
        [first_name, last_name, gender, hire_date, birth_date]
      );

      const emp_no = result.insertId;

      if (dept_no) {
        await pool.query<ResultSetHeader>(
          `INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date)
   VALUES (?, ?, ?, NULL)`,
          [emp_no, dept_no, hire_date] // from_date = hire_date, to_date = NULL = active
        );
      }

      res.status(StatusCodes.CREATED).json({
        emp_no,
        first_name,
        last_name,
        gender,
        hire_date,
        birth_date,
        ...(dept_no ? { dept_no } : {}),
      });
    } catch (error) {
      const message = "Failed to create employee";
      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
