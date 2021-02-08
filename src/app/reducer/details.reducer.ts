import * as detailsAction from '../action/details.action'
import * as fromRoot from '../state/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import {DetailsModel} from '../model/details.model'
import { InitialState } from '@ngrx/store/src/models';

export interface DetailsState extends EntityState<DetailsModel> {
    selectedDetailsId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    details: DetailsState;
}

export const detailsAdapter: EntityAdapter<DetailsModel> = createEntityAdapter<DetailsModel>();

export const defaultDetails:DetailsState = {
    ids: [],
    entities: {},
    selectedDetailsId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = detailsAdapter.getInitialState(defaultDetails);

export function DetailsReducer(
    state = initialState,
    action: detailsAction.DetailsAction

) : DetailsState{
    switch(action.type){
        case detailsAction.DetailsActionTypes.LOAD_DETAILS_SUCCESS : {
            return detailsAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
              });
        }

        case detailsAction.DetailsActionTypes.LOAD_DETAILS_FAIL: {
            return {
              ...state,
              entities: {},
              loading: false,
              loaded: false,
              error: action.payload
            };
        }

        case detailsAction.DetailsActionTypes.LOAD_DETAIL_SUCCESS : {
            return detailsAdapter.addOne(action.payload, {
              ...state,
              selectedDetailsId: action.payload.id
            });
        }
        case detailsAction.DetailsActionTypes.LOAD_DETAIL_FAIL : {
        return {
            ...state,
            error: action.payload
        };
        }

        case detailsAction.DetailsActionTypes.INSERT_DETAILS_SUCCESS : {
            return detailsAdapter.addOne(action.payload, state);
        }
        case detailsAction.DetailsActionTypes.INSERT_DETAILS_FAIL: {
        return {
            ...state,
            error: action.payload
        };
        }

        case detailsAction.DetailsActionTypes.UPDATE_DETAILS_SUCCESS: {
            return detailsAdapter.updateOne(action.payload, state);
        }
        case detailsAction.DetailsActionTypes.UPDATE_DETAILS_FAIL: {
        return {
            ...state,
            error: action.payload
        };
        }

        case detailsAction.DetailsActionTypes.DELETE_DETAILS_SUCCESS: {
            return detailsAdapter.removeOne(action.payload, state);
        }
        case detailsAction.DetailsActionTypes.DELETE_DETAILS_FAIL: {
        return {
            ...state,
            error: action.payload
        };
        }

        default: {
            return state;
        }

     }
}


const getDetailsFeatureState = createFeatureSelector<DetailsState>(
    "details"
  );
  
  export const getDetails = createSelector(
    getDetailsFeatureState,
    detailsAdapter.getSelectors().selectAll
  );
  
  export const getDetailsLoading = createSelector(
    getDetailsFeatureState,
    (state: DetailsState) => state.loading
  );
  
  export const getDetailsLoaded = createSelector(
    getDetailsFeatureState,
    (state: DetailsState) => state.loaded
  );
  
  export const getError = createSelector(
    getDetailsFeatureState,
    (state: DetailsState) => state.error
  );
  
  export const getCurrentDetailsId = createSelector(
    getDetailsFeatureState,
    (state: DetailsState) => state.selectedDetailsId
  );
  export const getCurrentDetails = createSelector(
    getDetailsFeatureState,
    getCurrentDetailsId,
    state => state.entities[state.selectedDetailsId]
  );
  