import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import ThreadsStore from "../stores/ThreadsStore.js";
import ThreadsService from "../services/ThreadsService.js";

export default AuthenticatedComponent(
  class Threads extends React.Component {
    constructor(props) {
      super(props);
      this.state = this.getThreadsState();
      this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
      if (!this.state.threads) {
        this.requestThreads();
      }

      ThreadsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      ThreadsStore.removeChangeListener(this._onChange);
    }

    _onChange() {
      this.setState(this.getThreadsState());
    }

    requestThreads() {
      ThreadsService.getThreads();
    }

    getThreadsState() {
      return {
        threads: ThreadsStore.threads
      };
    }

    render() {
      return (
        <div>
          <h1>{this.state.threads}</h1>
        </div>
      );
    }
  }
);

// on mount, gets threads from store. if state has not loaded threads, makes a request to store. on mount also adds listener to changes in threads store. if change, updates state. when unmounting, removes listener.
