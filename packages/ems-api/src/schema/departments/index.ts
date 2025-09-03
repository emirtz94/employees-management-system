export const getListSchema = {
  type: "object",
  properties: {
    pageSize: { type: "integer", enum: [25, 50, 100], default: 25 },
    pageNumber: { type: "integer", minimum: 1, default: 1 },
    sort: { type: "string", enum: ["ASC", "DESC"], default: "DESC" },
    orderBy: {
      type: "string",
      enum: ["dept_no", "dept_name"],
      default: "dept_no",
    },
  },
  required: ["pageNumber", "pageSize"],
  additionalProperties: false,
};

export const createSchema = {
  type: "object",
  properties: {
    dept_name: { type: "string", minLength: 1 },
  },
  required: ["dept_name"],
  additionalProperties: false,
};

export const updateSchema = createSchema;
