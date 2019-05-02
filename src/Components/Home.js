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

const Home = (props) => {
  // console.log("HEJ", props.location);

  const currentPath = props.location.pathname.substr(5);
  const [uploadFile, setUploadFile] = useState(false);
  const [newFolder, setNewFolder] = useState(false);
  const [currentFolder, setCurrentFolder] = useState([]);
  const [redirectLogout, setRedirectLogout] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
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

  function downloadFileRequest(fileName, filePath) {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    dbx.filesDownload({ path: filePath })
      .then((res) => {
        let url = URL.createObjectURL(res.fileBlob);
        let downloadButton = document.createElement('a');
        downloadButton.setAttribute('href', url);
        downloadButton.setAttribute('download', res.name);
        downloadButton.click();
      })
  }

  function uploadFileRequest(files) {
    if (!files.length) return;
    if (files[0].size < 150000000) {
      console.log('The size is lower than 150 MB')
      const dbx = new Dropbox({ accessToken: token$.value, fetch });
      dbx.filesUpload({ contents: files[0], path: `${currentPath}/${files[0].name}`, mode: 'add', autorename: true, mute: false, strict_conflict: false })
        .then((res) => {
          const dbx = new Dropbox({ accessToken: token$.value, fetch });
          dbx.filesListFolder({ path: currentPath })
            .then(res => {
              setCurrentFolder(res.entries);
              setUploadFile(false);
            })
        })
    }
    else {
      console.log('The size is HIGHER than 150 MB');
      const dbx = new Dropbox({ accessToken: token$.value, fetch });
      dbx.filesUploadSessionStart({ contents: files[0], close: false })
        .then((res) => {
          const dbx = new Dropbox({ accessToken: token$.value, fetch });
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
              const dbx = new Dropbox({ accessToken: token$.value, fetch });
              dbx.filesListFolder({ path: currentPath })
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
    else {
      setDidMount(true);
    }
  }, []);

  useEffect(() => {
    if (didMount) {
      const dbx = new Dropbox({ accessToken: token$.value, fetch });
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
      dbx.filesListFolder({ path: currentPath })
        .then(res => {
          setCurrentFolder(res.entries);
        })
    }
  }, [didMount]);

  useEffect(() => {
    if (didMount) {
      const dbx = new Dropbox({ accessToken: token$.value, fetch });
      dbx.filesListFolder({ path: currentPath })
        .then(res => {
          setCurrentFolder(res.entries);
        })
    }
  }, [currentPath, newFolder]);
  
  useEffect(() => {
    if (!searchValue) {
      const dbx = new Dropbox({ accessToken: token$.value, fetch });
      dbx.filesListFolder({ path: currentPath })
        .then(res => {
          setCurrentFolder(res.entries);
        })
    }
    else {
      const dbx = new Dropbox({ accessToken: token$.value, fetch });
      dbx.filesSearch({
        path: currentPath,
        query: searchValue,
      })
        .then(res => {
          let value = res.matches.map(file => {
            return file.metadata
          })
          console.log(value);
          setSearchFileObj(value)
        })
        .then(() => {
          setCurrentFolder(searchFileObj);
        })
    }
  }, [searchValue])

  function searchFile(e) {
    setSearchValue(e.target.value);
  }

  return (
    <>
      {
        redirectLogout ? <Redirect to="/" /> :
          <div className={styles.home}>
            <div className={styles['home__left-container']}>
              <Navigation newFile={() => setNewFolder(true)} uploadFile={() => setUploadFile(true)} signOut={signOut} user={user} />
            </div>
            <div className={styles['home__right-container']}>
              <Header currentPath={props.location} searchFile={searchFile} value={searchValue} />
              <Content currentFolder={currentFolder} currentPath={currentPath} downloadFile={downloadFileRequest} deleteFile={deleteFile} />
            </div>
          </div>
      }
      {uploadFile ? <UploadFile closeClick={() => setUploadFile(false)} uploadFileRequest={uploadFileRequest} /> : null}
      {newFolder === true ? <Dialog currentPath={currentPath} exitDialog={() => setNewFolder(false)} /> : null}
    </>
  )
}

export default Home;
