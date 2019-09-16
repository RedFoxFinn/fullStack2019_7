import React from 'react';

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h3><i>{anecdote.content}</i> by <i>{anecdote.author}</i></h3>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  );
};

export default Anecdote;