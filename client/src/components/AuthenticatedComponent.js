import React from "react";
import LoginStore from "../stores/LoginStore";
import { Redirect } from "react-router-dom";

export default ComposedComponent => {
  return class AuthenticatedComponent extends React.Component {
    constructor() {
      super();
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt,
        route: LoginStore.route
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState(), () => {
        this.props.history.push(this.state.route);
      });
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          user={this.state.user}
          jwt={this.state.jwt}
          userLoggedIn={this.state.userLoggedIn}
        />
      );
    }
  };
};
