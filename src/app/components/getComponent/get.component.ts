import { Component, OnInit } from "@angular/core"

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { DetailsModel } from "src/app/model/details.model";

import * as detailsActions from "../../action/details.action";
import * as fromCustomer from "../../reducer/details.reducer";

@Component({
  selector: "app-customer-list",
  templateUrl: "./get.component.html"
})
export class DetailsListComponent implements OnInit {
  details$: Observable<DetailsModel[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromCustomer.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new detailsActions.LOAD_DETAILS());
    this.details$ = this.store.pipe(select(fromCustomer.getDetails));
    this.error$ = this.store.pipe(select(fromCustomer.getError));
    
  }

//   deleteCustomer(customer: Customer) {
//     if (confirm("Are You Sure You want to Delete the User?")) {
//       this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
//     }
//   }

//   editCustomer(customer: Customer) {
//     this.store.dispatch(new customerActions.LoadCustomer(customer.id));
//   }
}
