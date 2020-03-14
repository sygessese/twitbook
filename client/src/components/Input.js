import React from "react";
import PropTypes from "prop-types";
import { InnerInput, InputContainer, ErrorMessage } from "./Styles";

const validate = (val, errMessage, pattern) => {
  const valid = new RegExp(pattern).test(val);
  return valid ? "" : errMessage;
};

class Input extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    desc: PropTypes.string,
    errMessage: PropTypes.string
  };

  state = {
    error: "",
    data: ""
  };

  handleChange = ev => {
    const { errMessage, name, notify, pattern } = this.props;
    const error = validate(ev.target.value, errMessage, pattern);
    notify(name, error === "");
    this.setState({ data: ev.target.value, error });
  };

  render() {
    const { error, data } = this.state;
    const { desc } = this.props;

    return (
      <InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div> {desc} </div>
        <InnerInput value={data} onChange={this.handleChange} {...this.props} />
      </InputContainer>
    );
  }
}
export default Input;
