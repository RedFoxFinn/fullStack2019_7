
const initialState = {
  notification: null,
  style: true
};

const setNotification = (props) => {
  return {
    type: props.notificationType,
    content: props.content
  };
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {...state, notification: setNotification({
      notificationType: action.notificationType, content: action.content
    })};
  case 'RESET_NOTIFICATION':
    return {...state, notification: null};
  default:
    return state;
  }
};

export const notification = (type, content) => {
  return {
    type: 'SET_NOTIFICATION', notificationType: type, content: content
  };
};

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  };
};

export default applicationReducer;