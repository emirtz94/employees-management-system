import { EmployeeManagementSDK } from "ems-sdk";

export const emsSDK = new EmployeeManagementSDK(process.env.BASE_URL as string);
