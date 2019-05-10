import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Export from "./Export";

configure({ adapter: new Adapter() });

describe('Test Export component', () => {
  let shallowComponent, defaultProps;
  beforeEach(() => {
    defaultProps = {
      fileSaved: false,
      onClick: () => {}
    };
    shallowComponent = shallow(<Export {...defaultProps} />);
  });

  test('should render once', () => {
    expect(shallowComponent.length).toEqual(1)
  });

  test('should render text', () => {
    expect(shallowComponent.find('button').text()).toContain('Export')
  });
});