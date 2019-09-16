import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import blogReducer from '../reducers/blogsReducer';
import loginReducer from '../reducers/loginReducer';
import applicationReducer from '../reducers/applicationReducer';

const reducers = combineReducers({
  blogState: blogReducer,
  loginState: loginReducer,
  applicationState: applicationReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;