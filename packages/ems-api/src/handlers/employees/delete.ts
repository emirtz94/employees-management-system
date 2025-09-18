import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, ResultSetHeader } from "mysql2/promise";
import { Logger } from "pino";

export const deleteEmployee =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Employee ID is required" });
      }

      const [result] = await pool.query<ResultSetHeader>(
        `DELETE FROM employees WHERE emp_no = ?`,
        [id]
      );

      if (result.affectedRows === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `Employee with id ${id} not found` });
      }

      res.status(StatusCodes.NO_CONTENT).send({});
    } catch (error) {
      const message = "Failed to create employee";
      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
