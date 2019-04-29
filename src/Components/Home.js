import React, { useEffect } from 'react';
import axios from 'axios';
import { Dropbox } from 'dropbox';
import { token$, updateToken } from '../Store';
import Header from './Header';
import Content from './Content';
import Navigation from './Navigation';
import styles from './Home.module.css';

function getSomething() {
  let dbx = new Dropbox({accessToken: token$.value, fetch});
  console.log('dbx', dbx); //list methods
  dbx.filesListFolder({path: ''})
  .then(res => {
    console.log(JSON.parse(res));
  })
}
function newFile (){
  let dbx = new Dropbox({accessToken: token$.value, fetch});
  console.log('dbx', dbx); //list methods
  dbx.filesCreateFolder({path: 'snus'})
  .then(res => {
    console.log(JSON.parse(res));
  })
}

const Home = (props) => {

  useEffect(() => {
    let token = window.location.search.replace('?code=', '');
    const API = `https://api.dropboxapi.com/oauth2/token?code=${token}&grant_type=authorization_code&redirect_uri=http://localhost:3000/home&client_id=h7s722dkxc8lgct&client_secret=u81zydr2i3rbxth`;

    if(!token$.value){
      axios.post(API)
      .then((res) => {
        console.log(res);
        updateToken(res.data.access_token);
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  }, [])

  return (
    <div className={styles.home}>
      <div className={styles['home__left-container']}>
        <Navigation />
      </div>
      <div className={styles['home__right-container']}>
        <Header />
        <Content />
      </div>
      {
        // <p>Home</p>
        // <button onClick={getSomething}>Get something</button>
        // <button onClick={newFile}>new file</button>
      }
    </div>
  )
}

export default Home;
