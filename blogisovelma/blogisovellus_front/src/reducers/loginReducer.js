
const initialState = {
  user: null,
  loginForm: false,
  formUsername: '',
  formPassword: '',
  users: [],
  loginEvent: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'HIDE_SHOW_FORM':
    return {...initialState, loginForm: !state.loginForm};
  case 'SET_USERNAME':
    return {...state, formUsername: action.username};
  case 'SET_PASSWORD':
    return {...state, formPassword: action.password};
  case 'LOGIN':
    return {...state, user: action.user, formUsername: '', formPassword: ''};
  case 'LOGOUT':
    return {...initialState};
  case 'INIT_USERS':
    return {...state, users: action.users};
  case 'SET_LOGIN':
    return {...state, loginEvent: true};
  case 'RESET_LOGIN':
    return {...state, loginEvent: false};
  default:
    return state;
  }
};

export const loginForm = () => {
  return {
    type: 'HIDE_SHOW_FORM'
  };
};
export const username = (username) => {
  return {
    type: 'SET_USERNAME', username: username
  };
};
export const password = (password) => {
  return {
    type: 'SET_PASSWORD', password: password
  };
};
export const login = (user) => {
  return {
    type: 'LOGIN', user: user
  };
};
export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const initUsers = (users) => {
  return {
    type: 'INIT_USERS', users: users
  };
};

export const submitLogin = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_LOGIN'
    });
    setTimeout(() => {
      dispatch({
        type: 'RESET_LOGIN'
      });
    },5000);
  };
};

export default loginReducer;