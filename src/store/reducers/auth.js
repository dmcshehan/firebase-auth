import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const intialState = {
  user: null,
  error: null
};

const auth = (state = intialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.USER_LOGIN_SUCCESS:
        draft.user = action.user;
        draft.error = null;
        break;
      case actionTypes.USER_SIGNOUT_SUCCESS:
        draft.user = null;
        draft.error = null;
        break;
      case actionTypes.USER_AUTH_ERROR:
        draft.error = action.error;
        break;
      case actionTypes.REMOVE_AUTH_ERROR:
        draft.error = null;
        break;
      default:
        return draft;
    }
  });

export default auth;
