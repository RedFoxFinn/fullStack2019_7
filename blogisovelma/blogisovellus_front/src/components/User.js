import React, {} from 'react';

const User = (props) => {
  const user = props.user;
  if (props.user === undefined) {
    return null;
  }
  return (
    <div>
      <h3>{user.name} - <i>{user.userName}</i></h3>
      <table id={user.id}>
        <thead>
          <tr>
            <td style={{paddingRight: '4em'}}><b>added blogs:</b></td>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map((blog) => {
            return (
              <tr key={blog.id}>
                <td><i>{blog.title}</i></td>
                <td><i>{blog.author}</i></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;