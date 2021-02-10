import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store, State, select } from "@ngrx/store";
import * as detailsActions from "../../action/details.action";
import * as fromReducer from "../../reducer/detail.reducer";
import { DetailsModel } from "../../model/details.model";
import * as alldetails from '../../.'
import {  Router } from "@angular/router";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html"
})
export class DetailsAddComponent implements OnInit {
//   detailsForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private store: Store<fromCustomer.initialStateI>
//   ) {}

//   ngOnInit() {
//     this.detailsForm = this.fb.group({
//       id: ["", Validators.required],
//       name: ["", Validators.required],
//       email: ["", Validators.required],
//       phone: ["", Validators.required],
//       address: ["", Validators.required],
//       state: ["", Validators.required],
//       pincode: ["", Validators.required]
//     });
//   }

//   createDetails() {
//     const newDetails: DetailsModel = {
//       id: this.detailsForm.get("id").value,
//       name: this.detailsForm.get("name").value,
//       email: this.detailsForm.get("email").value,
//       phone: this.detailsForm.get("phone").value,
//       address: this.detailsForm.get("address").value,
//       state: this.detailsForm.get("state").value,
//       pincode: this.detailsForm.get("pincode").value
//     };

//     this.store.dispatch(new customerActions.INSERT_DETAILS(newDetails));

//     this.detailsForm.reset();
//   }
    detailsForm : FormGroup;
    details:DetailsModel[];

    constructor( public store : Store<fromReducer.initialStateI>,
                private _router: Router){
        
    }

    ngOnInit(){
        this.detailsForm =new FormGroup({
            "id":new FormControl(),
            // "name" : new FormControl("",[ Validators.required , Validators.minLength(3) , Validators.maxLength(9) ]),
            "name" : new FormControl(""),
            "email" : new FormControl(""),
            "phone" : new FormControl(""),
            "address" : new FormControl(""),
            "state" : new FormControl(""),
            "pincode" : new FormControl(),
        })
    }

    createDetails(){
        if(confirm("your want to insert details")){
            const newDetails: DetailsModel = {
                id: this.detailsForm.get("id").value,
                name: this.detailsForm.get("name").value,
                email: this.detailsForm.get("email").value,
                phone: this.detailsForm.get("phone").value,
                address: this.detailsForm.get("address").value,
                state: this.detailsForm.get("state").value,
                pincode: this.detailsForm.get("pincode").value
            };

            this.store.dispatch(new detailsActions.INSERT_DETAILS(newDetails));

            const DetailsFun = this.store.pipe(select(alldetails.allDetails));    

            this.detailsForm.reset();
        }
        else{
            throw console.error();  
        }

        this._router.navigate(["/getdetails"])
    }
}
