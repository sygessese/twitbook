export default {
  port: 8000,
  dbUrl: "mongodb://localhost:27017/twitook",
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: "100d"
  }
};
