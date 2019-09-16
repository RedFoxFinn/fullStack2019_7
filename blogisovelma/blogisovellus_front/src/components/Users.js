import React, {} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    users: state.loginState.users
  };
};

const Users = (props) => {
  const RenderUsers = () => {
    return props.users.length > 0 ?
      props.users.map((user) => {
        return (
          <tr key={user.id} style={{color: 'forestgreen'}}>
            <td><Link style={{color: 'forestgreen'}} to={`/users/${user.id}`} data-cy={user.userName}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        );
      }) :
      <tr>
        <td>no users found</td>
      </tr>;
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td style={{paddingRight: '4em'}}><b>user</b></td>
            <td style={{paddingRight: '2em'}}><b>blogs added</b></td>
          </tr>
        </thead>
        <tbody>
          <RenderUsers/>
        </tbody>
      </table>
    </div>
  );
};

export default connect(mapStateToProps)(Users);