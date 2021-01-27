import config from '../../../src/config'

const BASE_URL = `http://${config.ipAddress}:${config.port}/`;

export default {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + "login",
  SIGNUP_URL: BASE_URL + "signup",
  UPDATE_HOME_URL: BASE_URL + "api/users/updatehome",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  UPDATE_USERNAME: "UPDATE_USERNAME"
};
