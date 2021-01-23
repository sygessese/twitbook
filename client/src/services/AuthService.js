import request from "reqwest";
import when from "when";
import URLS from "../constants/LoginConstants";
const { LOGIN_URL, SIGNUP_URL, UPDATE_HOME_URL } = URLS;
import LoginActions from "../actions/LoginActions";

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

  logout() {
    // call logout func on api
    LoginActions.logoutUser();
  }

  // accepts a promise (server's response to login attempt)
  // returns a success callback - which passes server's response to Login Action
  handleAuth(loginPromise) {
    return loginPromise
    .then(function(response) {
      LoginActions.loginUser(response);
      console.log('logged in')
      return response;
    })
    .catch((e) => {
      console.log(e) 
      // LoginActions.logoutUser
      return e
    });
  }
}

export default new AuthService();
