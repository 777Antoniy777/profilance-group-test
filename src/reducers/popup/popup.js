import {PopupActionType} from "../../actions/popup/action-creator";

const initialState = {
  popupStatus: false,
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    case PopupActionType.CHANGE_POPUP_STATUS:
      return {
        ...state,
        popupStatus: action.payload,
      };

    default:
      return state;
  }
}
