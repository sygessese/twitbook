import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import LoginStore from "../stores/LoginStore";
import PostsStore from "../stores/PostsStore";
import UsersServices from "../services/UsersServices";
import { Feed, Button, Tab } from "semantic-ui-react";
import TimeAgo from "react-timeago";
import Identicon from "react-identicons";
import Login from "./Login";
import Signup from "./Signup";

export default AuthenticatedComponent(
  class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.getFeedState();
      this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
      this.reroute();
    }

    componentDidMount() {
      this.requestFeed();
      PostsStore.addChangeListener(this._onChange);
      LoginStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      PostsStore.removeChangeListener(this._onChange);
      LoginStore.removeChangeListener(this._onChange);
    }

    // check if buggy when reversed
    _onChange() {
      this.setState(this.getFeedState());
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

    moreFeed() {
      var offset = this.state.feed.length;
      var lastId = this.state.feed[offset - 1]._id;
      UsersServices.moreHomePage(offset, lastId);
    }

    getFeedState() {
      return { feed: PostsStore.feed, endOfFeed: PostsStore.endOfFeed };
    }

    render() {
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
            {/* <div
              style={{
                marginBottom: "5em",
                display: "flex",
                justifyContent: "center"
              }}
            >
              {this.state.endOfFeed || this.state.feed.length < 5 ? (
                "You've reached the end of your feed!"
              ) : (
                <Button
                  style={{ width: "100%", marginTop: "1em" }}
                  onClick={this.moreFeed.bind(this)}
                >
                  More ...{" "}
                </Button>
              )}
            </div> */}
          </div>
        );
      }
    }
);


const feedItem = (item, index, model) => {
  if (!model) {
    return "";
  }
  return (
    <Feed.Event key={index} style={feedStyle}>
      <Feed.Label style={{ marginTop: 9, marginLeft: 8 }}>
        <Identicon size={30} string={item.createdBy._id} />
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

