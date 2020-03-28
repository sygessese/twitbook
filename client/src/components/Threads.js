import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import ThreadsStore from "../stores/ThreadsStore.js";
import LoginStore from "../stores/LoginStore.js";
import ThreadsService from "../services/ThreadsService.js";
import { Card, Icon } from "semantic-ui-react";
import ThreadsModal from "./ThreadsModal";

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
      if (!this.state.threads) {
        this.requestThreads();
      }

      ThreadsStore.addChangeListener(this._onChange);
      LoginStore.addChangeListener(this.reroute);
    }

    componentWillUnmount() {
      ThreadsStore.removeChangeListener(this._onChange);
    }

    _onChange() {
      this.setState({ threads: this.getThreadsState() });
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
      console.log(this.state);
      if (this.state.threads === "") {
        return <h1>loading...</h1>;
      } else {
        return (
          <div
            style={{
              "margin-top": "7%",
              "margin-left": "10%",
              "margin-right": "10%",
              "margin-bottom": "10%"
            }}
          >
            <ThreadsModal />
            {this.state.threads
              .reverse()
              .map((thread, key) => threadCard(thread, key))}
          </div>
        );
      }
    }
  }
);

const threadCard = (thread, key) => (
  <Card fluid key={key}>
    <Card.Content header={`${thread.name}`} href={`/${thread._id}`} />
    <Card.Content meta={`created by ${thread.createdByUsername}`} />
    <Card.Content description={`${thread.description}`} />
    <Card.Content extra>
      <Icon name="comments" /> {`${thread.comments}`}
    </Card.Content>
  </Card>
);

// on mount, gets threads from store. if state has not loaded threads, makes a request to store. on mount also adds listener to changes in threads store. if change, updates state. when unmounting, removes listener.
