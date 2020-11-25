const getUsername = (state) => {
  return state.user.username;
};

const getAuthorizationStatus = (state) => {
  return state.user.authorizationStatus;
};

export {getUsername, getAuthorizationStatus};
