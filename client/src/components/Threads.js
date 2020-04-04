import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import ThreadsStore from "../stores/ThreadsStore.js";
import LoginStore from "../stores/LoginStore.js";
import ThreadsService from "../services/ThreadsService.js";
import { Card, Icon, Dimmer, Loader, Button, Label } from "semantic-ui-react";
import ThreadsModal from "./ThreadsModal";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

export default AuthenticatedComponent(
  class Threads extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        threads: this.getThreadsState()
      };
      this._onChange = this._onChange.bind(this);
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

const threadCard = (thread, key) => (
  <Card fluid key={key} style={threadStyle}>
    <Card.Content
      as={Link}
      to={{ pathname: `/threads/${thread._id}`, state: thread }}
      thread={thread}
    >
      <Card.Meta>created by {thread.createdByUsername}</Card.Meta>
      <Card.Header content={`${thread.name}`} style={{ fontSize: "1.5em" }} />
      <Card.Description>
        <Button as="div" labelPosition="right">
          <Button color="teal">
            <Icon name="comments" />
            Comments
          </Button>
          <Label basic color="teal" pointing="left">
            {thread.comments}
          </Label>
        </Button>
      </Card.Description>
    </Card.Content>
  </Card>
);

const threadStyle = {
  border: "1px lightgrey solid",
  borderRadius: "10px",
  padding: "1em",
  boxShadow:
    "0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)"
};

// on mount, gets threads from store. if state has not loaded threads, makes a request to store. on mount also adds listener to changes in threads store. if change, updates state. when unmounting, removes listener.
