import React, { useEffect, useState } from 'react';
import styles from './FileType.module.css';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../Store';

const imageRegEx = /\.(gif|jpg|jpeg|tiff|tif|png|bmp)$/i;

const FileType = (props) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if(imageRegEx.test(props.file.name)){
      const dbx = new Dropbox({ accessToken: token$.value, fetch });
      dbx.filesGetThumbnail({path: props.file.path_lower, size: 'w32h32'})
      .then((res) => {
        let urlBlob = URL.createObjectURL(res.fileBlob);
        setUrl(urlBlob);
      })
    }
  }, [])

  if(props.file['.tag'] === 'folder'){
    return (
      <i className={`material-icons ${styles['content__table-icon']}`}>folder</i>
    )
  }
  else if(imageRegEx.test(props.file.name)){
    return (
      <img src={url}></img>
    )
  }
  else {
    return (
      <i className={`material-icons ${styles['content__table-icon']}`}>insert_drive_file</i>
    )
  }

}

export default FileType
