import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";

export const getById =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM employees WHERE emp_no = ?",
        [id]
      );

      if (!rows.length) {
        return res.status(StatusCodes.NOT_FOUND).json({});
      }

      const [departmentRows] = await pool.query<RowDataPacket[]>(
        "SELECT dept_no FROM dept_emp WHERE emp_no = ?",
        [id]
      );

      let deptNo;

      if (departmentRows.length) {
        const { dept_no } = departmentRows[0];
        deptNo = dept_no;
      }

      return res
        .status(StatusCodes.OK)
        .json({ ...rows[0], ...(deptNo ? { dept_no: deptNo } : {}) });
    } catch (error) {
      const message = "Failed to fetch single employee";
      logger.error({ error, id }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
