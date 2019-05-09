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
    event.target = {id: "quantity", value: 1000};
    await instance.onChange(event);
    expect(wrapper.state().quantity).toBe(1000);
  });

  it('should set sorting order to asc', async () => {
    event.target = {id: "sorter", value: "asc"};
    await instance.onChange(event);
    expect(wrapper.state().asc).toBe("asc");
  });

  it('should set sorting order to desc', async () => {
    event.target = {id: "sorter", value: "desc"};
    await instance.onChange(event);
    expect(wrapper.state().asc).toBe("desc");
  });

  it('should sort numbers in descending order', async () => {
    const desc_array = [20, 14, 50];
    const reversed_sort = desc_array.sort().reverse();
    wrapper.setState({
      numberlist : desc_array
    });
    event.target = {id: "sorter", value: "desc"};
    instance.sortNumbers(desc_array, "desc");
    expect(wrapper.state().numberlist).toEqual(reversed_sort);
  });

  it('should not set anything if id is not set', () => {
    event.target = {id: "other", value: 1000};
    instance.onChange(event);
    expect(wrapper.state().quantity).toBe(1);
  });

  it('should generate phone numbers', async () => {
    wrapper.setState({quantity: 10});
    await instance.generateNumber(event);
    const state = wrapper.state();
    expect(state.quantity).toEqual(10);
    expect(state.numberlist.length).toEqual(10);
  });

  it('should set error if quantity is illegal', () => {
    wrapper.setState({quantity: 100000});
    instance.generateNumber(event);
    const state = wrapper.state();
    expect(state.error).toBe(true);
    expect(state.message).toEqual("Invalid Number: Number should be greater than 0 and less than 10000");
  });

  it('should show generated numbers', () => {
    wrapper.setState({
      numberlist : ['0707070777', '0777070777']
    });
    expect(wrapper.debug()).toContain('0707070777');
  });
});
