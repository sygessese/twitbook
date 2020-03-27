import React from "react";
import Auth from "../services/AuthService";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      error: ""
    };
  }

  signup(e) {
    e.preventDefault();
    Auth.signup(this.state.username, this.state.password, this.state.email)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(err => {
        this.setState({ error: err.response });
      });
  }

  handleChange(e) {
    console.log(e.target);
    this.setState({ [e.target.id]: event.target.value });
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Signup</h1>
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
          <div className="form-group">
            <label htmlFor="extra">Email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
              className="form-control"
              id="email"
              ref="email"
              placeholder="Email"
            />
          </div>
          <button
            type="submit"
            className="btn btn-default"
            onClick={this.signup.bind(this)}
          >
            Submit
          </button>
        </form>
        {this.state.error}
      </div>
    );
  }
}
