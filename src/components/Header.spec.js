import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from "./header";

configure({ adapter: new Adapter() });

describe('Test Header component', () => {
  let wrapper, defaultProps;
  beforeEach(() => {
    defaultProps = {};
    wrapper = shallow(<Header/>);
  });

  it('should render once', () => {
    expect(wrapper.length).toEqual(1);
  });
});