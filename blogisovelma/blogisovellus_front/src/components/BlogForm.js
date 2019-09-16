import React from 'react';
import {connect} from 'react-redux';
import styles from './Styling.js';
import serverConnection from '../services/ServerConnection';
import {setTitle,setAuthor,setUrl,setLikes,addBlog} from '../reducers/blogsReducer.js';

const mapStateToProps = (state) => {
  return {
    blogState: state.blogState,
    loginState: state.loginState,
    applicationState: state.applicationState
  };
};

const mapDispatchToProps = {
  setTitle, setAuthor, setUrl, setLikes, addBlog
};

const BlogForm = (props) => {
  const handleSubmitBlog = (event) => {
    event.preventDefault();
    const newBlog = props.blogState.newBlog;
    serverConnection.setBlog(newBlog).then(res => {
      props.addBlog(res.data);
    }).catch(err => {
      if (err.status === 400) {
        props.notification('ERROR','blog addition failed');
        setTimeout(() => {
          props.resetNotification();
        }, 4 * 1000);
      } else if (err.status === 401) {
        props.notification('ERROR','authentication error');
        setTimeout(() => {
          props.resetNotification();
        }, 4 * 1000);
      }
    });
  };

  return (
    <div>
      <h4>Blog submission</h4>
      <form id='blogForm' onSubmit={(event) => handleSubmitBlog(event)}>
        <input data-cy='blogTitle' style={styles().inputStyle1} required autoComplete='false' type='text'
          placeholder='Blog title' value={props.blogState.newBlog.title} onChange={event => props.setTitle(event.target.value)}/><br/>
        <input data-cy='blogAuthor' style={styles().inputStyle1} required autoComplete='false' type='text'
          placeholder='Blog author' value={props.blogState.newBlog.author} onChange={event => props.setAuthor(event.target.value)}/><br/>
        <input data-cy='blogUrl' style={styles().inputStyle1} required autoComplete='false' type='text'
          placeholder='Blog url' value={props.blogState.newBlog.url} onChange={event => props.setUrl(event.target.value)}/><br/>
        <input data-cy='blogLikes' style={styles().inputStyle1} autoComplete='false' type='number'
          placeholder='Blog likes' value={undefined} onChange={event => props.setLikes(event.target.value)}/><br/>
        <input data-cy='blogSubmit' style={styles().inputStyle1} type='submit'/>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm);