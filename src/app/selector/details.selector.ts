import { createFeatureSelector, createSelector } from "@ngrx/store";
import { initialStateI } from "../reducer/detail.reducer";

export const obj = createFeatureSelector<initialStateI>('details');

export const allDetails = createSelector(obj,
    (state:initialStateI)=>{
        return state
    })