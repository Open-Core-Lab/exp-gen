import dotenv from "dotenv";

dotenv.config();

const config = {
  db: {
    filename: process.env.DB_FILENAME || "database.sqlite",
  },
  port: parseInt(process.env.PORT || "3000", 10),
  listPerPage: parseInt(process.env.LIST_PER_PAGE || "50", 10),
};

export default config;
