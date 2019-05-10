import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Numberlist from "./Numberlist";

configure({ adapter: new Adapter() });

describe('Test Numberlist component', () => {
  let wrapper, defaultProps;
  beforeEach(() => {
    defaultProps = {};
    wrapper = shallow(<Numberlist/>);
  });

  it('should render once', () => {
    expect(wrapper.length).toEqual(1);
  });
});