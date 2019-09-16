import React from 'react';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  return (
    props.state ?
      <div style={style}>
        a new anecdote <i>{props.notification.author}: {props.notification.content}</i> created!
      </div> :
      null
  );
};

export default Notification;