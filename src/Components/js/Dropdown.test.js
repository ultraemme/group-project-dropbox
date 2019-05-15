import React from 'react';
import Dropdown from './Dropdown';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Dropdown component', () => {
  it('should render dropdown', function () {
    const component = shallow(<Dropdown favorites={[]} />);
    const wrapper = component.find('.dropdown__list');
    expect(wrapper.length).toBe(1);
  })

  it('should render all options', () => {
    const component = shallow(<Dropdown favorites={[]} />);
    const wrapper = component.find('.dropdown__list-item');
    expect(wrapper.length).toBe(6);
  });

  it('should call a function then close', () => {
    const addFavorite = jest.fn();
    const toggleDropdown = jest.fn();
    const component = shallow(<Dropdown favorites={[]} addFavorite={addFavorite} toggleDropdown={toggleDropdown} />);
    expect(component.exists()).toBe(true);
    const wrapper = component.find('.dropdown__list-item');
    expect(addFavorite).not.toHaveBeenCalled();
    expect(toggleDropdown).not.toHaveBeenCalled();
    wrapper.at(0).simulate('click');
    expect(addFavorite).toHaveBeenCalled();
    expect(toggleDropdown).toHaveBeenCalled();
  });
})



