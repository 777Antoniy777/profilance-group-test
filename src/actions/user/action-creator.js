const UserActionType = {
  SET_USERNAME: 'SET_USERNAME',
};

const UserActionCreator = {
  setUsername: (data) => ({
    type: UserActionType.SET_USERNAME,
    payload: data,
  }),
};

export {UserActionType, UserActionCreator};
