import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App Test', ()=> {
  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });


  it('should set quantity', async () => {
    const event = {
      preventDefault: () => {},
      target: {
        value: 1000
      }
    };
    await instance.onChange(event);
    expect(wrapper.state().quantity).toBe(1000);
  });
});
