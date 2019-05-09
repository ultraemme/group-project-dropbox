import React from 'react';
import ReactDOM from 'react-dom';
import MoveFile from './Components/js/MoveFile';
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });


it('Can render folder list', () => {

  const wrapper = shallow(<MoveFile />);
  let radioButtons = wrapper.find('input');
  console.log(radioButtons);
})
