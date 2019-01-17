import * as React from 'react';
import Header from '../Header';

describe('Header', () => {
  it('renders the header component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.text()).toBe('I Am the header component');
  });
});
