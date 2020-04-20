import React from "react";
import LoginStore from "../stores/LoginStore";
import PostsStore from "../stores/PostsStore";
import { NavLink } from "react-router-dom";
import AuthService from "../services/AuthService";
import { Menu, Input, Dropdown } from "semantic-ui-react";

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super();
    this.state = {
      userLoggedIn: this._getLoginState(),
      activeThread: PostsStore.thread,
      mobile: false
    };
    this.changeListener = this._onChange.bind(this);
  }

  _getLoginState() {
    return LoginStore.isLoggedIn();
  }

  componentDidMount() {
    LoginStore.addChangeListener(this.changeListener);
    PostsStore.addChangeListener(this.changeListener);
    this.setState({ mobile: this.checkMobile() });
  }

  _onChange() {
    this.setState({
      userLoggedIn: this._getLoginState(),
      activeThread: PostsStore.thread
    });
  }

  checkMobile() {
    return window.innerWidth < 700;
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
    PostsStore.removeChangeListener(this.changeListener);
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
        <Menu
          color="teal"
          fixed="top"
          size={this.state.mobile ? "small" : "large"}
        >
          <Menu.Item as={Nav} to="/home" name="Home" />
          <Menu.Item as={Nav} to="/threads" name="Threads" />
          {this.state.activeThread && !this.state.mobile ? (
            <Menu.Item active name={this.state.activeThread.name} />
          ) : (
            ""
          )}
          <Menu.Menu position="right">
            {/* <Menu.Item>
              <Input
                style={{ width: "9em" }}
                className="icon"
                icon="search"
                placeholder="Find friends"
              />
            </Menu.Item> */}
            <Dropdown item text={LoginStore.user} simple>
              <Dropdown.Menu>
                <Dropdown.Item as={Nav} to="/settings" name="settings">
                  Settings
                </Dropdown.Item>
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
