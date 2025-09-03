import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";

export const getList =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    const { pageSize, pageNumber } = req.query;
    try {
      const pageSizeSql = Number(pageSize);
      const pageNumberSql = Number(pageNumber);
      const offset = (pageNumberSql - 1) * pageSizeSql;

      const [countRows] = await pool.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS total
        FROM employees e
        INNER JOIN dept_manager dm ON e.emp_no = dm.emp_no
        INNER JOIN departments d ON dm.dept_no = d.dept_no
        WHERE dm.to_date IS NULL OR dm.to_date > CURDATE();
        `
      );

      const total = countRows[0].total as number;

      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT e.emp_no, e.first_name, e.last_name, d.dept_name FROM employees
    INNER JOIN dept_manager dm ON e.emp_no = dm.emp_no
    INNER JOIN departments d ON dm.dept_no = d.dept_no
    WHERE dm.to_date IS NULL OR dm.to_date > CURDATE()
    LIMIT ? OFFSET ?`,
        [pageSizeSql, offset]
      );

      return res.status(StatusCodes.OK).json({
        pageNumber: pageNumberSql,
        pageSize: pageSizeSql,
        total,
        totalPages: Math.ceil(total / pageSizeSql),
        data: rows,
      });
    } catch (error) {
      const message = "Failed to fetch list of departments";
      logger.error({ error, pageSize, pageNumber }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
