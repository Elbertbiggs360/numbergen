import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Stats from "./Stats";

configure({ adapter: new Adapter() });

describe('Test Stats component', () => {
  let wrapper, defaultProps;
  beforeEach(() => {
    defaultProps = {};
    wrapper = shallow(<Stats/>);
  });

  it('should render once', () => {
    expect(wrapper.length).toEqual(1);
  });
});