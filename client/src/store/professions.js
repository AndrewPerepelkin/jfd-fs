import {createSlice} from '@reduxjs/toolkit';
import professionService from '../services/professionService';
import isOutdated from '../utils/outdated';

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (store) => {
      store.isLoading = true;
    },
    professionsReceived: (store, action) => {
      store.entities = action.payload;
      store.lastFetch = Date.now();
      store.isLoading = false;
    },
    professionsRequestFailed: (store, action) => {
      store.error = action.payload;
      store.isLoading = false;
    }
  }
});

const {reducer: professionsReducer, actions} = professionsSlice;
const {professionsRequested, professionsReceived, professionsRequestFailed} =
  actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const {lastFetch} = getState().professions;
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const {content} = await professionService.get();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;
export const getProfessionById = (professionId) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => p._id === professionId);
  }
};

export default professionsReducer;
