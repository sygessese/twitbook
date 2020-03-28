import React from "react";
import LoginStore from "../stores/LoginStore";
import { Link, NavLink } from "react-router-dom";
import AuthService from "../services/AuthService";
import { Menu, Input, Dropdown } from "semantic-ui-react";

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super();
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="container">
        {this.headerItems}
        {this.props.children}
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return (
        <Menu color="teal" fluid>
          <Menu.Item as={Nav} to="/login" name="Login" />
          <Menu.Item as={Nav} to="/signup" name="signup" />
        </Menu>
      );
    } else {
      return (
        <Menu color="teal" fluid>
          <Menu.Item as={Nav} to="/home" name="Home" />
          <Menu.Item as={Nav} to="/threads" name="Threads" />

          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                className="icon"
                icon="search"
                placeholder="Find friends..."
              />
            </Menu.Item>
            <Dropdown item text={LoginStore.user} simple>
              <Dropdown.Menu>
                <Dropdown.Item name="logout" onClick={this.logout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      );
    }
  }
}

// handles active class
const Nav = props => <NavLink exact {...props} activeClassName="active" />;
