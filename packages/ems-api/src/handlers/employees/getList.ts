import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";
import { getEmployeeListQuery } from "../../query/employees";

export const getList =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    const { pageSize, pageNumber, orderBy, sort, dept_no, search } = req.query;

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

      const { sql, params } = getEmployeeListQuery({ dept_no: parseInt(dept_no as string), search: search as string });

      const countQuery = `SELECT COUNT(*) AS total ${sql}`;
      const [countRows] = await pool.query<RowDataPacket[]>(countQuery, params);
      const total = countRows[0].total as number;

      let query = `SELECT e.* ${sql} ORDER BY ${sqlOrderBy} ${sqlSort} LIMIT ? OFFSET ?`;
      params.push(pageSizeSql, offset);

      const [rows] = await pool.query<RowDataPacket[]>(query, params);

      // const [countRows] = await pool.query<RowDataPacket[]>(
      //   "SELECT COUNT(*) AS total FROM employees"
      // );

      // const total = countRows[0].total as number;

      // let query = `SELECT e.* FROM employees e`;

      // const params: any[] = [];

      // if (dept_no) {
      //   query += `
      //     JOIN dept_emp de ON e.emp_no = de.emp_no AND de.dept_no = ? AND de.to_date IS NULL
      //   `;
      //   params.push(dept_no);
      // }

      // const whereConditions: string[] = [];

      // if (search) {
      //   whereConditions.push(
      //     `(LOWER(e.first_name) LIKE ? OR LOWER(e.last_name) LIKE ?)`
      //   );
      //   const searchTerm = `%${(search as string).toLowerCase()}%`;
      //   params.push(searchTerm, searchTerm);
      // }

      // if (whereConditions.length > 0) {
      //   query += ` WHERE ` + whereConditions.join(" AND ");
      // }

      // query += ` ORDER BY ${sqlOrderBy} ${sqlSort} LIMIT ? OFFSET ?`;

      // params.push(pageSizeSql, offset);

      // const [rows] = await pool.query<RowDataPacket[]>(query, params);

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
