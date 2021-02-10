import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { DetailsModel } from "src/app/model/details.model";
import * as allActions from '../../index'

@Component({
    selector : 'dele',
    templateUrl : 'delete.component.html'
})

export class DeleteComponent{
    constructor(public store : Store<allActions.initialStateI>,public _router : Router) {}

    loading:boolean;
    details:DetailsModel[]
    message:''
    ngOnInIt(){}
    
    
  deleteDetail( detail:DetailsModel){
    // console.log(detail)
    if (confirm("Are You Sure You want to Delete the User?")) {
      this.store.dispatch(new allActions.DELETE_DETAILS(detail.id));

      const deleteFun = this.store.pipe(select(allActions.allDetails));

        deleteFun.subscribe(res => {
            this.loading= res.loading;
            console.log(this.loading , this.details , this.message)

        });

    }
    else{}
    
    this._router.navigate(["/getdetails"])
  }
}