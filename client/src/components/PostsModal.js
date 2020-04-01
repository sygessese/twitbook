import React, { Component } from "react";
import { Button, Modal, Input, Form, TextArea } from "semantic-ui-react";
import PostsServices from "../services/PostsServices";

class PostsModal extends Component {
  state = {
    open: false,
    thread_id: this.props.thread_id,
    content: ""
  };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({
      closeOnEscape,
      closeOnDimmerClick,
      open: true,
      dimmer: "blurring"
    });
  };

  close = () => this.setState({ open: false });

  createPost = e => {
    e.preventDefault();
    PostsServices.addPost({
      thread: this.state.thread_id,
      content: this.state.content
    })
      .then(success => {
        this.close();
        PostsServices.getPosts(this.state.thread_id);
      })
      .catch(err => {
        console.log("error: ", err);
      });
  };

  handleChange(e) {
    this.setState({ [e.target.id]: event.target.value });
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick, dimmer } = this.state;

    return (
      <div>
        <Input
          onFocus={this.closeConfigShow(true, false)}
          label={{ icon: "add" }}
          labelPosition="right corner"
          placeholder="Add post..."
          width={8}
        />

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          dimmer={dimmer}
          size="tiny"
        >
          <Modal.Header>Create a new post</Modal.Header>

          <Modal.Content>
            <Form>
              <Form.Field
                control={TextArea}
                label="Content"
                placeholder="Content..."
                value={this.state.content}
                onChange={this.handleChange.bind(this)}
                id="content"
              />
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button
              onClick={this.createPost}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Create post"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default PostsModal;
