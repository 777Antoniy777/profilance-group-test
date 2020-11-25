const UserActionType = {
  SET_USERNAME: 'SET_USERNAME',
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS',
};

const UserActionCreator = {
  setUsername: (data) => ({
    type: UserActionType.SET_USERNAME,
    payload: data,
  }),

  setAuthorizationStatus: (status) => ({
    type: UserActionType.SET_AUTHORIZATION_STATUS,
    payload: status,
  }),
};

export {UserActionType, UserActionCreator};
