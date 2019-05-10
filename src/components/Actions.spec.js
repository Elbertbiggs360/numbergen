import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Actions from "./Actions";

configure({ adapter: new Adapter() });

describe('Test Actions component', () => {
  let wrapper, defaultProps;
  beforeEach(() => {
    defaultProps = {
      onChange: () => {},
      onClick: () => {},
      error: false,
      message: "",
      quantity: 4,
    };
    wrapper = shallow(<Actions {...defaultProps} />)
  });

  it('should render once', () => {
    expect(wrapper.length).toEqual(1)
  });

  it('should render button and input', () => {
    expect(wrapper.find('button').text()).toContain('Generate');
    expect(wrapper.hasClass('actions')).toEqual(true);
  });
});
