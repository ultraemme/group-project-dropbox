import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Components/js/Dialog';
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()})
jest.mock('Dropbox');

it('check onChange function', () => {
  const wrapper = shallow (<Dialog  />);
  let input =  wrapper.find("input");
  console.log (input);
});

test('button click', () => {
  const handleNewFolder = jest.fn();
  const wrapper = shallow (<Dialog />);
  wrapper.find('button').at(1).simulate('click');
  expect(handleNewFolder).toHaveBeenCalled();
});