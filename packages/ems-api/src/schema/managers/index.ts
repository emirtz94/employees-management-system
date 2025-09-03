export const getListSchema = {
  type: "object",
  properties: {
    pageSize: { type: "integer", enum: [25, 50, 100], default: 25 },
    pageNumber: { type: "integer", minimum: 1, default: 1 },
  },
  required: ["pageNumber", "pageSize"],
  additionalProperties: false,
};

export const createSchema = {
  type: "object",
  properties: {
    emp_no: { type: "integer" },
    dept_no: { type: "integer" },
  },
  required: ["emp_no", "dept_no"],
  additionalProperties: false,
};
