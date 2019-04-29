import React, { useEffect } from 'react';
import axios from 'axios';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from './Store';

function getSomething() {
  let dbx = new Dropbox({accessToken: token$.value, fetch});
  console.log('dbx', dbx); //list methods
  dbx.filesListFolder({path: ''})
  .then(res => {
    console.log(JSON.parse(res));
  })
}
function newFile (){
  let dbx = new Dropbox({accessToken: token$.value, fetch});
  console.log('dbx', dbx); //list methods
  dbx.filesCreateFolder({path: '/fisken gädda'})
  .then(res => {
    console.log(JSON.parse(res));
  })
}
function moveFile(){
  let dbx = new Dropbox({accessToken: token$.value, fetch});
  console.log('dbx', dbx); //list methods
  dbx.filesMoveV2({
    from_path:"/jonas/jonas.jpg",
    to_path:"/test/jonas.jpg",
    autorename:true,
  })
}
function deleteFile(){
  let dbx = new Dropbox({accessToken: token$.value, fetch});
  console.log('dbx', dbx); //list methods
  dbx.filesDeleteV2({path: '/fisken gädda'})
  .then(res => {
    console.log(JSON.parse(res));
  })
}
function downdloadFile (){
  let dbx = new Dropbox({accessToken: token$.value, fetch});
  console.log('dbx', dbx); //list methods
  dbx.filesDownload({path:'/test/jonas.jpg'})
  .then(res => {
    console.log((res));
  })
}



const Home = (props) => {

  useEffect(() => {
    let token = window.location.search.replace('?code=', '');
    const API = `https://api.dropboxapi.com/oauth2/token?code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/home&client_id=h7s722dkxc8lgct&client_secret=u81zydr2i3rbxth`;
    
    if(!token$.value){
      axios.post(API)
      .then((res) => {
        console.log(res);
        updateToken(res.data.access_token);
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  }, [])

  return (
    <>
      <p>Home</p>
      <button onClick={getSomething}>Get something</button>
      <button onClick={newFile}>New file</button>
      <button onClick={moveFile}>Move file</button>
      <button onClick={deleteFile}>Delete file</button>
      <button onClick={downdloadFile}>Download</button>
    </>
  )
}

export default Home;
