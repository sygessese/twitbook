import React, { Component } from "react";
import { Button, Modal, Input, Form, TextArea } from "semantic-ui-react";
import PostsServices from "../services/PostsServices";

class PostsModal extends Component {
  state = {
    open: false,
    thread_id: this.props.thread_id,
    post_id: this.props.post_id,
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

  addReply(e) {
    e.preventDefault();
    PostsServices.addReply({
      text: this.state.text,
      post_id: this.state.post_id
    })
      .then(success => {
        this.close();
        PostsServices.getPosts(this.state.thread_id);
      })
      .catch(err => {
        console.log("error: ", err);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: event.target.value });
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick, dimmer } = this.state;

    return (
      <div>
        <span onClick={this.closeConfigShow(true, false)}>reply</span>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          dimmer={dimmer}
          size="tiny"
        >
          <Modal.Header>Reply to a comment</Modal.Header>

          <Modal.Content>
            <Form>
              <Form.Field
                control={TextArea}
                label="Reply"
                placeholder="Reply..."
                value={this.state.text}
                onChange={this.handleChange.bind(this)}
                id="text"
              />
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button
              onClick={this.addReply.bind(this)}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Reply"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default PostsModal;
