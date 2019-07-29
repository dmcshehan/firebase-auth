import firebaseApp from "../../auth/firebase";
import * as firebase from "firebase/app";

import * as actionTypes from "./actionTypes";

const onSuccessFullLogin = user => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    user: user
  };
};

const onAuthError = error => {
  return {
    type: actionTypes.USER_AUTH_ERROR,
    error: error
  };
};

const onSuccessSignout = user => {
  return {
    type: actionTypes.USER_SIGNOUT_SUCCESS
  };
};

const onRemoveAuthError = () => {
  return {
    type: actionTypes.REMOVE_AUTH_ERROR
  };
};

export const signInExistingUser = (email, password) => dispatch => {
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(onSuccessFullLogin(user));
    })
    .catch(function(error) {
      dispatch(onAuthError(error));
    });
};

export const signUpNewUser = (email, password) => dispatch => {
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(onSuccessFullLogin(user));
    })
    .catch(function(error) {
      dispatch(onAuthError(error));
    });
};

export const checkExistingUser = () => dispatch => {
  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(onSuccessFullLogin(user));
    } else {
      // No user is signed in.
    }
  });
};

export const logoutCurrentUser = () => dispatch => {
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      dispatch(onSuccessSignout());
    });
};

export const removeAuthError = () => dispatch => {
  dispatch(onRemoveAuthError());
};

export const socialSignin = () => dispatch => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebaseApp
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var user = result.user;
      dispatch(onSuccessFullLogin(user));
    })
    .catch(function(error) {
      dispatch(onAuthError(error));
    });
};
