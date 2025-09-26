import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, ResultSetHeader } from "mysql2/promise";
import { Logger } from "pino";

export const update =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    try {
      const dept_no = parseInt(req.params.id);
      const { dept_name } = req.body;

      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE departments
   SET dept_name = ?
   WHERE dept_no = ?`,
        [dept_name, dept_no]
      );

      if (result.affectedRows === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Department not found" });
      }

      res.status(StatusCodes.OK).json({
        dept_name,
        dept_no,
      });
    } catch (error) {
      const message = "Failed to update department";

      logger.error({ error }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
