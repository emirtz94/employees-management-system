import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Pool, RowDataPacket } from "mysql2/promise";
import { Logger } from "pino";

export const getById =
  (pool: Pool, logger: Logger) => async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM departments WHERE dept_no = ?",
        [id]
      );

      if (!rows.length) {
        return res.status(StatusCodes.NOT_FOUND).json({});
      }

      return res.status(StatusCodes.OK).json(rows[0]);
    } catch (error) {
      const message = "Failed to fetch single department";
      logger.error({ error, id }, message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  };
