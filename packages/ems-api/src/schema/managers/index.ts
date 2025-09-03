export const getListSchema = {
  type: "object",
  properties: {
    pageSize: { type: "integer", enum: [25, 50, 100], default: 25 },
    pageNumber: { type: "integer", minimum: 1, default: 1 },
  },
  required: ["pageNumber", "pageSize"],
  additionalProperties: false,
};
