import React, {} from 'react';
import {connect} from 'react-redux';
import {loginForm, login, logout, password, username, submitLogin} from '../reducers/loginReducer.js';
import {notification, resetNotification} from '../reducers/applicationReducer.js';
import styles from './Styling.js';
import logIn from '../services/Login';
import ServerConnection from '../services/ServerConnection';

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState,
    applicationState: state.applicationState
  };
};

const mapDispatchToProps = {
  loginForm, login, logout, password, username, notification, resetNotification, submitLogin
};

const LoginForm = (props) => {
  const handleLogin = (event) => {
    event.preventDefault();
    logIn({userName: props.loginState.formUsername, pw: props.loginState.formPassword}).then(res => {
      props.login(res.data);
      window.localStorage.setItem('fs19_blogUser', JSON.stringify(res.data));
      ServerConnection.setToken(res.data.token);
      props.submitLogin();
      props.notification('INFO','login successful');
      setTimeout(() => {
        props.resetNotification();
      }, 4 * 1000);
    }).catch(() => {
      props.notification('ERROR','incorrect username or password');
      setTimeout(() => {
        props.resetNotification();
      }, 4 * 1000);
    });
  };

  return (
    <div>
      <div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <h2 style={{marginRight: '2em'}}>Saved blogs</h2>
          <h4 style={{marginRight: '2em'}}>Login</h4>
        </div>
        <form id='loginForm' onSubmit={(event) => handleLogin(event)}>
          <input className='username' data-cy='username' autoComplete='false' style={styles().inputStyle1} required type='text'
            placeholder='Login: username' value={props.loginState.userName} onChange={event => props.username(event.target.value)}/>
          <input className='password' data-cy='password' autoComplete='false' style={styles().inputStyle2} required type='password'
            placeholder='Login: password' value={props.loginState.password} onChange={event => props.password(event.target.value)}/>
          <input className='loginSubmit' data-cy='loginSubmit' style={styles().inputStyle1} type='submit'/>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);