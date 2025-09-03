import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import { Pool } from "mysql2/promise";
import { Logger } from "pino";

export const promoteManager =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const { emp_no, dept_no } = req.body;
      const from_date = moment.utc().format("YYYY-MM-DD");

      const [result] = await pool.execute(
        `INSERT INTO dept_manager (emp_no, dept_no, from_date, to_date)
         VALUES (?, ?, ?, NULL)
         ON DUPLICATE KEY UPDATE from_date = VALUES(from_date), to_date = NULL`,
        [emp_no, dept_no, from_date]
      );

      const { affectedRows } = result as any; // ResultSetHeader

      if (affectedRows === 0) {
        // Nothing inserted or updated → probably invalid emp_no/dept_no
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "No rows affected. Check emp_no and dept_no." });
      }

      res.status(StatusCodes.OK).json({
        emp_no,
        dept_no,
        from_date,
      });
    } catch (error) {
      const message = "Failed to promote employee to a manager";
      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
