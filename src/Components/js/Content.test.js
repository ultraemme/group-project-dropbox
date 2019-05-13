import React from 'react';
import Content from './Content';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Content component', () => {
  it('should render folders and files', function () {
    const component = shallow(<Content currentFolder={[{".tag": "folder", name: "placefolder", id: 1337}, {".tag": "file", name: "placeholder file", id: 7331}]} favorites={[]} />);
    expect(component.find('.content__table-dropdown').length).toBe(2);
    expect(component.find('.content__star--active').length).toBe(0);
  });

  it('should render favorites', function () {
    const component = shallow(<Content currentFolder={[]} favorites={[{".tag": "folder", name: "placefolder", id: 1337}]} />);
    expect(component.find('.content__table-dropdown').length).toBe(0);
    expect(component.find('.content__star--active').length).toBe(1);
  });
})



