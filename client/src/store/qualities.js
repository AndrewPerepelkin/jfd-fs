import {createSlice} from '@reduxjs/toolkit';
import qualityService from '../services/qualityService';
import isOutdated from '../utils/outdated';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (store) => {
      store.isLoading = true;
    },
    qualitiesReceived: (store, action) => {
      store.entities = action.payload;
      store.lastFetch = Date.now();
      store.isLoading = false;
    },
    qualitiesRequestFailed: (store, action) => {
      store.error = action.payload;
      store.isLoading = false;
    }
  }
});

const {reducer: qualitiesReducer, actions} = qualitiesSlice;
const {qualitiesRequested, qualitiesReceived, qualitiesRequestFailed} = actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
  const {lastFetch} = getState().qualities;
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const {content} = await qualityService.get();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = [];
    for (const qualityId of qualitiesIds) {
      for (const quality of state.qualities.entities) {
        if (quality._id === qualityId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }
  return [];
};

export default qualitiesReducer;
