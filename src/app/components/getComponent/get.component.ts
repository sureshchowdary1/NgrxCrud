import { Component, OnInit } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { DetailsModel } from "src/app/model/details.model";
import { initialStateI } from "src/app/reducer/detail.reducer";

import * as allActions from '../../index'

@Component({
  selector: "app-customer-list",
  templateUrl: "./get.component.html"
})
export class DetailsListComponent implements OnInit {
  // details$: Observable<DetailsModel[]>;
  // error$: Observable<String>;

  // constructor(private store: Store<fromCustomer.AppState>) {}

  // ngOnInit() {
  //   this.store.dispatch(new detailsActions.LOAD_DETAILS());
  //   this.details$ = this.store.pipe(select(fromCustomer.getDetails));
  //   this.error$ = this.store.pipe(select(fromCustomer.getError));
    
  // }

//   deleteCustomer(customer: Customer) {
//     if (confirm("Are You Sure You want to Delete the User?")) {
//       this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
//     }
//   }

//   editCustomer(customer: Customer) {
//     this.store.dispatch(new customerActions.LoadCustomer(customer.id));
//   }

  details : DetailsModel[];
  message:any;
  loading:boolean;
  // idLength:number;
  dataSource : MatTableDataSource<any>;
  displayedColumns:string[] = [`id` , `name` , `email` , `phone` , `address` , `state` , `pincode` , `delete`]

  constructor( public store : Store<allActions.initialStateI>,
              public _router : Router){}

  ngOnInit(){

    this.store.dispatch(new allActions.LOAD_DETAILS());

    const result = this.store.pipe(select(
      allActions.allDetails   
    ))
    // console.log(result)

    result.subscribe((res)=>{
      this.details = res.details;
      this.loading = res.loading;
      this.message = res.message;


      // console.log(this.details , this.message , this.loading)
      // this.idLength = this.details.length

      this.dataSource = new MatTableDataSource(this.details)
    })
    
    
  }

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
    
    
  }
  
}
