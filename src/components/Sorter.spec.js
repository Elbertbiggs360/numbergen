import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sorter from "./sorter";

configure({ adapter: new Adapter() });

describe('Test Sorter component', () => {
  let wrapper, defaultProps;
  beforeEach(() => {
    defaultProps = {
      onChange: () => {}
    };
    wrapper = shallow(<Sorter {...defaultProps} />)
  });

  it('should render once', () => {
    expect(wrapper.length).toEqual(1)
  });

  it('should render fields', () => {
    expect(wrapper.find('span').text()).toContain('Sort by');
    expect(wrapper.find('option').at(0).text()).toContain('Ascending');
    expect(wrapper.find('option').at(1).text()).toContain('Descending');
  });
});
