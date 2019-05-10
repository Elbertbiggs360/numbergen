import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import FileSaver from 'file-saver';

configure({ adapter: new Adapter() });
jest.mock('file-saver');

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

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
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
    expect(wrapper.state().quantity).toBe("");
  });

  it('should generate phone numbers', async () => {
    wrapper.setState({quantity: 10});
    await instance.generateNumber(event);
    const state = wrapper.state();
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

  it('should save generated numbers when export button is clicked', () => {
    const mountedwrapper = mount(<App />);
    mountedwrapper.setState({
      numberlist : ['0707070777', '0777070777']
    });
    FileSaver.saveAs.mockResolvedValue(true);
    mountedwrapper.find('.export-btn').simulate('click', event);
    expect(mountedwrapper.state().fileSaved).toBe(true);
  })

  it('resets error message if quantity is correct', () => {
    wrapper.setState({
      quantity: 5,
      error: true,
      message: "error message"
    })
    expect(wrapper.state().error).toBe(true);
    instance.generateNumber(event);
    expect(wrapper.state().error).toBe(false);
  })
});
