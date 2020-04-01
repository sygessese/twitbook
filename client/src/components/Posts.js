import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import PostsStore from "../stores/PostsStore.js";
import LoginStore from "../stores/LoginStore.js";
import PostsServices from "../services/PostsServices.js";
import {
  Comment,
  Segment,
  Header,
  Icon,
  Dimmer,
  Loader
} from "semantic-ui-react";
import PostsModal from "./PostsModal";
import PostsActions from "../actions/PostsActions";

export default AuthenticatedComponent(
  class Posts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        thread: ""
      };
      this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
      this.reroute();
      // if (!this.state.posts) {
      this.requestPosts(this.props.match.params.thread_id); // new API call each mount?
      // }

      PostsStore.addChangeListener(this._onChange);
      LoginStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      PostsStore.removeChangeListener(this._onChange);
      LoginStore.removeChangeListener(this._onChange);
      PostsActions.clearPosts();
    }

    _onChange() {
      this.setState(this.getPostsState());
      this.reroute();
    }

    reroute() {
      if (!LoginStore.isLoggedIn()) {
        this.props.history.push("/");
      }
    }

    requestPosts(id) {
      PostsServices.getPosts(id);
    }

    getPostsState() {
      return { posts: PostsStore.posts, thread: PostsStore.thread };
    }

    render() {
      if (!this.state.posts) {
        return (
          <Dimmer active inverted>
            <Loader size="medium">Loading</Loader>
          </Dimmer>
        );
      } else {
        return (
          <div
            style={{
              marginTop: "7%",
              marginLeft: "10%",
              marginRight: "10%",
              marginBottom: "10%"
            }}
          >
            <Header as="h1" dividing>
              {this.state.thread.name}
            </Header>
            <Segment attached>{this.state.thread.description}</Segment>
            <Comment.Group>
              <Header as="h3" dividing>
                {this.state.posts.length} Comments
              </Header>
              {this.state.posts
                .reverse()
                .map((post, key) => postCard(post, key))}
            </Comment.Group>
            <PostsModal thread_id={this.props.match.params.thread_id} />
          </div>
        );
      }
    }
  }
);

const postCard = (post, key) => (
  <Comment key={key}>
    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
    <Comment.Content>
      <Comment.Author as="a"> {`${post.createdBy.username}`}</Comment.Author>
      <Comment.Metadata>
        <div> {`${post.createdAt}`}</div>
      </Comment.Metadata>
      <Comment.Text> {`${post.content}`}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);

// on mount, gets threads from store. if state has not loaded threads, makes a request to store. on mount also adds listener to changes in threads store. if change, updates state. when unmounting, removes listener.
