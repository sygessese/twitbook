const developmentIP = "localhost"
const productionIP = "18.217.73.238"

// running in docker ? 
// mongodb://mongo:27017/twitook :
// mongodb://localhost:27017/twitook 

export default {
  port: 8000,
  dbUrl: "mongodb://mongo:27017/twitook",
  secrets: {
    jwt: "aphrodite",
    jwtExp: "7d"
  },
  ipAddress: process.env.NODE_ENV === 'development' ? developmentIP : productionIP,
};
