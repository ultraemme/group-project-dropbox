import React, { useEffect, useState } from 'react';
import styles from '../css/FileType.module.css';
import { Dropbox } from 'dropbox/src/index';
import { token$ } from '../../Store';

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
  }, [props.file.name, props.file.path_lower])

  if(props.file['.tag'] === 'folder'){
    return (
      <i className={`material-icons ${styles['content__table-icon']}`}>folder</i>
    )
  }
  else if(imageRegEx.test(props.file.name)){
    return (
      <img src={url} alt={props.file.name}></img>
    )
  }
  else {
    return (
      <i className={`material-icons ${styles['content__table-icon']}`}>insert_drive_file</i>
    )
  }

}

export default FileType
