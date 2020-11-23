import {UserActionType} from "../../actions/user/action-creator";

const initialState = {
  username: '',
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    case UserActionType.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    default:
      return state;
  }
}
