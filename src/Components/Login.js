import React from 'react';
import token from '../accessToken.js';

const Login = (props) => {
  return (
    <>
      <a href='https://www.dropbox.com/oauth2/authorize?client_id=h7s722dkxc8lgct&response_type=code&redirect_uri=http://localhost:3000/home'>CONNECT</a>
    </>
  )
}

export default Login;
