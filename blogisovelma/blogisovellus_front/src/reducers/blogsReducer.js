
const initFormData = () => {
  return {
    title: '',
    author: '',
    url: '',
    likes: 0
  };
};

const initialState = {
  blogs: [],
  newBlog: initFormData(),
  blogForm: false
};

const updateFormData = (props) => {
  switch (props.type) {
  case 'TITLE':
    return {
      title: props.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes
    };
  case 'AUTHOR':
    return {
      title: props.blog.title,
      author: props.author,
      url: props.blog.url,
      likes: props.blog.likes
    };
  case 'URL':
    return {
      title: props.blog.title,
      author: props.blog.author,
      url: props.url,
      likes: props.blog.likes
    };
  case 'LIKES':
    return {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.likes
    };
  default:
    return props.blog;
  }
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INIT_FORM':
    return {...state, newBlog: initFormData(), blogForm: true};
  case 'SET_NEW_TITLE':
    return {...state, newBlog: updateFormData({type: 'TITLE', title: action.title, blog: state.newBlog})};
  case 'SET_NEW_AUTHOR':
    return {...state, newBlog: updateFormData({type: 'AUTHOR', author: action.author, blog: state.newBlog})};
  case 'SET_NEW_URL':
    return {...state, newBlog: updateFormData({type: 'URL', url: action.url, blog: state.newBlog})};
  case 'SET_NEW_LIKES':
    return {...state, newBlog: updateFormData({type: 'LIKES', likes: action.likes, blog: state.newBlog})};
  case 'INIT_BLOGS':
    return {...initialState, blogs: action.blogs};
  case 'ADD_BLOG':
    return {...state, blogs: [...state.blogs, action.newBlog], newBlog: initFormData()};
  case 'CLOSE_FORM':
    return {...state, blogForm: false, newBlog: null};
  default:
    return state;
  }
};

export const initBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS', blogs: blogs
  };
};
export const addBlog = (newBlog) => {
  return {
    type: 'ADD_BLOG', newBlog: newBlog
  };
};
export const setTitle = (title) => {
  return {
    type: 'SET_NEW_TITLE', title: title
  };
};
export const setAuthor = (author) => {
  return {
    type: 'SET_NEW_AUTHOR', author: author
  };
};
export const setUrl = (url) => {
  return {
    type: 'SET_NEW_URL', url: url
  };
};
export const setLikes = (likes) => {
  return {
    type: 'SET_NEW_LIKES', likes: likes
  };
};

export default blogReducer;