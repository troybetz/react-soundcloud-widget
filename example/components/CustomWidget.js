import React from 'react';
import SoundCloud from '../../';

export default class CustomWidget extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    opts: React.PropTypes.array.isRequired,
  };

  componentDidUpdate() {
    // otherwise it would only update when `url` changes.
    this.refs.widget.forceUpdate();
  }

  render() {
    const opts = this.props.opts.reduce((all, param) => {
      return {
        ...all,
        [param.name]: param.toggled,
      };
    }, {});

    return (
      <SoundCloud
        url={this.props.url}
        id={this.props.id}
        opts={opts}
        ref="widget"
      />
    );
  }
}
