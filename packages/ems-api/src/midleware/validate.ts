import Ajv, { Schema } from "ajv";
import addFormats from "ajv-formats";
import { RequestHandler, Request, Response, NextFunction } from "express";

const ajv = new Ajv({ coerceTypes: true });
addFormats(ajv, ["date"]); // <-- explicitly enable 'date' format

export interface ValidateOptions {
  query?: Schema;
  params?: Schema;
  body?: Schema;
}

export const validate =
  ({ query, params, body }: ValidateOptions): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate query
      if (query) {
        const validateQuery = ajv.compile(query);
        const valid = validateQuery(req.query);
        if (!valid) {
          return res.status(400).json({ errors: validateQuery.errors });
        }
        req.query = req.query; // optionally coerce
      }

      // Validate params
      if (params) {
        const validateParams = ajv.compile(params);
        const valid = validateParams(req.params);
        if (!valid) {
          return res.status(400).json({ errors: validateParams.errors });
        }
        req.params = req.params; // optionally coerce
      }

      if (body) {
        const validateBody = ajv.compile(body);
        const valid = validateBody(req.body);
        if (!valid) {
          return res.status(400).json({ errors: validateBody.errors });
        }
        req.body = req.body;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
