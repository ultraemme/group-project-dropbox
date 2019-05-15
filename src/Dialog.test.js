import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Components/js/Dialog';
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() })
jest.mock('Dropbox');

test('check onChange function', () => {
  const setFolderName = jest.fn()
  const wrapper = shallow(<Dialog folderName={setFolderName} />);
  wrapper.find("input").simulate('change', { target: { value: "test" } });
});

test('button click', () => {
  const wrapper = shallow(<Dialog />);
  wrapper.find('button').at(1).simulate('click');
});


