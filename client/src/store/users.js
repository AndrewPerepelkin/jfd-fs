import {createAction, createSlice} from '@reduxjs/toolkit';
import authService from '../services/authService';
import localStorageService from '../services/localStorageService';
import userService from '../services/userService';
import {generateAuthError} from '../utils/generateAuthError';
import {generateRegisterError} from '../utils/generateRegisterError';
import getRandomInt from '../utils/getRandomInt';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: {userId: localStorageService.getUserId()},
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userUpdated: (state, action) => {
      const userIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[userIndex] = action.payload;
    },
    userUpdateFailed: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    }
  }
});

const {reducer: usersReducer, actions} = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userUpdated,
  userUpdateFailed,
  userLoggedOut
} = actions;

const userCreateRequested = createAction('users/userCreateRequested');
const userCreateFailed = createAction('users/userCreateFailed');
const userUpdateRequested = createAction('users/userUpdateRequested');

const createUser = (payload) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const {content} = await userService.create(payload);
    dispatch(userCreated(content));
    history.push('/users');
  } catch (error) {
    dispatch(userCreateFailed(error.message));
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const {content} = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};

export const signUp =
  ({email, password, ...rest}) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({email, password});
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({userId: data.localId}));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      );
    } catch (error) {
      const {code, message} = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateRegisterError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const login =
  ({payload, redirect}) =>
  async (dispatch) => {
    dispatch(authRequested());
    const {email, password} = payload;
    try {
      const data = await authService.login({email, password});
      dispatch(authRequestSuccess({userId: data.localId}));
      localStorageService.setTokens(data);
      history.push(redirect);
    } catch (error) {
      const {code, message} = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const {content} = await userService.updateUser(payload);
    dispatch(userUpdated(content));
    history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataLoadingStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
