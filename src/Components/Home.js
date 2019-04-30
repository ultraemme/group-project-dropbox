import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../Store';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Navigation from './Navigation';
import styles from './Home.module.css';

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










let dbx;

const Home = (props) => {
  const [currentPath, setCurrentPath] = useState("");
  const [currentFolder, setCurrentFolder] = useState({});
  const [redirectLogout, setRedirectLogout] = useState(false);
  const [didMount, setDidMount] = useState(false);

  function signOut () {
    setRedirectLogout(true);
    updateToken(null);
  }

  function setPath (path) {
    console.log(path);
    let newPath = currentPath + path;
    setCurrentPath(newPath);
    console.log('state path', currentPath);
  }

  function formatPath () {
    //takes currentPath, returns formatted path to pass to header
  }

  useEffect(() => {
    let token = window.location.search.replace('?code=', '');
    const API = `https://api.dropboxapi.com/oauth2/token?code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/home&client_id=h7s722dkxc8lgct&client_secret=u81zydr2i3rbxth`;

    if(!token$.value){
      axios.post(API)
      .then((res) => {
        console.log(res);
        updateToken(res.data.access_token);
        setDidMount(true);
      })
      .catch(err => {
        console.log(err.response.data)
        setRedirectLogout(true);
      })
    }
    else{
      setDidMount(true);
    }
  }, []);

  useEffect(() => {
    if(didMount){
      dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
      .then(res => {
        console.log(res);
        setCurrentFolder(res);
      })
    }
  }, [didMount]);

  useEffect(() => {
    if (didMount) {
      dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
        .then(res => {
          setCurrentFolder(res);
        })
    }
  }, [currentPath])



  return (
    <>
      {
        redirectLogout ? <Redirect to="/"/> :
          <div className={styles.home}>
            <div className={styles['home__left-container']}>
              <Navigation signOut={signOut}/>
            </div>
            <div className={styles['home__right-container']}>
              <Header/>
              <Content setPath={setPath} currentFolder={currentFolder}/>
            </div>
          </div>
      }
    </>
  )
}

export default Home;
