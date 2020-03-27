import request from "reqwest";
import when from "when";
import URLS from "../constants/LoginConstants";
const { LOGIN_URL, SIGNUP_URL } = URLS;
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

  logout() {
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

  // check what return object is
  handleAuth(loginPromise) {
    return loginPromise.then(function(response) {
      //var jwt = response.id_token;
      LoginActions.loginUser(response);
      return true;
    });
  }
}

export default new AuthService();
