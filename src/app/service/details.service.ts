import { Injectable } from "@angular/core";
import {HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { DetailsModel } from '../model/details.model'

@Injectable({
    providedIn : 'root'
})

export class DetailsService{

    private detUrl = "http://localhost:3000/api/details";

    constructor( private http: HttpClient){}

    getDetails():Observable<DetailsModel[]>{
        return this.http.get<DetailsModel[]>(this.detUrl);
    }

    getDetailsById(payload:number):Observable<DetailsModel>{
        return this.http.get<DetailsModel>(`${this.detUrl}/${payload}`);
    }

    createDetails(payload:DetailsModel):Observable<DetailsModel>{
        return this.http.post<DetailsModel>(this.detUrl,payload)
    }

    UpdateDetails(payload:DetailsModel):Observable<DetailsModel>{
        return this.http.put<DetailsModel>(`${this.detUrl}/${payload}`, payload)
    }

    DeleteDetails(payload:number):Observable<DetailsModel>{
        return this.http.delete<DetailsModel>(`${this.detUrl}/${payload}`);
    }
    
}