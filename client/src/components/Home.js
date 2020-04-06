import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import LoginStore from "../stores/LoginStore";
import PostsStore from "../stores/PostsStore";
import UsersServices from "../services/UsersServices";
import { Feed } from "semantic-ui-react";
import styled from "styled-components";
import TimeAgo from "react-timeago";

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
              paddingTop: "7%",
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingBottom: "10%"
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
              paddingTop: "7em",
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingBottom: "10%"
            }}
          >
            <h1>Hello{this.props.user ? `, ${this.props.user}!` : ""}</h1>
            <Feed>
              {this.state.feed
                ? this.state.feed.map((item, index) => {
                    return feedItem(item.itemId, index, item.itemModel);
                  })
                : ""}
            </Feed>
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

const feedItem = (item, index, model) => {
  return (
    <Feed.Event key={index} style={feedStyle}>
      <Feed.Label>
        <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{item.createdBy.username}</Feed.User>{" "}
          {model === "thread" ? "created a new thread" : "left a comment"}
          <Feed.Date>
            <TimeAgo date={item.createdAt} />
          </Feed.Date>
        </Feed.Summary>
        <Feed.Extra>{model === "thread" ? item.name : item.content}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
};

const feedStyle = {
  border: "1px lightgrey solid",
  borderRadius: "10px",
  padding: "1em",
  marginTop: "2em",
  boxShadow:
    "0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)"
};

// home logic eventually: push post/thread id's into user's feed
