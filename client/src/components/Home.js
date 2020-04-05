import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import LoginStore from "../stores/LoginStore";
import PostsStore from "../stores/PostsStore";
import UsersServices from "../services/UsersServices";
import styled from "styled-components";

export default AuthenticatedComponent(
  class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        feed: this.getFeedState()
      };
      this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
      this.reroute();
      if (!this.state.feed) {
        this.requestFeed();
      }
      PostsStore.addChangeListener(this._onChange);
      LoginStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      PostsStore.removeChangeListener(this._onChange);
      LoginStore.removeChangeListener(this._onChange);
    }

    // check if buggy when reversed
    _onChange() {
      this.setState({ feed: this.getFeedState() });
      this.reroute();
    }

    // affirms user is still logged in
    reroute() {
      if (!LoginStore.isLoggedIn()) {
        this.props.history.push("/");
      }
    }

    requestFeed() {
      UsersServices.getHomePage();
    }

    getFeedState() {
      return PostsStore.feed;
    }

    render() {
      if (!LoginStore.isLoggedIn()) {
        return (
          <div
            style={{
              marginTop: "7%",
              marginLeft: "10%",
              marginRight: "10%",
              marginBottom: "10%"
            }}
          >
            <FrontPageLogo> Twitook </FrontPageLogo>
          </div>
        );
      } else {
        return (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              marginTop: "5em",
              paddingLeft: "10%",
              paddingRight: "10%",
              marginBottom: "10%"
            }}
          >
            <h1>Hello{this.props.user ? `, ${this.props.user}!` : ""}</h1>
          </div>
        );
      }
    }
  }
);

const FrontPageLogo = styled.h1`
  font-size: 15vw;
  font-family: alegrey;
  text-align: center;
  margin-right: 5%;
`;

// home logic eventually: push post/thread id's into user's feed
