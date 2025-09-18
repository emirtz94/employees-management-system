export const getListSchema = {
  type: "object",
  properties: {
    pageSize: { type: "integer", enum: [25, 50, 100], default: 25 },
    pageNumber: { type: "integer", minimum: 1, default: 1 },
    sort: { type: "string", enum: ["ASC", "DESC"], default: "DESC" },
    orderBy: {
      type: "string",
      enum: ["emp_no", "first_name", "last_name", "hire_date", "gender", "birth_date"],
      default: "emp_no",
    },
  },
  required: ["pageNumber", "pageSize"],
  additionalProperties: false,
};

export const createSchema = {
  type: "object",
  properties: {
    first_name: { type: "string", minLength: 1 },
    last_name: { type: "string", minLength: 1 },
    gender: { type: "string", enum: ["M", "F"] },
    hire_date: { type: "string", format: "date" },
    birth_date: { type: "string", format: "date" },
  },
  required: ["first_name", "last_name", "gender", "hire_date", "birth_date"],
  additionalProperties: false,
};

export const updateSchema = createSchema;