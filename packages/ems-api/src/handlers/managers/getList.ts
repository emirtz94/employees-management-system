import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";

export const getList =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    const { pageSize, pageNumber, dept_no } = req.query;
    try {
      const pageSizeSql = Number(pageSize);
      const pageNumberSql = Number(pageNumber);
      const offset = (pageNumberSql - 1) * pageSizeSql;

      let sql = `
        FROM dept_manager dm
        INNER JOIN employees e on dm.emp_no = e.emp_no
        INNER JOIN departments d on dm.dept_no = d.dept_no
      `;

      const params: any[] = [];

      if (dept_no) {
        // fetch all managers state for particular department
        sql += ` WHERE dm.dept_no = ?`;
        params.push(parseInt(dept_no as string));
      } else {
        // fetch current managers
        sql += `
          WHERE dm.to_date IS NULL OR dm.to_date > CURDATE()
        `;
      }

      const [countRows] = await pool.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS total ${sql}`, params
      );

      const total = countRows[0].total as number;

      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT e.emp_no, e.first_name, e.last_name, dm.from_date, dm.to_date, d.dept_name, d.dept_no ${sql}`,
        [...params, pageSizeSql, offset]
      );

      return res.status(StatusCodes.OK).json({
        meta: {
          pageNumber: pageNumberSql,
          pageSize: pageSizeSql,
          total,
          totalPages: Math.ceil(total / pageSizeSql),
        },
        data: rows,
      });
    } catch (error) {
      const message = "Failed to fetch list of managers";
      logger.error({ error, pageSize, pageNumber }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
