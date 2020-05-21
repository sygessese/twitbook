import request from "reqwest";
import when from "when";
import URLS from "../constants/LoginConstants";
const { LOGIN_URL, SIGNUP_URL, UPDATE_HOME_URL } = URLS;
import LoginActions from "../actions/LoginActions";
import LoginStore from "../stores/LoginStore";

class AuthService {
  login(username, password) {
    return this.handleAuth(
      when(
        request({
          url: LOGIN_URL,
          method: "POST",
          crossOrigin: true,
          type: "json",
          data: {
            username,
            password
          }
        })
      )
    );
  }

  logout() {
    // call logout func on api
    LoginActions.logoutUser();
  }

  signup(username, password, email) {
    return this.handleAuth(
      when(
        request({
          url: SIGNUP_URL,
          method: "POST",
          crossOrigin: true,
          type: "json",
          data: {
            username,
            password,
            email
          }
        })
      )
    );
  }

  // accepts a promise (server's response to login attempt)
  // returns a success callback - which passes server's response to Login Action
  handleAuth(loginPromise) {
    return loginPromise.then(function(response) {
      LoginActions.loginUser(response);
      return true;
    });
  }
}

export default new AuthService();
