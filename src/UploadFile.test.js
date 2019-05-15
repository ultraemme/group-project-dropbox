import React from 'react';
import ReactDOM from 'react-dom';
import UploadFile from './Components/js/UploadFile';
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
jest.mock('Dropbox');



it('When clicking on close btn, close function should be called', () => {
  const closeClick = jest.fn();
  const wrapper = shallow(<UploadFile closeClick={closeClick}/>);
  const mockPreventDefault = jest.fn();
  expect(closeClick).not.toHaveBeenCalled();
  let closeBtn = wrapper.find('.overlay-uploadfile__cancel-btn').simulate('click', {
    preventDefault: mockPreventDefault,
  });
  expect(closeBtn.length).toBe(1);
  expect(closeClick).toHaveBeenCalled();
})
it('When clicking on cross close btn, close function should be called', () => {
  const closeClick = jest.fn();
  const wrapper = shallow(<UploadFile closeClick={closeClick}/>);
  const mockPreventDefault = jest.fn();
  expect(closeClick).not.toHaveBeenCalled();
  let closeBtn = wrapper.find('.overlay-uploadfile__close-btn').simulate('click');
  expect(closeBtn.length).toBe(1);
  expect(closeClick).toHaveBeenCalled();
})
it('onSubmit call onUploadSubmit function', () => {
  const uploadFileRequest = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockChangeFile = jest.fn();
  const wrapper = shallow(<UploadFile uploadFileRequest={uploadFileRequest} onChange={mockChangeFile}/>);
  const blob = new Blob([""], { type: "text/html" });
  const fileList = [blob];
  const fileInput = wrapper.find('.overlay-uploadfile__upload-input').simulate('change', { target: { files: fileList } })
  let submitBtn = wrapper.find('.overlay-uploadfile__form').simulate('submit', {
    preventDefault: mockPreventDefault,
  });
  expect(uploadFileRequest).toHaveBeenCalledWith(fileList);
})
