import React, { Component } from "react";
import { Button, Modal, Input, Form, TextArea } from "semantic-ui-react";
import ThreadsServices from "../services/ThreadsService";

class ThreadsModal extends Component {
  state = {
    open: false,
    name: "",
    description: ""
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

  createThread = e => {
    e.preventDefault();
    ThreadsServices.addThread({
      name: this.state.name,
      description: this.state.description
    })
      .then(success => {
        this.close();
        ThreadsServices.getThreads();
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
      <div style={{ marginBottom: "2em" }}>
        <Input
          onFocus={this.closeConfigShow(true, false)}
          label={{ icon: "add" }}
          labelPosition="right corner"
          placeholder="Add thread..."
        />

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          dimmer={dimmer}
          size="tiny"
        >
          <Modal.Header>Create a new thread</Modal.Header>

          <Modal.Content>
            <Form>
              <Form.Field
                control={Input}
                label="Title"
                placeholder="Title"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
                id="name"
              />

              <Form.Field
                control={TextArea}
                label="Description"
                placeholder="Description..."
                value={this.state.description}
                onChange={this.handleChange.bind(this)}
                id="description"
              />
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button onClick={this.close} negative>
              Cancel
            </Button>
            <Button
              onClick={this.createThread}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Create thread"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ThreadsModal;
