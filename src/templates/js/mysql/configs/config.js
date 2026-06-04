const config = {
  db: {
    host: process.env.localhost,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  },
  port: process.env.port,
  listPerPage: process.env.listPerPage,
};
export default config;
