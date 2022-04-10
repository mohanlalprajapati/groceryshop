import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroceryList } from '../interfaces/i-grocery-list';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  
  baseURL : string = environment.baseURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http:HttpClient, private router: Router) { }

  getAllGroceryList(): Observable<IGroceryList[]> {
    return this.http.get<IGroceryList[]>(this.baseURL + 'grocerylists/').pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  getGroceryList(groceryListId : number): Observable<IGroceryList> {
    return this.http.get<IGroceryList>(this.baseURL + 'grocerylists/'+ groceryListId + "/").pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  addGroceryList(grocerylist: IGroceryList) : Observable<IGroceryList>{
    console.log(grocerylist);
    return this.http.post<IGroceryList>(this.baseURL + 'grocerylists/', JSON.stringify(grocerylist),this.httpOptions).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  deleteGroceryList(id:number): Observable<any> {
    return this.http.delete(this.baseURL + 'grocerylists/'+ id + "/").pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  updateGroceryList(groceryListId:number,grocerylist:IGroceryList): Observable<IGroceryList> {
    return this.http.put<IGroceryList>(this.baseURL + 'grocerylists/' + groceryListId + "/",JSON.stringify(grocerylist),this.httpOptions).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: HttpErrorResponse) {
    //return throwError(error.message || 'Not able to get data for server');
    return throwError(() => error);
  }
}
