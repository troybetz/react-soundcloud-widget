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

    window.SC = {
      Widget: {
        Events: {
          PLAY: 'play',
          PAUSE: 'pause',
          FINISH: 'finish'
        }
      }
    };

    widgetMock = {
      load: jest.genMockFunction(),
      bind: jest.genMockFunction(),
      unbind: jest.genMockFunction()
    };

    createWidget.mockImplementation((props, cb) => cb(widgetMock));
  });

  describe('instantiation', () => {
    it('should render a SoundCloud API ready iframe', () => {
      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' />);
      const iframe = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe'));

      expect(iframe.getAttribute('id')).toBe('react-sc-widget');
      expect(iframe.getAttribute('src')).toBe('https://w.soundcloud.com/player/?url=');
    });

    it('should accept a custom iframe id', () => {
      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' id='custom-id' />);
      const iframe = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe'));

      expect(iframe.getAttribute('id')).toBe('custom-id');
    });

    it('should create a new SoundCloud widget', () => {
      TestUtils.renderIntoDocument(<SoundCloud url='' />);
      expect(createWidget.mock.calls[0][0]).toBe('react-sc-widget');
    });
  });

  describe('appearance', () => {
    it('should pass a set of `opts` into the widget', () => {
      const opts = {
        buying: false
      };

      TestUtils.renderIntoDocument(<SoundCloud url='' opts={opts} />);
      expect(widgetMock.load.mock.calls[0][1]).toEqual(opts);
    });

    it('should readjust height if visual mode is enabled', () => {
      const opts = {
        visual: true
      };

      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' opts={opts} />);
      const iframe = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe'));
      expect(iframe.getAttribute('height')).toBe('450');
    });
  });

  describe('functionality', () => {
    class Container extends React.Component {
      constructor() {
        this.state = {
          url: 'https://soundcloud.com/sylvanesso/coffee'
        };

        this._changeUrl = this._changeUrl.bind(this);
      }

      render() {
        return (
          <div>
            <SoundCloud url={this.state.url} />
            <button onClick={this._changeUrl}>Change url</button>
          </div>
        );
      }

      _changeUrl() {
        this.setState({
          url: 'https://soundcloud.com/hudsonmohawke/chimes'
        });
      }
    }

    it('should load a `url`', () => {
      TestUtils.renderIntoDocument(<Container />);
      expect(widgetMock.load.mock.calls[0][0]).toBe('https://soundcloud.com/sylvanesso/coffee');
    });

    it('should load new `url`s', () => {
      const container = TestUtils.renderIntoDocument(<Container />);
      const changeUrl = TestUtils.findRenderedDOMComponentWithTag(container, 'button');

      TestUtils.Simulate.click(changeUrl);

      expect(widgetMock.load.mock.calls.length).toBe(2);
      expect(widgetMock.load.mock.calls[1][0]).toBe('https://soundcloud.com/hudsonmohawke/chimes');
    });

    it('should only reload for new `url`s', () => {
      const container = TestUtils.renderIntoDocument(<Container />);
      const changeUrl = TestUtils.findRenderedDOMComponentWithTag(container, 'button');

      // switch `url` to 'https://soundcloud.com/hudsonmohawke/chimes'
      TestUtils.Simulate.click(changeUrl);
      expect(widgetMock.load.mock.calls.length).toBe(2);


      // calling it again won't do anything since `url` is already
      // 'https://soundcloud.com/hudsonmohawke/chimes'
      TestUtils.Simulate.click(changeUrl);
      expect(widgetMock.load.mock.calls.length).toBe(2);
    });
  });

  describe('events', () => {
    it('should bind event handler props to playback events', () => {
      const playFn = () => {};
      TestUtils.renderIntoDocument(<SoundCloud url='' onPlay={playFn} />);

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

      React.render(<SoundCloud url=''/>, document.body);
      React.unmountComponentAtNode(document.body);

      expect(widgetMock.unbind.mock.calls.length).toBe(3);
    });
  });
});
