import React from "react";
import AuthenticatedComponent from "./AuthenticatedComponent";
import PostsStore from "../stores/PostsStore.js";
import LoginStore from "../stores/LoginStore.js";
import PostsServices from "../services/PostsServices.js";
import ThreadsService from "../services/ThreadsService.js";
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
  Popup,
  Confirm
} from "semantic-ui-react";
import PostsModal from "./PostsModal";
import PostsActions from "../actions/PostsActions";
import TimeAgo from "react-timeago";
import FollowPopup from "./FollowPopup";
import Identicon from "react-identicons";

export default AuthenticatedComponent(
  class Posts extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        thread: "",
        content: "",
        progressBar: false,
        progress: 0,
        open: false,
        modalMessage: "Are you sure you would like to delete this thread?"
      };
      this._onChange = this._onChange.bind(this);
      this.deleteThread = this.deleteThread.bind(this);
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

    reroute(path) {
      if (!LoginStore.isLoggedIn()) {
        this.props.history.push("/");
      }
      if (path) {
        this.props.history.push(path);
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

    open() {
      this.setState({ open: true });
    }

    close() {
      this.setState({ open: false });
    }

    deleteThread(thread_id) {
      ThreadsService.deleteThread({ thread_id })
        .then(() => {
          this.setState({ modalMessage: "Success!" }, () => {
            setTimeout(() => {
              this.close();
              this.reroute("/threads");
            }, 700);
          });
        })
        .catch(() => {
          this.setState({ modalMessage: "Error!" }, () => {
            setTimeout(() => {
              this.close();
              this.setState({
                modalMessage:
                  "Are you sure you would like to delete this thread?"
              });
            }, 700);
          });
        });
    }

    confirmModal(thread_id) {
      return (
        <Confirm
          open={this.state.open}
          onCancel={this.close.bind(this)}
          content={this.state.modalMessage}
          onConfirm={() => {
            this.deleteThread(thread_id);
          }}
        />
      );
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
                <Card.Header
                  style={{
                    fontSize: "2em",
                    marginBottom: "0",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  {this.state.thread.name}

                  {/* {LoginStore._user === thread.createdBy.username ? (
                <span>
                  <Icon
                    name="trash"
                    color="red"
                    onClick={this.open.bind(this)}
                  />
                  {this.confirmModal(thread._id)}
                </span>
              ) : (
                ""
              )} */}
                  <div style={{ fontSize: ".8em" }}>
                    <Icon
                      name="trash alternate outline"
                      color="red"
                      onClick={this.open.bind(this)}
                    />
                    {this.confirmModal(this.state.thread._id)}
                  </div>
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
    <div style={{ display: "flex" }}>
      <div style={{ height: "40px", width: "40px", display: "inline-block" }}>
        <Identicon size={30} string={post.createdBy._id} />
      </div>
      <Comment.Content style={{ display: "inline-block" }}>
        <Comment.Author as="a">
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
    </div>
    <Comment.Group>
      {post.replies.map((reply, index) => {
        return replyCard(reply, index);
      })}
    </Comment.Group>
  </Comment>
);

const replyCard = (reply, index) => (
  <Comment key={index} style={{ display: "flex" }}>
    <div style={{ height: "40px", width: "40px", display: "inline-block" }}>
      <Identicon size={30} string={reply.createdBy._id} />
    </div>
    <Comment.Content>
      <Comment.Author as="a">{reply.createdBy.username}</Comment.Author>
      <Comment.Metadata>
        <div>
          <TimeAgo date={reply.createdAt} />
        </div>
      </Comment.Metadata>
      <Comment.Text>{reply.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);
// on mount, gets threads from store. if state has not loaded threads, makes a request to store. on mount also adds listener to changes in threads store. if change, updates state. when unmounting, removes listener.
