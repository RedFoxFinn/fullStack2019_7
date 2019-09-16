import React, {} from 'react';
import PropTypes from 'prop-types';

const SimpleBlog = ({blogInfo, clicker}) => {
  const handleClick = (event) => {
    event.preventDefault();
    clicker(Promise.resolve(blogInfo));
  };
  return (
    <li key={blogInfo.id}>
      <div style={{marginBottom: '0.5em', marginTop: '0.5em'}}>
        <div className='titleAuthor'>
          {blogInfo.title} by {blogInfo.author}
        </div>
        <div className='likes'>
          liked: {blogInfo.likes} times
        </div>
        <button className='likeButton' onClick={(event) => handleClick(event)}>{'Like Blog'}</button>
      </div>
    </li>
  );
};

SimpleBlog.propTypes = {
  clicker: PropTypes.func.isRequired,
  blogInfo: PropTypes.object.isRequired
};

export default SimpleBlog;