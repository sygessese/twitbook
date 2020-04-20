import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import ThreadsStore from "../stores/ThreadsStore.js";
import LoginStore from "../stores/LoginStore.js";
import ThreadsService from "../services/ThreadsService.js";
import {
  Card,
  Icon,
  Dimmer,
  Loader,
  Button,
  Label,
  Divider,
  Confirm
} from "semantic-ui-react";
import ThreadsModal from "./ThreadsModal";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import Popup from "./FollowPopup";
import Identicon from "react-identicons";

export default AuthenticatedComponent(
  class Threads extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        threads: this.getThreadsState()
      };
      this._onChange = this._onChange.bind(this);
      // this.deleteThread = this.deleteThread.bind(this);
    }

    componentDidMount() {
      this.reroute();
      this.requestThreads();

      ThreadsStore.addChangeListener(this._onChange);
      LoginStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      ThreadsStore.removeChangeListener(this._onChange);
      LoginStore.removeChangeListener(this._onChange);
    }

    _onChange() {
      this.setState({ threads: this.getThreadsState() });
      this.reroute();
    }

    reroute() {
      if (!LoginStore.isLoggedIn()) {
        this.props.history.push("/");
      }
    }

    requestThreads() {
      ThreadsService.getThreads();
    }

    getThreadsState() {
      return ThreadsStore.threads;
    }

    render() {
      if (!this.state.threads) {
        return (
          <Dimmer active inverted>
            <Loader size="medium">Loading</Loader>
          </Dimmer>
        );
      } else {
        return (
          <div
            style={{
              paddingTop: "7em",
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingBottom: "10%"
            }}
          >
            <ThreadsModal />
            <Card.Group>
              {this.state.threads.map((thread, key) => threadCard(thread, key))}
            </Card.Group>
          </div>
        );
      }
    }
  }
);

const threadStyle = {
  border: "1px lightgrey solid",
  borderRadius: "10px",
  padding: "1em",
  boxShadow:
    "0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)"
};

const threadCard = (thread, key) => (
  <Card fluid key={key} style={threadStyle}>
    <Card.Content>
      <Card.Header
        content={`${thread.name}`}
        style={{ fontSize: "1.5em", textTransform: "capitalize" }}
        as={Link}
        to={{ pathname: `/threads/${thread._id}`, state: thread }}
        thread={thread}
      />

      <Divider clearing style={{ marginTop: 0 }} />

      <Card.Description
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        <div style={{ fontSize: "1em", marginBottom: "1em" }}>
          created by
          <span
            style={{
              textTransform: "capitalize",
              fontSize: "1.1em",
              marginLeft: 5,
              marginRight: 5,
              fontWeight: 800
            }}
          >
            <Identicon size={15} string={thread.createdBy._id} />
            <Popup
              id={thread.createdBy._id}
              username={" " + thread.createdBy.username}
            />
          </span>
          <TimeAgo date={thread.createdAt} style={{ fontStyle: "italic" }} />
        </div>
        <Button
          labelPosition="right"
          as={Link}
          to={{ pathname: `/threads/${thread._id}`, state: thread }}
          thread={thread}
        >
          <Button color="teal">
            <Icon name="comments" />
            Comments
          </Button>
          <Label basic color="blue" pointing="left">
            {thread.comments}
          </Label>
        </Button>
      </Card.Description>
    </Card.Content>
  </Card>
);

// on mount, gets threads from store. if state has not loaded threads, makes a request to store. on mount also adds listener to changes in threads store. if change, updates state. when unmounting, removes listener.
