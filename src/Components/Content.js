import React from 'react';
import styles from './Content.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

function formatLastModified (date) {
  if (moment(new Date()).diff(date, 'days') > 2) {
    return moment(date).format('MMMM Do YYYY, h:mm')
  } else {
    return moment(date).fromNow();
  }
}

function getFileType(tag){
  console.log(tag);
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
    console.log(byte);
    let kiloByte = (byte / 1000).toFixed(2) + ' KB';
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
  return (
    <section className={styles.content}>
      {
        !props.currentFolder.entries ? <div>Loading...</div> :
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
            {props.currentFolder.entries.map((file) => {
              console.log(file);

              return (
                <tr className={styles['content__table-row']} key={file.id}>
                  <td className={styles['content__table-td']}><i className="material-icons">star</i></td>
                  <td className={styles['content__table-td']}>{getFileType(file[".tag"])}</td>
                  <td className={styles['content__table-td']}><Link className={styles['content__link']} to={`/home${file.path_display}`}>{file.name}</Link></td>
                  <td className={styles['content__table-td']}>{file.server_modified ? formatLastModified(file.server_modified) : null}</td>
                  <td className={styles['content__table-td']}>{formatSize(file.size)}</td>
                  <td className={styles['content__table-td']}>V</td>
                </tr>
              )
            })}
          </tbody>
       </table>
      }
    </section>
  )
}

export default Content;
