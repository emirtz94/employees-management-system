import mysql, { Pool } from "mysql2/promise";

export const createDBPool = (): Pool => {
  try {
    return mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
