import AppDispatcher from "../dispatchers/AppDispatcher.js";
import URLS from "../constants/LoginConstants.js";
const { LOGIN_USER, LOGOUT_USER } = URLS;

export default {
  loginUser: jwt => {
    // jwt = {token, username}
    var savedJwt = localStorage.getItem("jwt");

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt,
      route: "/home"
    });

    if (savedJwt !== jwt.token) {
      localStorage.setItem("jwt", jwt.token);
      localStorage.setItem("username", jwt.username);
    }
  },
  logoutUser: () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER,
      route: "/"
    });
  }
};

// include route in dispatch
