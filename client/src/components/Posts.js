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
  Form,
  Dimmer,
  Loader,
  Card,
  Button,
  Progress,
  Grid,
  Popup
} from "semantic-ui-react";
import PostsModal from "./PostsModal";
import PostsActions from "../actions/PostsActions";
import TimeAgo from "react-timeago";
import FollowPopup from "./FollowPopup";

export default AuthenticatedComponent(
  class Posts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        thread: "",
        content: "",
        progressBar: false,
        progress: 0
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

    handleChange(e) {
      this.setState({ content: event.target.value });
    }

    createPost(e) {
      e.preventDefault();
      this.setState({ progressBar: true });
      PostsServices.addPost({
        thread: this.state.thread._id,
        content: this.state.content
      })
        .then(success => {
          this.setState({ progress: 100, content: "" }, () => {
            setTimeout(() => {
              this.setState({ progressBar: false, progress: 0 });
            }, 1000);
          });
          PostsServices.getPosts(this.state.thread._id);
        })
        .catch(err => {
          console.log("error: ", err);
          window.alert("error, try again");
          this.setState({ progressBar: false });
        });
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
              marginTop: "7em",
              marginLeft: "10%",
              marginRight: "10%",
              marginBottom: "10%"
            }}
          >
            <Card
              raised
              style={{
                border: "1px lightgrey solid",
                borderRadius: "10px",
                padding: "2em",
                maxWidth: "650px",
                width: "100%",
                boxShadow: ""
              }}
            >
              <Card.Content>
                <Card.Header style={{ fontSize: "2em", marginBottom: "0" }}>
                  {this.state.thread.name}
                </Card.Header>
                <Card.Meta>
                  created by {this.state.thread.createdByUsername}
                  {"  "}
                  <TimeAgo date={this.state.thread.createdAt} />
                </Card.Meta>
                <Card.Description>
                  <br></br>
                  {this.state.thread.description
                    ? this.state.thread.description
                    : "(No description provided)"}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Form reply>
                  <Form.TextArea
                    attached="top"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.content}
                    style={{
                      height: "7em",
                      borderRadius: "none",
                      margin: 0
                    }}
                  />
                  {this.state.progressBar ? (
                    <Progress percent={this.state.progress} autoSuccess />
                  ) : (
                    <Button
                      content="Add Comment"
                      attached="bottom"
                      icon="edit"
                      onClick={this.createPost.bind(this)}
                    />
                  )}
                </Form>
              </Card.Content>
            </Card>

            <Comment.Group
              style={{
                border: "1px lightgrey solid",
                borderRadius: "10px",
                padding: "2em",
                boxShadow:
                  "0 0 0 1px #d4d4d5, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15)"
              }}
            >
              <Header as="h3" dividing>
                {this.state.posts.length} Comments
              </Header>
              {this.state.posts.map((post, key) => postCard(post, key))}
            </Comment.Group>
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
      <Comment.Author as="a">
        {/* {`${post.createdBy.username}`} */}
        {/* 
        <Popup
          trigger={<span>{post.createdBy.username}</span>}
          hoverable
          style={{ display: "flex" }}
        >
          <p>
            Click follow to see {post.createdBy.username}'s activity in your
            home feed
          </p>
          <Button>Follow</Button>
        </Popup> */}
        <FollowPopup
          username={post.createdBy.username}
          id={post.createdBy._id}
        />
      </Comment.Author>
      <Comment.Metadata>
        <div>
          <TimeAgo date={post.createdAt} />
        </div>
      </Comment.Metadata>
      <Comment.Text> {`${post.content}`}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>
          <PostsModal thread_id={post.thread} post_id={post._id} />
        </Comment.Action>
      </Comment.Actions>
    </Comment.Content>
    <Comment.Group>
      {post.replies.map((reply, index) => {
        return replyCard(reply, index);
      })}
    </Comment.Group>
  </Comment>
);

const replyCard = (reply, index) => (
  <Comment key={index}>
    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
    <Comment.Content>
      <Comment.Author as="a">{reply.createdBy.username}</Comment.Author>
      <Comment.Metadata>
        <div>
          <TimeAgo date={reply.createdAt} />
        </div>
      </Comment.Metadata>
      <Comment.Text>{reply.text}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);
// on mount, gets threads from store. if state has not loaded threads, makes a request to store. on mount also adds listener to changes in threads store. if change, updates state. when unmounting, removes listener.
