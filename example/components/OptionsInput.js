import React from 'react';
import {
  TextField,
} from 'material-ui';

export default class OptionsInput extends React.Component {
  static propTypes = {
    default: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.onChange(this.refs.input.getValue());
  }

  render() {
    return (
      <form onSubmit={::this.onSubmit}>
        <TextField
          defaultValue={this.props.default}
          hintText={this.props.type}
          floatingLabelText={this.props.type}
          ref="input"
          fullWidth
        />
      </form>
    );
  }
}
