import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, ResultSetHeader } from "mysql2/promise";
import { Logger } from "pino";

export const update =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const emp_no = req.params.id;
      const { first_name, last_name, gender, hire_date, birth_date } = req.body;

      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE employees
   SET first_name = ?, last_name = ?, gender = ?, hire_date = ?, birth_date = ?
   WHERE emp_no = ?`,
        [first_name, last_name, gender, hire_date, birth_date, emp_no]
      );

      if (result.affectedRows === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Employee not found" });
      }

      res.status(StatusCodes.OK).json({
        emp_no,
        first_name,
        last_name,
        gender,
        hire_date,
        birth_date,
      });
    } catch (error) {
      const message = "Failed to update employee";
      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
