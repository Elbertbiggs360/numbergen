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
  let event = {
    preventDefault: () => {}
  };
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });


  it('should set quantity', async () => {
    event.target = {value: 1000};
    await instance.onChange(event);
    expect(wrapper.state().quantity).toBe(1000);
  });

  it('should generate phone numbers', async () => {
    wrapper.setState({quantity: 10});
    instance.generateNumber(event);
    const state = wrapper.state();
    expect(state.quantity).toEqual(10);
    expect(state.numberlist.length).toEqual(10);
  });

  it('should set error if quantity is illegal', async () => {
    wrapper.setState({quantity: 100000});
    instance.generateNumber(event);
    const state = wrapper.state();
    expect(state.error).toBe(true);
    expect(state.message).toEqual("Invalid Number: Number should be greater than 0 and less than 10000");
  });
});
