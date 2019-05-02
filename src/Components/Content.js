import React, { useState } from 'react';
import styles from './Content.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Dropdown from './Dropdown';

function formatLastModified (date) {
  if (moment(new Date()).diff(date, 'days') > 2) {
    return moment(date).format('MMMM Do YYYY, h:mm')
  } else {
    return moment(date).fromNow();
  }
}

function getFileType(tag){
  return tag === 'folder' ?
    <i className={`material-icons ${styles['content__table-icon']}`}>folder</i> :
    <i className={`material-icons ${styles['content__table-icon']}`}>insert_drive_file</i>
}
function formatSize(byte){
  if(!byte) return;
  if(byte < 1000){
    return byte + ' bytes';
  }
  else if(byte >= 1000 && byte < 1000000){
    let kiloByte = (byte / 1000).toFixed(2) + ' kB';
    return kiloByte
  }
  else if(byte >= 1000000 && byte < 1000000000){
    let megaByte = (byte / 1000000).toFixed(2) + ' MB';
    return megaByte;
  }
  else{
    let gigaByte = (byte / 1000000000).toFixed(2) + ' GB';
    return gigaByte;
  }
}

const Content = (props) => {
  const [stars, setStars] = useState([]);
  const [dropdown, setDropdown] = useState({toggled: false});
  function toggleDropdown (e, file) {
    if (dropdown.toggled === true) {
      setDropdown({toggled: false});
    } else {
      setDropdown({toggled: true, posX: e.nativeEvent.clientX, posY: e.nativeEvent.clientY, file});
    }
  }

  function addFavorite (file) {
    let starredFile = {...file, starred: true}; //to indicate if starred, probably not needed
    let arr = stars;
    arr.push(starredFile);
    setStars(arr);
  }

  return (
    <section className={styles.content}>
      {
        !props.currentFolder ? <div>Loading...</div> :
        <table className={styles['content__table']}>
          <thead>
            <tr className={styles['content__table-row']}>
              <th className={styles['content__table-th']}></th>
              <th className={styles['content__table-th']}></th>
              <th className={styles['content__table-th']}>File name</th>
              <th className={styles['content__table-th']}>Last modified</th>
              <th className={styles['content__table-th']}>Size</th>
              <th className={styles['content__table-th']}>Dropdown</th>
            </tr>
          </thead>
          <tbody>
            {props.currentFolder.map((file) => {
              return (
                <tr className={styles['content__table-row']} key={file.id}>
                  <td className={styles['content__table-td']}><i className="material-icons" onClick={() => addFavorite(file)}>star</i></td>
                  <td className={styles['content__table-td']}>{getFileType(file['.tag'])}</td>
                  <td className={styles['content__table-td']}>{file['.tag'] === 'folder' ? <Link className={styles['content__link']} to={`/home${file.path_display}`}>{file.name}</Link> : <span className={styles['content__link']} onClick={() => props.downloadFile(file.name)}>{file.name}</span>}</td>
                  <td className={styles['content__table-td']}>{file.server_modified ? formatLastModified(file.server_modified) : null}</td>
                  <td className={styles['content__table-td']}>{formatSize(file.size)}</td>
                  <td className={styles['content__table-td']}><span onClick={(e) => toggleDropdown(e, file)} className={`${styles['content__table-dropdown']} material-icons`}>more_horiz</span></td>
                </tr>
              )
            })}
          </tbody>
       </table>
      }
      {dropdown.toggled ? <Dropdown toggleDropdown={toggleDropdown} posX={dropdown.posX} posY={dropdown.posY} file={dropdown.file}/> : null}
    </section>
  )
}

export default Content;
