import React, { useState, useEffect } from 'react';
import styles from '../css/MoveFile.module.css';
import { Dropbox } from 'dropbox/src/index';
import { token$ } from '../../Store';

function formatFromPath(path){
  let pathSplit = path.split('/');
  pathSplit.pop();
  let rv = pathSplit.join(' > ');
  return rv;
}

function formatToPath(path){
  if(path === '/'){
    return 'Home';
  }
  else if(!path){
    return '';
  }
  let pathSplit = path.split('/');
  let rv = pathSplit.join(' > ');
  rv = 'Home ' + rv;
  return rv;
}

const CopyFile = (props) => {
  const [folderList, setFolderList] = useState([]);
  const [selectedPath, setSelectedPath] = useState('');

  function onChangeTest(e){
    setSelectedPath(e.target.value);
  }

  useEffect(() => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    dbx.filesListFolder({
      path: '',
      recursive: true,
    })
      .then((res) => {
        let newFolderList = res.entries.filter((entry) => {
          return entry['.tag'] === 'folder';
        })
        setFolderList(newFolderList);
      })
  }, [])

  return (
    <div className={styles['overlay-move']}>
      <div className={styles['overlay-move__move-container']}>
        <i className={`material-icons ${styles['move-container__close-btn']}`} onClick={props.closeCopyFile}>close</i>
        <span className={styles['move-container__title-wrapper']}>
          <span className={`${styles['move-container__icon']} material-icons`}>file_copy</span>
          <h4 className={styles['move-container__title']}>Copy File</h4>
        </span>
        <div className={styles['move-container__path-wrapper']}>
          <label className={styles['path-wrapper__path-label']}>From: <span className={styles['path-wrapper__path-text']}>{formatFromPath(`Home${props.selectedFile.path_display}`)}</span></label>
          <label className={styles['path-wrapper__path-label']}>To: <span className={styles['path-wrapper__path-text']}>{formatToPath(`${selectedPath}`)}</span></label>
        </div>
        <div className={styles['move-form__folder-container']}>
          <div className={styles['move-form__folder-wrapper']}>
            <input className={styles['move-form__folder-radio']} type='radio' name='folder' value='/' onChange={onChangeTest} />
            <span className={styles['move-form__folder-checkmark']}><i className={`material-icons ${styles['move-form__folder-icon']}`}>folder</i>Home</span>
          </div>
          {
            folderList.map((folder) => {
              return (
                <div className={styles['move-form__folder-wrapper']} key={folder.id}>
                  <input className={styles['move-form__folder-radio']} type='radio' name='folder' value={folder.path_lower} onChange={onChangeTest}/>
                  <span className={styles['move-form__folder-checkmark']}><i className={`material-icons ${styles['move-form__folder-icon']}`}>folder</i>{folder.name}</span>
                </div>
              )
            })
          }
        </div>
        <span className={styles['move-form__btns-wrapper']}>
          <button className={styles['move-form__cancel-btn']} onClick={props.closeCopyFile}>Cancel</button>
          <button className={styles['move-form__submit-btn']} onClick={() => props.copyFileRequest(props.selectedFile, selectedPath)}>Copy File</button>
        </span>
      </div>
    </div>
  )
}

export default CopyFile;
