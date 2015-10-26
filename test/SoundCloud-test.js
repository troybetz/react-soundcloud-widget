import expect from 'expect';
import React from 'react';
import { render, renderDOM } from './helpers/render';

window.SC = {
  Widget: {
    Events: {
      PLAY: 'play',
      PAUSE: 'pause',
      FINISH: 'finish',
    },
  },
};

const url = 'https://soundcloud.com/sylvanesso/coffee';

describe('SoundCloud Widget', () => {
  it('should render an iframe', () => {
    const { output } = render({ url });
    expect(output).toEqual(
      <iframe
        id="react-sc-widget"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        src="https://w.soundcloud.com/player/?url="
      />
    );
  });

  it('should render an iframe with custom id', () => {
    const { output } = render({ url, id: 'custom-id' });
    expect(output).toEqual(
      <iframe
        id="custom-id"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        src="https://w.soundcloud.com/player/?url="
      />
    );
  });

  it('should render an iframe with custom height', () => {
    const { output } = render({ url, height: '200' });
    expect(output).toEqual(
      <iframe
        id="react-sc-widget"
        width="100%"
        height="200"
        scrolling="no"
        frameBorder="no"
        src="https://w.soundcloud.com/player/?url="
      />
    );
  });

  it('should render an iframe with height of 450px in visual mode', () => {
    const { output } = render({ url, opts: {visual: true} });
    expect(output).toEqual(
      <iframe
        id="react-sc-widget"
        width="100%"
        height="450"
        scrolling="no"
        frameBorder="no"
        src="https://w.soundcloud.com/player/?url="
      />
    );
  });

  it('should load a url', () => {
    expect(renderDOM({ url }).widgetStub.load.calls[0].arguments[0]).toBe(url);
  });

  it('should load a new url', () => {
    const { widgetStub, rerender } = renderDOM({ url });
    rerender({url: 'https://soundcloud.com/sylvanesso/hskt'});
    expect(widgetStub.load.calls[1].arguments[0]).toBe('https://soundcloud.com/sylvanesso/hskt');
  });

  it('should only load new urls', () => {
    const { widgetStub, rerender } = renderDOM({ url });
    rerender({ url }); // this shouldn't do anything
    expect(widgetStub.load.calls.length).toBe(1);
  });

  it('should bind event handler props', () => {
    expect(renderDOM({ url }).widgetStub.bind.calls.length).toBe(3);
  });

  it('should unbind event handler props before unmounting', () => {
    const { widgetStub, unmount } = renderDOM({ url });
    unmount();
    expect(widgetStub.unbind.calls.length).toBe(3);
  });
});
