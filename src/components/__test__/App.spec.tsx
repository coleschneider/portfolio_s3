import * as React from 'react';
import App from '../App';

describe('App', () => {
  it('renders', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.app-wrapper').exists()).toEqual(true);
  });
});
