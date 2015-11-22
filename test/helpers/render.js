/**
 * Module dependencies
 */

import expect from 'expect';
import proxyquire from 'proxyquire';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/**
 * Stub out SoundCloud
 */

function setup() {
  const widgetStub = {
    load: expect.createSpy(),
    bind: expect.createSpy(),
    unbind: expect.createSpy(),
  };

  const SoundCloud = proxyquire('../../src/SoundCloud', {
    './lib/createWidget': {
      default: (id, cb) => cb(widgetStub),
    },
  }).default;

  return {
    widgetStub,
    SoundCloud,
  };
}

/**
 * Shallow rendering
 */

export function render(props) {
  const { SoundCloud } = setup();

  const renderer = TestUtils.createRenderer();
  renderer.render(React.createElement(SoundCloud, props));

  const output = renderer.getRenderOutput();

  function rerender(newProps = {}) {
    renderer.render(React.createElement(SoundCloud, {
      ...props,
      ...newProps,
    }));

    return renderer.getRenderOutput();
  }

  return {
    props,
    output,
    rerender,
  };
}

/**
 * Full rendering into the dom
 */

export function renderDOM(props) {
  const { widgetStub, SoundCloud } = setup();

  /**
   * Emulate changes to component.props using a container component's state
   */

  class Container extends React.Component {
    constructor(_props) {
      super(_props);

      this.state = _props;
    }

    render() {
      return <SoundCloud { ...this.state } />;
    }
  }

  const div = document.createElement('div');
  const container = ReactDOM.render(<Container { ...props } />, div);
  const output = TestUtils.findRenderedComponentWithType(container, SoundCloud);

  function rerender(newProps = {}) {
    container.setState(newProps);
    return output;
  }

  function unmount() {
    ReactDOM.unmountComponentAtNode(div);
  }

  return {
    props,
    output,
    rerender,
    unmount,
    widgetStub,
  };
}
