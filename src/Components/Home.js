import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../Store';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Navigation from './Navigation';
import styles from './Home.module.css';
import Dialog from './Dialog';
import UploadFile from './UploadFile';
import RenameFile from './RenameFile';

const Home = (props) => {
  // console.log("HEJ", props.location);

  const currentPath = props.location.pathname.substr(5);
  const [uploadFile, setUploadFile] = useState(false);
  const [renameFile, setRenameFile] = useState(false);
  const [renameFileData, setRenameFileData] = useState({});
  const [newFolder, setNewFolder] = useState(false);
  const [currentFolder, setCurrentFolder] = useState([]);
  const [redirectLogout, setRedirectLogout] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState();
  const [searchFileObj, setSearchFileObj] = useState();

  function signOut() {
    setRedirectLogout(true);
    updateToken(null);
  }

  function deleteFile(file) {
    //trigger dialog
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    dbx.filesDeleteV2({ path: file.path_lower })
      .then(res => {
        console.log(res);
        let newFolder = currentFolder.filter((t) => {
          return file !== t;
        })
        setCurrentFolder(newFolder);
      })
      .catch(err => {
        console.error(err);
      })
  }

  function renameFileDialog(file){
    let fileData = {
      fileName: file.name,
      path: file.path_display,
    }
    setRenameFileData(fileData);
    setRenameFile(true);
  }
  function onRenameFileChange(e){
    let fileData = JSON.parse(JSON.stringify(renameFileData));
    fileData.fileName = e.target.value;
    setRenameFileData(fileData);
  }
  function renameFileRequest(){
    let fileData = JSON.parse(JSON.stringify(renameFileData))
    let newPath = fileData.path;
    newPath = newPath.split('/');
    newPath[newPath.length - 1] = fileData.fileName;
    newPath = newPath.join('/');

    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesMoveV2({
      from_path: fileData.path,
      to_path: newPath,
    })
    .then((res) => {
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
        .then(res => {
          setCurrentFolder(res.entries);
          setRenameFile(false);
        })
    })
  }

  function downloadFileRequest(fileName, filePath){
    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesDownload({path: filePath})
    .then((res) => {
      let url = URL.createObjectURL(res.fileBlob);
      let downloadButton = document.createElement('a');
      downloadButton.setAttribute('href', url);
      downloadButton.setAttribute('download', res.name);
      downloadButton.click();
    })
  }

  function uploadFileRequest(files){
    if(!files.length) return;
    if(files[0].size < 150000000){
      console.log('The size is lower than 150 MB')
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesUpload({contents: files[0], path: `${currentPath}/${files[0].name}`, mode: 'add', autorename: true, mute: false, strict_conflict: false})
      .then((res) => {
        const dbx = new Dropbox({accessToken: token$.value, fetch});
        dbx.filesListFolder({path: currentPath})
          .then(res => {
            setCurrentFolder(res.entries);
            setUploadFile(false);
          })
      })
    }
    else{
      console.log('The size is HIGHER than 150 MB');
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesUploadSessionStart({contents: files[0], close: false})
      .then((res) => {
        const dbx = new Dropbox({accessToken: token$.value, fetch});
        dbx.filesUploadSessionFinish({
          cursor: {
            session_id: res.session_id,
            offset: files[0].size,
          },
          commit: {
            path: `${currentPath}/${files[0].name}`,
            mode: 'add',
            autorename: true,
            mute: false,
            strict_conflict: false,
          }
        })
        .then((res) => {
          const dbx = new Dropbox({accessToken: token$.value, fetch});
          dbx.filesListFolder({path: currentPath})
            .then(res => {
              setCurrentFolder(res.entries);
              setUploadFile(false);
            })
        })
      })
    }
  }

  useEffect(() => {
    let token = window.location.search.replace('?code=', '');
    const API = `https://api.dropboxapi.com/oauth2/token?code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/home&client_id=h7s722dkxc8lgct&client_secret=u81zydr2i3rbxth`;

    if (!token$.value) {
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
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.usersGetCurrentAccount()
      .then((res) => {
        console.log(res);
        let user = {
          display_name: res.name.display_name,
          email: res.email,
        }
        setUser(user);
      })
      // const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
      .then(res => {
        console.log(res);
        setCurrentFolder(res.entries);
      })
    }
  }, [didMount]);

  useEffect(() => {
    if (didMount) {
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
        .then(res => {
          setCurrentFolder(res.entries);
        })
    }
  }, [currentPath, newFolder]);

  function searchFile (e) {
    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesSearch({
      path: "",
      query: e.target.value,
    })
    .then(res =>{
      const value = res.matches.map(file =>{
        return file.metadata
      })
     setSearchFileObj(value)
     console.log(searchFileObj);
    })
    .then(()=>{
      setCurrentFolder(searchFileObj);
    })
  }
  return (
    <>
      {
        redirectLogout ? <Redirect to="/"/> :
          <div className={styles.home}>
            <div className={styles['home__left-container']}>
              <Navigation newFile={() => setNewFolder(true)} uploadFile={() => setUploadFile(true)} signOut={signOut} user={user}/>
            </div>
            <div className={styles['home__right-container']}>
              <Header currentPath={props.location} searchFile={searchFile}/>
              <Content currentFolder={currentFolder} currentPath={currentPath} downloadFile={downloadFileRequest} renameFileFunc={renameFileDialog} deleteFile={deleteFile}/>
            </div>
          </div>
      }
      {renameFile ? <RenameFile fileData={renameFileData} onRenameFileChange={onRenameFileChange} renameFileRequest={renameFileRequest}/> : null}
      {uploadFile ? <UploadFile closeClick={() => setUploadFile(false)} uploadFileRequest={uploadFileRequest}/> : null}
      {newFolder === true ? <Dialog currentPath={currentPath} exitDialog={() => setNewFolder(false)} /> : null}
    </>
  )
}

export default Home;
