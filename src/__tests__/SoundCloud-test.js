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
      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' />);
      const iframe = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe'));

      expect(iframe.getAttribute('id')).toBe('react-sc-widget');
      expect(iframe.getAttribute('src')).toBe('https://w.soundcloud.com/player/?url=');
    });

    it('should create a new SoundCloud widget', () => {
      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' />);
      expect(createWidget.mock.calls[0][0]).toBe('react-sc-widget');
    });
  });

  describe('appearance', () => {
    it('should pass a set of `opts` into the widget', () => {
      const opts = {
        buying: false
      };

      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' opts={opts} />);
      expect(widgetMock.load.mock.calls[0][1]).toEqual(opts);
    });

    it('should accept a custom iframe id', () => {
      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' id='custom-id' />);
      const iframe = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe'));

      expect(iframe.getAttribute('id')).toBe('custom-id');
    });

    it('should readjust height if visual mode is enabled', ()=>  {
      const opts = {
        visual: true
      };

      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' opts={opts} />);
      const iframe = React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe'));

      expect(iframe.getAttribute('height')).toBe('450');
    });
  });

  describe('functionality', () => {

    /**
     * Using `forceUpdate` doesn't work with `componentWillUpdate` when
     * changing `props.url`. This is a hack to get around that.
     */

    class Container extends React.Component {
      constructor() {
        this.state = {
          url: 'https://soundcloud.com/hucci/hitta'
        };

        this._setUrl1 = this._setUrl1.bind(this);
        this._setUrl2 = this._setUrl2.bind(this);
      }

      render() {
        return (
          <div>
            <button className='set-url-1' onClick={this._setUrl1}>SET URL 1</button>
            <button className='set-url-2' onClick={this._setUrl2}>SET URL 2</button>
            <SoundCloud url={this.state.url }/>
          </div>
        );
      }

      _setUrl1() {
        this.setState({url: 'https://soundcloud.com/hucci/hitta'});
      }

      _setUrl2() {
        this.setState({url: 'https://soundcloud.com/hudsonmohawke/chimes'});
      }
    }

    it('should load a `url`', () => {
      const container = TestUtils.renderIntoDocument(<Container />);
      const soundcloud = TestUtils.findRenderedComponentWithType(container, SoundCloud);

      expect(widgetMock.load.mock.calls[0][0]).toBe('https://soundcloud.com/hucci/hitta');
    });

    it('should load new `url`s', () => {
      const container = TestUtils.renderIntoDocument(<Container />);
      const toggleButton = TestUtils.findRenderedDOMComponentWithClass(container, 'set-url-2');

      TestUtils.Simulate.click(toggleButton);

      expect(widgetMock.load.mock.calls.length).toBe(2);
      expect(widgetMock.load.mock.calls[1][0]).toBe('https://soundcloud.com/hudsonmohawke/chimes');
    });

    it('should not load the same `url` twice', () => {
      const container = TestUtils.renderIntoDocument(<Container />);
      const toggleButton = TestUtils.findRenderedDOMComponentWithClass(container, 'set-url-1');

      TestUtils.Simulate.click(toggleButton);

      expect(widgetMock.load.mock.calls.length).toBe(1);
    });
  });

  describe('events', () => {
    it('should bind event handler props to playback events', () => {
      const playFn = () => {};
      const soundcloud = TestUtils.renderIntoDocument(<SoundCloud url='' onPlay={playFn} />);

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
