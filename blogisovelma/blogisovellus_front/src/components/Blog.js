import React, {} from 'react';
import styles from './Styling.js';

const Blog = (props) => {
  const blogInfo = props.blogInfo;
  return (
    <div key={blogInfo.id} className='blog' style={{marginBottom: '0.5em', marginTop: '0.5em'}}>
      <h4>
        <i>{blogInfo.title}</i> by <i>{blogInfo.author}</i>
      </h4>
      <div style={{marginTop: '1em'}}>
        <a style={{color: 'forestgreen'}} href={props.blogInfo.url} className='url'>{'more info >'}</a>
        <div className='likes'>
          liked: {blogInfo.likes} times
        </div>
      </div>
      <div style={{marginTop: '1em'}}>
        <button className='likeButton' style={styles().inputStyle1}
          onClick={(event) => props.like(event, blogInfo)}>{'Like Blog'}</button>
        {props.loggedUser === blogInfo.addedBy.userName ?
          <button className='deleteButton' style={styles().inputStyle2} onClick={(event) => props.deleteBlog(event, blogInfo)}>{'Delete Blog'}</button>
          : null}
      </div>
      <form onSubmit={(event) => props.commentBlog(event, blogInfo)} style={{marginTop: '1em'}}>
        <input placeholder='write a comment' name='comment' style={styles().inputStyle2}/>
        <button type='submit' style={styles().inputStyle1}>Comment Blog</button>
      </form>
      <div style={{marginTop: '1em'}}>
        <h5><i>comments:</i></h5>
        <div style={{borderBottom: '1px solid forestgreen'}}>
          {blogInfo.comments.map((comment) => {
            return (
              <p key={`${blogInfo.id}-${comment}`}><i>{comment}</i></p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;