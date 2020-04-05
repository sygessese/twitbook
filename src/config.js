export default {
  port: 8000,
  dbUrl: "mongodb://localhost:27017/twitook",
  secrets: {
    jwt: "aphrodite",
    jwtExp: 3600
  }
};
