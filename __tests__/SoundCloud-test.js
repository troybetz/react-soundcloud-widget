/** @jsx React.DOM */

jest.dontMock('../');

describe('SoundCloud Component', function() {
  var React = require('react/addons');
  var SoundCloud = require('../');
  var DEFAULT_OPTIONS = require('../lib/default-options');
  var TestUtils = React.addons.TestUtils;
  var widgetMock;

  beforeEach(function() {

    /**
     * Mock out SoundCloud widget API
     */

    widgetMock = {
      load: jest.genMockFunction(),
      bind: jest.genMockFunction(),
      unbind: jest.genMockFunction()
    }; 

    window.SC = {
      Widget: jest.genMockFunction().mockReturnValue(widgetMock)
    };

    window.SC.Widget.Events = {
      PLAY: 'play',
      PAUSE: 'pause',
      FINISH: 'finish'
    };
  });

  describe('instantiation', function() {
    it('should render a SoundCloud API ready iframe', function() {
      var soundcloud = TestUtils.renderIntoDocument(<SoundCloud />);
      var iframe = TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe').getDOMNode();

      expect(iframe.getAttribute('id')).toBe('react-sc-player');
      expect(iframe.getAttribute('src')).toBe('https://w.soundcloud.com/player/?url=');
    });

    it('should create a new SoundCloud widget', function() {
      var soundcloud = TestUtils.renderIntoDocument(<SoundCloud />);
      expect(SC.Widget.mock.calls[0][0]).toBe('react-sc-player');
    });
  });

  describe('appearance', function() {
    it('should pass a set of `opts` into the widget', function() {
      var soundcloud = TestUtils.renderIntoDocument(<SoundCloud />);
      expect(widgetMock.load.mock.calls[0][1]).toEqual(DEFAULT_OPTIONS);
    });

    it('should accept custom `opts`', function() {
      var soundcloud = TestUtils.renderIntoDocument(<SoundCloud opts={{buying: false}}/>);
      var options = DEFAULT_OPTIONS;
      options.buying = false;

      expect(widgetMock.load.mock.calls[0][1]).toEqual(options);
    });

    it('should accept a custom iframe id', function() {
      var soundcloud = TestUtils.renderIntoDocument(<SoundCloud id='custom-id'/>);
      var iframe = TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe').getDOMNode();

      expect(iframe.getAttribute('id')).toBe('custom-id');
    });

    it('should readjust height if visual mode is enabled', function() {
      var soundcloud = TestUtils.renderIntoDocument(<SoundCloud opts={{visual: true}}/>);
      var iframe = TestUtils.findRenderedDOMComponentWithTag(soundcloud, 'iframe').getDOMNode();

      expect(iframe.getAttribute('height')).toBe('450');
    });
  });

  describe('functionality', function() {
    var Container;
    var container;

    beforeEach(function() {

      /**
       * Using `forceUpdate` doesn't work with `componentWillUpdate` when
       * changing `props.url`. This is a hack to get around that.
       */
      
      Container = React.createClass({
        getInitialState: function() {
          return {
            url: 'https://soundcloud.com/hucci/hitta'
          };
        },

        _setUrl1: function() {
          this.setState({url: 'https://soundcloud.com/hucci/hitta'})
        },

        _setUrl2: function() {
          this.setState({url: 'https://soundcloud.com/hudsonmohawke/chimes'});
        },

        render: function() {
          return (
            <div>
              <button className='set-url-1' onClick={this._setUrl1}>URL 1</button>
              <button className='set-url-2' onClick={this._setUrl2}>URL 1</button>
              <SoundCloud url={this.state.url} />
            </div>
          );
        }
      });

      container = TestUtils.renderIntoDocument(<Container />);
    });

    it('should load a `url`', function() {
      var soundcloud = TestUtils.findRenderedComponentWithType(container, SoundCloud);
      
      expect(widgetMock.load.mock.calls[0][0]).toBe('https://soundcloud.com/hucci/hitta')
    });

    it('should load new `url`s', function() {
      var toggleButton = TestUtils.findRenderedDOMComponentWithClass(container, 'set-url-2');

      TestUtils.Simulate.click(toggleButton);

      expect(widgetMock.load.mock.calls.length).toBe(2);
      expect(widgetMock.load.mock.calls[1][0]).toBe('https://soundcloud.com/hudsonmohawke/chimes');
    });

    it('should not load the same `url` twice', function() {
      var toggleButton = TestUtils.findRenderedDOMComponentWithClass(container, 'set-url-1');

      TestUtils.Simulate.click(toggleButton);

      expect(widgetMock.load.mock.calls.length).toBe(1);
    });
  });

  describe('events', function() {
    it('should bind event handler props to playback events', function() {
      var playFn = function() {};
      var soundcloud = TestUtils.renderIntoDocument(<SoundCloud onPlay={playFn}/>);
      
      expect(widgetMock.bind.mock.calls.length).toBe(3);
      expect(widgetMock.bind.mock.calls[0]).toContain(playFn);
    });

    it('should remove event bindings when unmounted', function() {

      /**
       * `TestUtils.renderIntoDocument` renders the component into
       * a detached DOM node, which makes it difficult to unmount.
       *
       * Instead, we'll just render it the old fashioned way.
       */
      
      React.renderComponent(<SoundCloud />, document.body);
      React.unmountComponentAtNode(document.body);

      expect(widgetMock.unbind.mock.calls.length).toBe(3);
    });
  });
});
