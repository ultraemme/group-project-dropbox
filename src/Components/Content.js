import React, { useState, useEffect } from 'react';
import styles from './Content.module.css';

const Content = (props) => {
  console.log(props.currentFolder.entries);

  return (
    <section className={styles.content}>
      {
        !props.currentFolder.entries ? <div>Loading...</div> :
        <table>
          <thead>
            <tr>
              <th>Star</th>
              <th>File type</th>
              <th>File name</th>
              <th>Last modified</th>
              <th>Size</th>
              <th>Dropdown</th>
            </tr>
          </thead>
          <tbody>
            {props.currentFolder.entries.map((file) => {
              return (
                <tr key={file.id}>
                  <td>*</td>
                  <td>{file[".tag"]}</td>
                  <td onClick={(e) => props.setPath(file.path_lower)}>{file.name}</td>
                  <td>Last modified</td>
                  <td>Size</td>
                  <td>V</td>
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
