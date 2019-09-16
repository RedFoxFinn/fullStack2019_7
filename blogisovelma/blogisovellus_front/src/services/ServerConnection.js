import axios from 'axios';

const baseUrl = 'http://localhost:3003/api';
const blogsUrl = `${baseUrl}/blogs`;
const userUrl = `${baseUrl}/users`;

let token = null;

function setToken(newToken) {
  token = `bearer ${newToken}`;
}

async function getBlogs() {
  return await axios.get(`${blogsUrl}`);
}

async function setBlog(newBlog) {
  const config = {
    headers: {Authorization: token},
  };

  return await axios.post(`${blogsUrl}`, newBlog, config);
}

async function likeBlog(blog) {
  const config = {
    headers: {Authorization: token},
  };

  const update = {
    'title': blog.title,
    'author': blog.author,
    'url': blog.url,
    'likes': blog.likes +1,
    'addedBy': blog.addedBy.id,
    'comments': blog.comments
  };

  return await axios.put(`${blogsUrl}/${blog.id}`, update, config);
}

async function commentBlog(blog, comment) {
  const config = {
    headers: {Authorization: token},
  };

  let update = {
    'title': blog.title,
    'author': blog.author,
    'url': blog.url,
    'likes': blog.likes,
    'addedBy': blog.addedBy.id,
    'comments': [...blog.comments, comment]
  };

  return await axios.put(`${blogsUrl}/${blog.id}`, update, config);
}

async function deleteBlog(blog) {
  const config = {
    headers: {Authorization: token},
  };

  return await axios.delete(`${blogsUrl}/${blog.id}`, config);
}

async function getUsers() {
  return await axios.get(`${userUrl}`);
}

export default {
  setToken,
  getBlogs,
  setBlog,
  likeBlog,
  deleteBlog,
  getUsers,
  commentBlog
};