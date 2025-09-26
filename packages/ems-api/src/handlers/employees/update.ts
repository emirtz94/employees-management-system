import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";

export const update =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const emp_no = parseInt(req.params.id);
      const { first_name, last_name, gender, hire_date, birth_date, dept_no } =
        req.body;

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

      let departmentId = dept_no;

      if (dept_no) {
        // check the existing dept_no
        const [rows] = await pool.query<RowDataPacket[]>(
          `SELECT dept_no FROM dept_emp WHERE emp_no = ? AND to_date IS NULL`,
          [emp_no]
        );

        const currentDeptNo = rows.length ? rows[0].dept_no : null;

        if (currentDeptNo && dept_no !== currentDeptNo) {
          departmentId = currentDeptNo;
          // terminate current department
          await pool.query(
            `UPDATE dept_emp SET to_date = CURDATE() WHERE emp_no = ? AND dept_no = ? AND to_date IS NULL`,
            [emp_no, currentDeptNo]
          );

          // assign new department
          await pool.query(
            `INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date) VALUES (?, ?, CURDATE(), NULL)`,
            [emp_no, dept_no]
          );
        }
      }

      res.status(StatusCodes.OK).json({
        emp_no,
        first_name,
        last_name,
        gender,
        hire_date,
        birth_date,
        ...(departmentId ? { dept_no: departmentId } : {}),
      });
    } catch (error) {
      const message = "Failed to update employee";
      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
