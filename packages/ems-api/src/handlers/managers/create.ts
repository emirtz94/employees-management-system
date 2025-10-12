import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";

export const create =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const { emp_no, dept_no } = req.body;
      const from_date = moment.utc().format("YYYY-MM-DD");

      // check if an employee is department employee
      const [departmentEmployee] = await pool.execute<RowDataPacket[]>(
        `SELECT * FROM dept_emp WHERE emp_no = ? AND dept_no = ?`,
        [emp_no, dept_no]
      );

      if (!departmentEmployee || !departmentEmployee.length) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            "User cannot be assigned to a manager position unless they belong to that department",
        });
      }

      // TODO define trigger if move manager from dept 1 to dept 2 it will be manager for both of those departments
      // trigger should remove manager from dept 1 if we have assigned it to dept 2
      const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO dept_manager (emp_no, dept_no, from_date, to_date)
         VALUES (?, ?, ?, NULL)
         ON DUPLICATE KEY UPDATE from_date = VALUES(from_date), to_date = NULL`,
        [emp_no, dept_no, from_date]
      );

      const { affectedRows } = result;

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
