import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import serverConnection from '../services/ServerConnection.js';
import Blog from './Blog.js';
import LoginForm from './LoginForm.js';
import BlogForm from './BlogForm.js';
import {login, logout, submitLogin} from '../reducers/loginReducer.js';
import {initBlogs} from '../reducers/blogsReducer';
import {notification, resetNotification} from '../reducers/applicationReducer';
import styles from './Styling.js';
import Users from './Users';
import User from './User';
import {initUsers} from '../reducers/loginReducer.js';
import ServerConnection from '../services/ServerConnection';
import {Alert, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const mapStateToProps = (state) => {
  return {
    applicationState: state.applicationState,
    loginState: state.loginState,
    blogState: state.blogState
  };
};

const mapDispatchToProps = {
  login, logout, initBlogs, notification, resetNotification, initUsers, submitLogin
};

const notificationDuration = 3500;

const App = (props) => {
  const [sorting, setSorting] = useState(null);
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('fs19_blogUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      props.login(user);
      props.submitLogin();
      serverConnection.setToken(user.token);
      props.notification('INFO','session restored');
      setTimeout(() => {
        props.resetNotification();
      }, notificationDuration);
    }
    getBlogs();
    getUsers();
  }, []);

  const getBlogs = () => {
    serverConnection.getBlogs().then(res => {
      if (res.status !== 200) {
        props.notification('ERROR','can not acquire blogs');
        setTimeout(() => {
          props.resetNotification();
        }, notificationDuration);
      } else {
        props.initBlogs(res.data);
      }
    });
  };
  const getUsers = () => {
    ServerConnection.getUsers().then(res => {
      if (res.status !== 200) {
        props.notification('ERROR','can not acquire users');
        setTimeout(() => {
          props.resetNotification();
        }, notificationDuration);
      } else {
        props.initUsers(res.data);
      }
    });
  };

  const Menu = () => {
    const style = {
      marginRight: '1em', color: 'forestgreen'
    };
    return (
      <div>
        <Link style={style} to='/' data-cy='menuHome'>home</Link>
        <Link style={style} to='/add' data-cy='menuAdd'>add new</Link>
        <Link style={style} to='/users' data-cy='menuUsers'>users</Link>
      </div>
    );
  };

  const Header = () => {
    const style = {
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    };
    return (
      <div style={style}>
        <Menu/>
        <h2>Saved blogs</h2>
        <Logged/>
      </div>
    );
  };

  const handleLogout = (event) => {
    event.preventDefault();
    props.logout();
    window.localStorage.removeItem('fs19_blogUser');
    props.notification('INFO','logged out');
    setTimeout(() => {
      props.resetNotification();
    }, notificationDuration);
  };
  const handleLikeBlog = (event, blog) => {
    event.preventDefault();
    serverConnection.likeBlog(blog).then(() => {
      getBlogs();
      props.notification('INFO',`Liked blog: ${blog.title}`);
      setTimeout(() => {
        props.resetNotification();
      }, notificationDuration);
    }).catch(err => {
      console.error(err);
    });
  };
  const Logged = () => {
    return (
      <div>
        <h4 style={{display: 'inline-block'}}>Logged: {props.loginState.user.name}</h4>
        <button style={styles().logoutStyle} data-cy='logoutButton'
          onClick={event => handleLogout(event)}>Logout</button>
      </div>
    );
  };
  const handleSorting = (event) => {
    event.preventDefault();
    switch (sorting) {
    case null:
      setSorting('ascending');
      props.blogState.blogs.sort((a, b) => a.likes - b.likes);
      break;
    case 'ascending':
      setSorting('descending');
      props.blogState.blogs.sort((a, b) => b.likes - a.likes);
      break;
    case 'descending':
      setSorting('ascending');
      props.blogState.blogs.sort((a, b) => a.likes - b.likes);
      break;
    default:
      setSorting('descending');
      props.blogState.blogs.sort((a, b) => b.likes - a.likes);
      break;
    }
  };
  const handleDelete = (event, blog) => {
    event.preventDefault();
    if (window.confirm(`You are about to remove blog ${blog.title} from the list. Proceed?`)) {
      serverConnection.deleteBlog(blog).then(res => {
        if (res.status !== 204) {
          props.notification('ERROR',`There was an error, blog ${blog.title} was not removed.`);
          setTimeout(() => {
            props.resetNotification();
          }, notificationDuration);
        } else {
          props.notification('INFO',`Blog ${blog.title} was removed.`);
          setTimeout(() => {
            props.resetNotification();
          }, notificationDuration);
          getBlogs();
        }
      });
    } else {
      props.notification('ERROR',`Blog ${blog.title} was not removed.`);
      setTimeout(() => {
        props.resetNotification();
      }, notificationDuration);
    }
  };
  const handleCommenting = (event, blog) => {
    event.preventDefault();
    serverConnection.commentBlog(blog, event.target.comment.value).then(res => {
      if (res.status !== 200) {
        getBlogs();
        props.notification('ERROR','Commenting failed.');
        setTimeout(() => {
          props.resetNotification();
        }, notificationDuration);
      } else {
        getBlogs();
        props.notification('INFO','Comment added.');
        setTimeout(() => {
          props.resetNotification();
        }, notificationDuration);
      }
    });
  };
  const sortingButton = () => {
    switch (sorting) {
    case null:
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>ascending</button>
      );
    case 'ascending':
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>descending</button>
      );
    case 'descending':
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>ascending</button>
      );
    default:
      return (
        <button style={styles().inputStyle1} onClick={(event) => handleSorting(event)}>descending</button>
      );
    }
  };
  const RenderBlogs = () => {
    return (
      <Table borderless style={styles().tableStyle}>
        <thead>
          <tr>
            <td><b>Blogs</b></td>
            <td>sort blogs by likes {sortingButton()}</td>
          </tr>
        </thead>
        <tbody style={styles().tableBodyStyle}>
          {props.blogState.blogs.length > 0 ?
            props.blogState.blogs.map((blog) => {
              return (
                <tr key={blog.id}>
                  <td><Link to={`/blogs/${blog.id}`} style={styles().tableBodyStyle} data-cy={blog.title}><i>{blog.title}</i> by <i>{blog.author}</i></Link></td>
                </tr>);
            }) :
            <tr key='noBlogsEntry'>
              <td>no blogs found</td>
            </tr>}
        </tbody>
      </Table>
    );
  };
  const userById = (id) => {
    return props.loginState.users.find(u => u.id === id);
  };
  const blogById = (id) => {
    return props.blogState.blogs.find(b => b.id === id);
  };

  return (
    <div style={{margin: '1em'}}>
      <Router>
        <div>
          {props.loginState.user ?
            <div>
              <Header/>
              {
                props.applicationState.notification &&
                <Alert
                  variant={props.applicationState.notification.type === 'ERROR' ? 'danger' : 'success'}>
                  {props.applicationState.notification.content}
                </Alert>
              }
              <Route exact path='/' render={() => <RenderBlogs/>}/>
              <Route path='/add' render={() => <BlogForm />}/>
              <Route exact path='/users' render={() => <Users/>}/>
              <Route exact path='/users/:id' render={({match}) => <User user={userById(match.params.id)}/>}/>
              <Route exact path='/blogs/:id' render={({match}) =>
                <Blog blogInfo={blogById(match.params.id)} loggedUser={props.loginState.user.userName}
                  like={handleLikeBlog} deleteBlog={handleDelete} commentBlog={handleCommenting}
                />
              }/>
            </div>:
            <div>
              <Redirect to='/login'/>
              <Route path='/login' render={() => <LoginForm/>}/>
            </div>}
          {props.loginState.loginEvent && <Redirect exact to='/'/>}
        </div>
      </Router>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
