import { Action } from "@ngrx/store";
import { DetailsModel } from "../model/details.model";
import {Update} from '@ngrx/entity'

export enum DetailsActionTypes{
    LOAD_DETAILS = ' [Details] LOAD Details',
    LOAD_DETAILS_SUCCESS = ' [Details] LOAD Details success',
    LOAD_DETAILS_FAIL = ' [Details] LOAD Details fali',
    LOAD_DETAIL = ' [Details] LOAD Detail',
    LOAD_DETAIL_SUCCESS = ' [Details] LOAD Detail success',
    LOAD_DETAIL_FAIL = ' [Details] LOAD Detail fali',
    INSERT_DETAILS = ' [Details] INSERT Details',
    INSERT_DETAILS_SUCCESS = ' [Details] INSERT Details success',
    INSERT_DETAILS_FAIL = ' [Details] INSERT Details fali',
    UPDATE_DETAILS = ' [Details] UPDATE Details',
    UPDATE_DETAILS_SUCCESS = ' [Details] UPDATE Details success',
    UPDATE_DETAILS_FAIL = ' [Details] UPDATE Details fali',
    DELETE_DETAILS = ' [Details] DELETE Details',
    DELETE_DETAILS_SUCCESS = ' [Details] DELETE Details success',
    DELETE_DETAILS_FAIL = ' [Details] DELETE Details fali'
}

export class LOAD_DETAILS implements Action{
    readonly type = DetailsActionTypes.LOAD_DETAILS;
}

export class LOAD_DETAILS_SUCCESS implements Action{
    readonly type = DetailsActionTypes.LOAD_DETAILS_SUCCESS;

    constructor( public payload:DetailsModel[]){}
}

export class LOAD_DETAILS_FAIL implements Action{
    readonly type = DetailsActionTypes.LOAD_DETAILS_FAIL;

    constructor(public payload : string){}
}

export class LOAD_DETAIL implements Action{
    readonly type = DetailsActionTypes.LOAD_DETAIL;
    constructor(public payload:number){}
}

export class LOAD_DETAIL_SUCCESS implements Action{
    readonly type = DetailsActionTypes.LOAD_DETAIL_SUCCESS;

    constructor( public payload:DetailsModel){}
}

export class LOAD_DETAIL_FAIL implements Action{
    readonly type = DetailsActionTypes.LOAD_DETAIL_FAIL;

    constructor(public payload : string){}
}

export class INSERT_DETAILS implements Action{
    readonly type = DetailsActionTypes.INSERT_DETAILS;

    constructor(public payload: DetailsModel) {}
}

export class INSERT_DETAILS_SUCCESS implements Action{
    readonly type = DetailsActionTypes.INSERT_DETAILS_SUCCESS;

    constructor(public payload: DetailsModel) {}

}

export class INSERT_DETAILS_FAIL implements Action{
    readonly type = DetailsActionTypes.INSERT_DETAILS_FAIL;

    constructor(public payload:string){}
}

export class UPDATE_DETAILS implements Action{
    readonly type = DetailsActionTypes.UPDATE_DETAILS;

    constructor(public payload:DetailsModel){}
}

export class UPDATE_DETAILS_SUCCESS implements Action{
    readonly type = DetailsActionTypes.UPDATE_DETAILS_SUCCESS;

    constructor(public payload: Update<DetailsModel>){}
}

export class UPDATE_DETAILS_FAIL implements Action{
    readonly type = DetailsActionTypes.UPDATE_DETAILS_FAIL;

    constructor(public payload: string) {}
}

export class DELETE_DETAILS implements Action{
    readonly type = DetailsActionTypes.DELETE_DETAILS;

    constructor(public payload: number) {}
}

export class DELETE_DETAILS_SUCCESS implements Action{
    readonly type = DetailsActionTypes.DELETE_DETAILS_SUCCESS;

    constructor(public payload: number) {}
}

export class DELETE_DETAILS_FAIL implements Action{
    readonly type = DetailsActionTypes.DELETE_DETAILS_FAIL;

    constructor(public payload: string) {}
}

export type DetailsAction = LOAD_DETAILS | LOAD_DETAILS_SUCCESS | LOAD_DETAILS_FAIL |
                            LOAD_DETAIL | LOAD_DETAIL_SUCCESS | LOAD_DETAIL_FAIL |
                            UPDATE_DETAILS | UPDATE_DETAILS_SUCCESS | UPDATE_DETAILS_FAIL | 
                            INSERT_DETAILS | INSERT_DETAILS_SUCCESS | INSERT_DETAILS_FAIL |
                            DELETE_DETAILS | DELETE_DETAILS_SUCCESS | DELETE_DETAILS_FAIL;