import mysql, { Pool } from "mysql2/promise";

export const createDBPool = (): Pool => {
  try {
    return mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      dateStrings: true, // forces DATE/DATETIME to return as "YYYY-MM-DD"
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
