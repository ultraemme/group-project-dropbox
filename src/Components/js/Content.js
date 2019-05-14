import React, { useState } from 'react';
import styles from '../css/Content.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import Dropdown from './Dropdown';
import FileType from './FileType';

function formatLastModified(date) {
  if (moment(new Date()).diff(date, 'days') > 2) {
    return moment(date).format('MMMM Do YYYY, h:mm')
  } else {
    return moment(date).fromNow();
  }
}

function formatSize(byte) {
  if (!byte) return;
  if (byte < 1000) {
    return byte + ' bytes';
  }
  else if (byte >= 1000 && byte < 1000000) {
    let kiloByte = (byte / 1000).toFixed(2) + ' kB';
    return kiloByte
  }
  else if (byte >= 1000000 && byte < 1000000000) {
    let megaByte = (byte / 1000000).toFixed(2) + ' MB';
    return megaByte;
  }
  else {
    let gigaByte = (byte / 1000000000).toFixed(2) + ' GB';
    return gigaByte;
  }
}

const Content = (props) => {
  const [dropdown, setDropdown] = useState({ toggled: false });

  function toggleDropdown(e, file) {
    if (dropdown.toggled === true) {
      setDropdown({ toggled: false });
    } else {
      if (e.nativeEvent.clientY + 222 > e.nativeEvent.view.window.innerHeight) {
        if (e.nativeEvent.clientY > e.nativeEvent.view.window.innerHeight-10) {
          setDropdown({ toggled: true, posX: e.nativeEvent.clientX-10, posY: e.nativeEvent.clientY-221, file });
        } else {
          setDropdown({ toggled: true, posX: e.nativeEvent.clientX-10, posY: e.nativeEvent.clientY-212, file });
        }
      } else {
        setDropdown({ toggled: true, posX: e.nativeEvent.clientX-10, posY: e.nativeEvent.clientY-10, file });
      }
    }
  }

  function renderFavorite(file) {
    for (let favorite of props.favorites) {
      if (favorite.id === file.id) {
        return <td className={styles['content__table-td']}><i className={`${styles['content__star--active']} material-icons`} onClick={() => props.removeFavorite(file)}>star</i></td>
      }
    }
    return <td className={styles['content__table-td']}><i className={`${styles['content__star']} material-icons`} onClick={() => props.addFavorite(file)}>star</i></td>
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
                <th className={styles['content__table-th']}></th>
              </tr>
            </thead>
            <tbody>
              {
                props.currentFolder.map((file) => {
                  return (
                    <tr className={styles['content__table-row']} key={file.id}>
                      {renderFavorite(file)}
                      <td className={styles['content__table-td']}><FileType file={file} /></td>
                      <td className={styles['content__table-td']}>{file['.tag'] === 'folder' ? <Link className={styles['content__link']} to={`/home${file.path_display}`}>{file.name}</Link> : <span className={styles['content__link']} onClick={() => props.downloadFile(file)}>{file.name}</span>}</td>
                      <td className={styles['content__table-td']}>{file.server_modified ? formatLastModified(file.server_modified) : null}</td>
                      <td className={styles['content__table-td']}>{formatSize(file.size)}</td>
                      <td className={styles['content__table-td']}><span onClick={(e) => toggleDropdown(e, file)} className={`${styles['content__table-dropdown']} material-icons`}>more_horiz</span></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
      }
      <table className={styles['content__table']}>
        <thead>
          <tr className={styles['content__table-row']}>
            {props.favorites.length ? <th className={styles['content__table-th']}></th> : null}
            {props.favorites.length ? <th className={styles['content__table-th']}></th> : null}
            <th className={styles['content__table-th']}>
              Favorites
            </th>
          </tr>
        </thead>
        <tbody>
          {
            props.favorites.length ? props.favorites.map(favorite => {
              return (
                <tr className={styles['content__table-row']} key={favorite.id}>
                  <td className={styles['content__fav-table-td']}><i className={`${styles['content__star--active']} material-icons`} onClick={() => props.removeFavorite(favorite)}>star</i></td>
                  <td className={styles['content__fav-table-td']}><FileType file={favorite} /></td>
                  <td className={styles['content__fav-table-td']}>{favorite['.tag'] === 'folder' ? <Link className={styles['content__link']} to={`/home${favorite.path_display}`}>{favorite.name}</Link> : <span className={styles['content__link']} onClick={() => props.downloadFile(favorite)}>{favorite.name}</span>}</td>
                </tr>
              )
            }) : <tr className={styles['content__table-row']}><td className={styles['content__table-td']}>No favorites found :(</td></tr>
          }
        </tbody>
      </table>
      {dropdown.toggled ? <Dropdown favorites={props.favorites} removeFavorite={props.removeFavorite} addFavorite={props.addFavorite} copyFile={props.copyFile} downloadFile={props.downloadFile} deleteFile={props.deleteFile} toggleDropdown={toggleDropdown} posX={dropdown.posX} posY={dropdown.posY} file={dropdown.file} renameFileFunc={props.renameFileFunc} moveFileFunc={props.moveFileFunc} /> : null}
    </section>
  )
}

export default Content;
