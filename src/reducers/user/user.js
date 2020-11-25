import {AuthorizationStatus} from "../../js/enums";
import {UserActionType} from "../../actions/user/action-creator";

const initialState = {
  username: 'Гость',
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    case UserActionType.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    case UserActionType.SET_AUTHORIZATION_STATUS:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    default:
      return state;
  }
}
