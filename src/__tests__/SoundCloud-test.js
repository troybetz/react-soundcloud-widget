jest.dontMock('../SoundCloud');

import React from 'react/addons';
import createWidget from '../lib/createWidget';
import SoundCloud from '../SoundCloud';

const { TestUtils } = React.addons;
let widgetMock;

describe('SoundCloud Component', () => {

  beforeEach(() => {

    /**
     * Mock out SoundCloud widget API
     */

    widgetMock = {
      load: jest.genMockFunction(),
      bind: jest.genMockFunction(),
      unbind: jest.genMockFunction()
    };

    window.SC = {
      Widget: {
        Events: {
          PLAY: 'play',
          PAUSE: 'pause',
          FINISH: 'finish'
        }
      }
    };

    createWidget.mockImplementation((props, cb) => cb(widgetMock));
  });

  describe('instantiation', () => {
    it('should render a SoundCloud API ready iframe', () => {
      const soundcloud = TestUtils.renderIntoDocument(React.createElement(SoundCloud, {url: ''}));
      const iframe = TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe').getDOMNode();

      expect(iframe.getAttribute('id')).toBe('react-sc-widget');
      expect(iframe.getAttribute('src')).toBe('https://w.soundcloud.com/player/?url=');
    });

    it('should create a new SoundCloud widget', () => {
      const soundcloud = TestUtils.renderIntoDocument(React.createElement(SoundCloud, {url: ''}));
      expect(createWidget.mock.calls[0][0]).toBe('react-sc-widget');
    });
  });

  describe('appearance', () => {
    it('should pass a set of `opts` into the widget', () => {
      const opts = {
        buying: false
      };

      const soundcloud = TestUtils.renderIntoDocument(React.createElement(SoundCloud, {url: '', opts: opts}));
      expect(widgetMock.load.mock.calls[0][1]).toEqual(opts);
    });

    it('should accept a custom iframe id', () => {
      const soundcloud = TestUtils.renderIntoDocument(React.createElement(SoundCloud, {url: '', id: 'custom-id'}));
      const iframe = TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe').getDOMNode();

      expect(iframe.getAttribute('id')).toBe('custom-id');
    });

    it('should readjust height if visual mode is enabled', ()=>  {
      const soundcloud = TestUtils.renderIntoDocument(React.createElement(SoundCloud, {url: '', opts: {visual: true}}));
      const iframe = TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe').getDOMNode();

      expect(iframe.getAttribute('height')).toBe('450');
    });
  });

  describe('functionality', () => {

    /**
     * Using `forceUpdate` doesn't work with `componentWillUpdate` when
     * changing `props.url`. This is a hack to get around that.
     */

    const Container = React.createClass({displayName: 'Container',
      getInitialState() {
        return {
          url: 'https://soundcloud.com/hucci/hitta'
        };
      },

      _setUrl1() {
        this.setState({url: 'https://soundcloud.com/hucci/hitta'});
      },

      _setUrl2() {
        this.setState({url: 'https://soundcloud.com/hudsonmohawke/chimes'});
      },

      render() {
        return (
          React.createElement('div', null,
            React.createElement('button', {className: 'set-url-1', onClick: this._setUrl1}, 'URL 1'),
            React.createElement('button', {className: 'set-url-2', onClick: this._setUrl2}, 'URL 1'),
            React.createElement(SoundCloud, {url: this.state.url})
          )
        );
      }
    });

    it('should load a `url`', () => {
      const container = TestUtils.renderIntoDocument(React.createElement(Container, null));
      const soundcloud = TestUtils.findRenderedComponentWithType(container, SoundCloud);

      expect(widgetMock.load.mock.calls[0][0]).toBe('https://soundcloud.com/hucci/hitta');
    });

    it('should load new `url`s', () => {
      const container = TestUtils.renderIntoDocument(React.createElement(Container, null));
      const toggleButton = TestUtils.findRenderedDOMComponentWithClass(container, 'set-url-2');

      TestUtils.Simulate.click(toggleButton);

      expect(widgetMock.load.mock.calls.length).toBe(2);
      expect(widgetMock.load.mock.calls[1][0]).toBe('https://soundcloud.com/hudsonmohawke/chimes');
    });

    it('should not load the same `url` twice', () => {
      const container = TestUtils.renderIntoDocument(React.createElement(Container, null));
      const toggleButton = TestUtils.findRenderedDOMComponentWithClass(container, 'set-url-1');

      TestUtils.Simulate.click(toggleButton);

      expect(widgetMock.load.mock.calls.length).toBe(1);
    });
  });

  describe('events', () => {
    it('should bind event handler props to playback events', () => {
      const playFn = () => {};
      const soundcloud = TestUtils.renderIntoDocument(React.createElement(SoundCloud, {url: '', onPlay: playFn}));

      expect(widgetMock.bind.mock.calls.length).toBe(3);
      expect(widgetMock.bind.mock.calls[0]).toContain(playFn);
    });

    it('should remove event bindings when unmounted', () => {

      /**
       * `TestUtils.renderIntoDocument` renders the component into
       * a detached DOM node, which makes it difficult to unmount.
       *
       * Instead, we'll just render it the old fashioned way.
       */

      React.render(React.createElement(SoundCloud, {url: ''}), document.body);
      React.unmountComponentAtNode(document.body);

      expect(widgetMock.unbind.mock.calls.length).toBe(3);
    });
  });
});
