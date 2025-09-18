import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";

export const getList =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    const { pageSize, pageNumber, orderBy, sort } = req.query;
    try {
      const allowedOrderColumns = [
        "emp_no",
        "first_name",
        "last_name",
        "hire_date",
        "birth_date",
        "gender",
      ];

      const pageSizeSql = Number(pageSize);
      const pageNumberSql = Number(pageNumber);
      const offset = (pageNumberSql - 1) * pageSizeSql;

      const sqlOrderBy = allowedOrderColumns.includes(orderBy as string)
        ? orderBy
        : "emp_no";
      const sqlSort = sort || "DESC";

      const [countRows] = await pool.query<RowDataPacket[]>(
        "SELECT COUNT(*) AS total FROM employees"
      );

      const total = countRows[0].total as number;

      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT * FROM employees
   ORDER BY ${sqlOrderBy} ${sqlSort}
   LIMIT ? OFFSET ?`,
        [pageSizeSql, offset]
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
      const message = "Failed to fetch list of employees";
      logger.error({ error, pageSize, pageNumber, orderBy }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
