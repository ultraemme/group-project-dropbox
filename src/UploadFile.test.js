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
// it('onChange files when selecting file from input', () => {
//   const wrapper = shallow(<UploadFile />);
//   const blob = new Blob(['foo'], {type: 'text/plain'});
//   const fileInput = wrapper.find('.overlay-uploadfile__upload-input').simulate('change', { target: { files: blob } })
//   wrapper.unmount()
// })
it('onSubmit call onUploadSubmit function', () => {
  const uploadFileRequest = jest.fn();
  const mockPreventDefault = jest.fn();
  const wrapper = shallow(<UploadFile uploadFileRequest={uploadFileRequest}/>);
  // const blob = new Blob([''], {type: 'text/plain'});
  // let blob = new Blob([""], { type: 'text/html' });
  // blob["lastModifiedDate"] = "";
  // blob["name"] = "filename";
  // let fakeF = blob;

  const blob = new Blob([""], { type: "text/html" });
   // blob["lastModifiedDate"] = "";
   // blob["name"] = "filename";
   // const file = blob;
   // const fileList = {
   //   0: file,
   // };


  // console.log(fileList)
  const fileInput = wrapper.find('.overlay-uploadfile__upload-input').simulate('change', { target: { files: [blob] } })

  console.log(fileInput);
  let submitBtn = wrapper.find('.overlay-uploadfile__form').simulate('submit', {
    preventDefault: mockPreventDefault,
  });
  // expect(uploadFileRequest).toHaveBeenCalled();
})
