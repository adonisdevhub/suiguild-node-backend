require("dotenv").config();

export const environment = process.env.NODE_ENV;
export const port = process.env.port;
export const timezone = process.env.TZ;

export const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_USER_PWD || "",
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || ""),
};

export const corsUrl = process.env.CORS_URL;
export const logDirectory = process.env.LOG_DIR;
export const PACKAGE_ID =
  "0x9da1b3e9606fd3973b74126f67b45d35f22dcfc3ee7a32e6a463d0efbf26f8c3";
export const PROFILE_STORE =
  "0xbcc815fe7907ff0fdf55b3e1281bdaf1909b0b30ef6dfa34ce0b753c5f929096";
export const ZERO_ADDRESS =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
