const PopupActionType = {
  CHANGE_POPUP_STATUS: 'CHANGE_POPUP_STATUS',
};

const PopupActionCreator = {
  changePopupStatus: (status) => ({
    type: PopupActionType.CHANGE_POPUP_STATUS,
    payload: status,
  }),
};

export {PopupActionType, PopupActionCreator};
