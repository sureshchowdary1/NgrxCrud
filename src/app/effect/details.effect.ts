import { Injectable } from "@angular/core";
import { act, Actions, Effect, ofType } from "@ngrx/effects";

import { mergeMap, catchError, map } from "rxjs/operators";
import { merge, Observable ,of} from "rxjs";
import { Action } from "@ngrx/store";
import { DetailsService } from "../service/details.service";
import * as detailsActions from '../action/details.action';
import { DetailsModel } from '../model/details.model'

@Injectable({
    providedIn:'root'
})

export class DetailsEffect {
    constructor(
      private actions$: Actions,
      private detailsService : DetailsService
    ){}

    @Effect()

    loadDetails : Observable<Action> = this.actions$.pipe(
        ofType<detailsActions.LOAD_DETAILS>(
            detailsActions.DetailsActionTypes.LOAD_DETAILS
        ),
        mergeMap(
            (action : detailsActions.LOAD_DETAILS) => 
            this.detailsService.getDetails().pipe(
                map(
                    (details:DetailsModel[])=>
                         new detailsActions.LOAD_DETAILS_SUCCESS(details)
                ),
                catchError(err => of(new detailsActions.LOAD_DETAILS_FAIL(err)))
            )
        )
    );
    
    @Effect()

    loadDetailById : Observable<Action> = this.actions$.pipe(
        ofType<detailsActions.LOAD_DETAIL>(
            detailsActions.DetailsActionTypes.LOAD_DETAIL
        ),
        mergeMap(
            (action : detailsActions.LOAD_DETAIL) => 
            this.detailsService.getDetailsById(action.payload).pipe(
                map(
                    (details:DetailsModel)=>
                         new detailsActions.LOAD_DETAIL_SUCCESS(details)
                ),
                catchError(err => of(new detailsActions.LOAD_DETAIL_FAIL(err)))
            )
        )
    );

    @Effect()

    insertDetails:Observable<Action> =this.actions$.pipe(
        ofType<detailsActions.INSERT_DETAILS>(
            detailsActions.DetailsActionTypes.INSERT_DETAILS
        ),
        map((action : detailsActions.INSERT_DETAILS)=> action.payload),
        mergeMap(
            (details: DetailsModel) => 
            this.detailsService.createDetails(details).pipe(
                map(
                    (newDetails : DetailsModel) => 
                        new detailsActions.INSERT_DETAILS_SUCCESS(newDetails)
                ),
                catchError(err => of(new detailsActions.INSERT_DETAILS_FAIL(err)))
            )
        )
    );

    @Effect()

    updateDetails:Observable<Action> = this.actions$.pipe(
        ofType<detailsActions.UPDATE_DETAILS>(
            detailsActions.DetailsActionTypes.UPDATE_DETAILS
        ),
        map(
            (action : detailsActions.UPDATE_DETAILS) => action.payload
        ),mergeMap((details : DetailsModel) => 
            this.detailsService.UpdateDetails(details).pipe(
                map(
                    (updateDet:DetailsModel) => 

                    new detailsActions.UPDATE_DETAILS_SUCCESS({
                        id : updateDet.id,
                        changes : updateDet
                    })
                ),
                catchError(err => of(new detailsActions.UPDATE_DETAILS_FAIL(err)))
            )
        )
    );

    @Effect()

    deleteDetails:Observable<Action> = this.actions$.pipe(
        ofType<detailsActions.DELETE_DETAILS>(
            detailsActions.DetailsActionTypes.DELETE_DETAILS
        ),
        map(
            (action : detailsActions.DELETE_DETAILS) => action.payload
        ),
        mergeMap((id:number) => 
            this.detailsService.DeleteDetails(id).pipe(
                map(
                    () => new detailsActions.DELETE_DETAILS_SUCCESS(id)
                ),
                catchError(err => of(new detailsActions.DELETE_DETAILS_FAIL(err)))
            )
        )

    )

}