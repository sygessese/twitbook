import React from "react";
import Auth from "../services/AuthService";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.state.username, this.state.password)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  }

  handleChange(e) {
    console.log(e.target);
    this.setState({ [e.target.id]: event.target.value });
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange.bind(this)}
              className="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              className="form-control"
              id="password"
              ref="password"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-default"
            onClick={this.login.bind(this)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
