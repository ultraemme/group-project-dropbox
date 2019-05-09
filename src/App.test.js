import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Components/Dialog';
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()})

test('check onChange function', () => {
  const wrapper = shallow (<Dialog />)
  wrapper.find("input").simulate("change",{target:{ value :"test"}})
  console.log (wrapper.state())
});
