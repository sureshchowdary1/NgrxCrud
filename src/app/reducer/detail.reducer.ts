import { DetailsAction, DetailsActionTypes } from "../action/details.action";
import { DetailsModel } from "../model/details.model";

export interface initialStateI{
    loading:boolean;
    details : DetailsModel[];
    message : any;
}

const initialState = {
    loading : false,
    details : [],
    message : ''
}

export function DetailsReducer(state=initialState,action:DetailsAction):initialStateI{
    switch(action.type){

        case DetailsActionTypes.LOAD_DETAILS:
            return{
                ...state,
                loading:false,
                message:"",
                details:[]
            }
        
        case DetailsActionTypes.LOAD_DETAILS_SUCCESS:
            
            return{
                ...state,
                message: "Details loaded successfully",
                loading:true,
                details:action.payload
            }
        
        case DetailsActionTypes.LOAD_DETAILS_FAIL:
            return{
                // ...state,
                message:'err',
                details:[],
                loading:true

        }

        case DetailsActionTypes.INSERT_DETAILS:
            return{
                ...state,
                loading:false,
                message:'',
                details:[]
            }
        
        case DetailsActionTypes.INSERT_DETAILS_SUCCESS:
            const updatedData = [...state['details']];
            updatedData.push(action.payload);
            return{
                ...state,
                message:"Insert SucessFull",
                loading:true,
                details:updatedData
            }

        case DetailsActionTypes.INSERT_DETAILS_FAIL:
            return{
                message:'err',
                details:[],
                loading:true
            }
        case DetailsActionTypes.DELETE_DETAILS:
            return{
                ...state,
                loading:false,
                message:'',
                details:[]
            }
        
        case DetailsActionTypes.DELETE_DETAILS_SUCCESS:
            const deleteData = [...state['details']];
            // console.log(deleteData)
            // deleteData.push(splice(action.payload,1));
            
            return{
                ...state,
                message:"Deleted SucessFull",
                loading:true,
                details:deleteData
            }

        case DetailsActionTypes.DELETE_DETAILS_FAIL:
            return{
                message:'err',
                details:[],
                loading:true
            }
        
        default:
            return state;
        
    }
}