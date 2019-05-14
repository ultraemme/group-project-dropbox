import React, { useState, useEffect } from 'react';
import axios from 'axios/index';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../../Store';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Navigation from './Navigation';
import styles from '../css/Home.module.css';
import Dialog from './Dialog';
import UploadFile from './UploadFile';
import RenameFile from './RenameFile';
import MoveFile from './MoveFile';
import { useDebounce } from "use-debounce/src/index";
import DeleteFile from './DeleteFile';
import CopyFile from './CopyFile';

let pollTimeout;

const Home = (props) => {
  const currentPath = props.location.pathname.substr(5);
  const [uploadFile, setUploadFile] = useState(false);
  const [renameFile, setRenameFile] = useState(false);
  const [renameFileData, setRenameFileData] = useState({});
  const [moveFile, setMoveFile] = useState(false);
  const [moveFileData, setmoveFileData] = useState({});
  const [newFolder, setNewFolder] = useState(false);
  const [currentFolder, setCurrentFolder] = useState([]);
  const [currentSearchFolder,setCurrentSearchFolder] = useState([]);
  const [redirectLogout, setRedirectLogout] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState();
  const [debouncedQuery] = useDebounce(searchValue, 500);
  const [deleteFile, setDeleteFile] = useState(false);
  const [deleteFileData, setDeleteFileData] = useState({});
  const [copyFile, setCopyFile] = useState(false);
  const [copyFileData, setCopyFileData] = useState({})
  const [favorites, setFavorites] = useState([]);

  function startApiPoll(){
    pollTimeout = setTimeout(() => {
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
      .then((res) => {
        setCurrentFolder(res.entries);
        startApiPoll();
      })
    }, 10000)
  }
  function stopApiPoll(){
    clearTimeout(pollTimeout);
  }

  function signOut() {
    localStorage.removeItem('lockbox_favorites');
    setRedirectLogout(true);
    updateToken(null);
  }

  function addFavorite(file) {
    let arr = [...favorites];
    arr.push(file);
    setFavorites(arr);
    localStorage.setItem('lockbox_favorites', JSON.stringify(arr));
  }

  function removeFavorite(file) {
    let arr = favorites.filter(x => {
      return x.id !== file.id;
    })
    setFavorites(arr);
    localStorage.setItem('lockbox_favorites', JSON.stringify(arr));
  }

  function deleteFileDialog (file) {
    setDeleteFile(true);
    setDeleteFileData(file)
  }

  function deleteFileRequest(file) {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    dbx.filesDeleteV2({ path: file.path_lower })
    .then(res => {
      deleteFavorite(res.metadata);
      let newFolder = currentFolder.filter((t) => {
        return file !== t;
      })
      setDeleteFile(false);
      setCurrentFolder(newFolder);
    })
    .catch(err => {
      console.error(err);
    })
  }

  function copyFileDialog (file) {
    setCopyFileData(file)
    setCopyFile(true);
  }

  function copyFileRequest (file, toPath) {
    toPath = (toPath === "/") ? "" : toPath;
    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesCopyV2({
      from_path: file.path_lower,
      to_path: `${toPath}/${file.name}`,
      autorename: true,
    })
    .then(res => {
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
      .then(res => {
        setCurrentFolder(res.entries);
        setCopyFile(false);
      })
      .catch(err => {
        console.error(err);
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  function moveFileDialog(file){
    setmoveFileData(file)
    setMoveFile(true);
  }

  function deleteFavorite(file){
    let favList = JSON.parse(localStorage.getItem('lockbox_favorites'));
    let newFavList = favList.filter((fav) => {
      return file.id !== fav.id;
    })
    setFavorites(newFavList);
    localStorage.setItem('lockbox_favorites', JSON.stringify(newFavList));
  }

  function updateFavorites(file){
    let favList = JSON.parse(localStorage.getItem('lockbox_favorites'));
    let newFavList = favList.map((fav) => {
      if(file.id === fav.id){
        return file;
      }
      else {
        return fav;
      }
    })
    setFavorites(newFavList);
    localStorage.setItem('lockbox_favorites', JSON.stringify(newFavList));
  }

  function moveFileRequest(file, toPath){
    if(toPath === '/') {
      toPath = '';
    } else if(!toPath) {
      return;
    }
    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesMoveV2({
      from_path: file.path_lower,
      to_path: `${toPath}/${file.name}`,
    })
    .then((res) => {
      let movedFile = res.metadata
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
      .then(res => {
        updateFavorites(movedFile);
        setCurrentFolder(res.entries);
        setMoveFile(false);
      })
    })
    .catch((err) => {
      console.log(err);
      setMoveFile(false);
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
      let renamedFile = res.metadata
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
      .then(res => {
        updateFavorites(renamedFile);
        setCurrentFolder(res.entries);
        setRenameFile(false);
      })
    })
  }

  function downloadFileRequest(file){
    if (file['.tag'] === "folder"){
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesDownloadZip({path: file.path_lower})
      .then((res) => {
        let url = URL.createObjectURL(res.fileBlob);
        let downloadButton = document.createElement('a');
        downloadButton.setAttribute('href', url);
        downloadButton.setAttribute('download', res.name);
        downloadButton.click();
      })
      .catch((err) => {
        console.log(err.response);
      })
    }
    else {
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesDownload({path: file.path_lower})
      .then((res) => {
        let url = URL.createObjectURL(res.fileBlob);
        let downloadButton = document.createElement('a');
        downloadButton.setAttribute('href', url);
        downloadButton.setAttribute('download', res.name);
        downloadButton.click();
      })
      .catch((err) => {
        /* Should remove file from favorites */
        deleteFavorite(file);
        console.log(err.response);
      })
    }
  }

  function uploadFileRequest(files){
    if(!files.length || files.length > 1) return;
    if(files[0].size < 150000000){
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
    else {
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
        let user = {
          display_name: res.name.display_name,
          email: res.email,
        }
        setUser(user);
      })
      dbx.filesListFolder({path: currentPath})
      .then(res => {
        setCurrentFolder(res.entries);
        if(localStorage.getItem('lockbox_favorites')) setFavorites(JSON.parse(localStorage.getItem('lockbox_favorites')));
        startApiPoll();
      })
    }
  }, [didMount]);

  useEffect(() => {
    return () => {
      stopApiPoll();
    }
  }, [])

  useEffect(() => {
    if (didMount) {
      stopApiPoll();
      startApiPoll();
      const dbx = new Dropbox({accessToken: token$.value, fetch});
      dbx.filesListFolder({path: currentPath})
      .then(res => {
        setCurrentFolder(res.entries);
      })
      .catch(err => {
        /* Should remove folder from favorites if folder doesn't exist */
        console.log('hejhej');
        console.error(err.response);
      })
    }
  }, [currentPath, newFolder]);

  // SearchFunction
  useEffect(() => {
    if (!searchValue) {
    return;
    }else{
        const dbx = new Dropbox({ accessToken: token$.value, fetch });
        dbx.filesSearch({
          path: "",
          query: searchValue,
        })
          .then(res => {
            let value = res.matches.map(file => {
              return file.metadata
            })
            setCurrentSearchFolder(value);
          })
      }
    
  }, [debouncedQuery])

  function searchFile (e) {
    setSearchValue(e.target.value);
  }
  // SearchFunction ends

  return (
    <>
      {
        redirectLogout ? <Redirect to="/"/> :
          <div className={styles.home}>
            <div className={styles['home__left-container']}>
              <Navigation newFile={() => setNewFolder(true)} uploadFile={() => setUploadFile(true)} signOut={signOut} user={user}/>
            </div>

            <div className={styles['home__right-container']}>
              <Header searchlist={currentSearchFolder} currentPath={props.location} searchFile={searchFile} value={searchValue}/>
              <Content favorites={favorites} removeFavorite={removeFavorite} addFavorite={addFavorite} deleteFile={deleteFileDialog} copyFile={copyFileDialog} currentFolder={currentFolder} currentPath={currentPath} downloadFile={downloadFileRequest} renameFileFunc={renameFileDialog} moveFileFunc={moveFileDialog}/>
            </div>
          </div>
      }
      {moveFile ? <MoveFile closeMoveFile={() => setMoveFile(false)} moveFileRequest={moveFileRequest} selectedFile={moveFileData}/> : null}
      {copyFile ? <CopyFile closeCopyFile={() => setCopyFile(false)} copyFileRequest={copyFileRequest} selectedFile={copyFileData}/> : null}
      {renameFile ? <RenameFile fileData={renameFileData} onRenameFileChange={onRenameFileChange} renameFileRequest={renameFileRequest} closeRenameFile={() => setRenameFile(false)}/> : null}
      {uploadFile ? <UploadFile closeClick={() => setUploadFile(false)} uploadFileRequest={uploadFileRequest}/> : null}
      {newFolder === true ? <Dialog currentPath={currentPath} exitDialog={() => setNewFolder(false)} /> : null}
      {deleteFile ? <DeleteFile file={deleteFileData} deleteFileRequest={deleteFileRequest} closeDialog={() => setDeleteFile(false)}/> : null}
    {
      redirectLogout ? <Redirect to="/"/> :
      <div className={styles.home}>
        <div className={styles['home__left-container']}>
          <Navigation newFile={() => setNewFolder(true)} uploadFile={() => setUploadFile(true)} signOut={signOut} user={user}/>
        </div>
        <div className={styles['home__right-container']}>
          <Header searchlist={currentSearchFolder} currentPath={props.location} searchFile={searchFile} value={searchValue}/>
          <Content favorites={favorites} removeFavorite={removeFavorite} addFavorite={addFavorite} deleteFile={deleteFileDialog} copyFile={copyFileDialog} currentFolder={currentFolder} currentPath={currentPath} downloadFile={downloadFileRequest} renameFileFunc={renameFileDialog} moveFileFunc={moveFileDialog}/>
        </div>
      </div>
    }
    {moveFile ? <MoveFile closeMoveFile={() => setMoveFile(false)} moveFileRequest={moveFileRequest} selectedFile={moveFileData}/> : null}
    {copyFile ? <CopyFile closeCopyFile={() => setCopyFile(false)} copyFileRequest={copyFileRequest} selectedFile={copyFileData}/> : null}
    {renameFile ? <RenameFile fileData={renameFileData} onRenameFileChange={onRenameFileChange} renameFileRequest={renameFileRequest} closeRenameFile={() => setRenameFile(false)}/> : null}
    {uploadFile ? <UploadFile closeClick={() => setUploadFile(false)} uploadFileRequest={uploadFileRequest}/> : null}
    {newFolder === true ? <Dialog currentPath={currentPath} exitDialog={() => setNewFolder(false)} /> : null}
    {deleteFile ? <DeleteFile file={deleteFileData} deleteFileRequest={deleteFileRequest} closeDialog={() => setDeleteFile(false)}/> : null}
    </>
  )
}

export default Home;
