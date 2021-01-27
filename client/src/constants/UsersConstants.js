import config from '../../../src/config'

const BASE_URL = `${config.ipAddress}:${config.port}/`;

export default {
  BASE_URL: BASE_URL,
  FOLLOW_URL: BASE_URL + "api/users/follow/",
  UPDATE_URL: BASE_URL + "api/users/",
  FOLLOW_USER: "FOLLOW_USER",
  UPDATE_USER: "UPDATE_USER"
};
