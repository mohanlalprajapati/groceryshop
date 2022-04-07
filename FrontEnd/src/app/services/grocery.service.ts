import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroceryList } from '../interfaces/i-grocery-list';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  baseURL : string = environment.baseURL;
  constructor(private http:HttpClient, private router: Router) { }

  getGroceryList(): Observable<IGroceryList[]> {
    return this.http.get<IGroceryList[]>(this.baseURL + 'grocerylists/').pipe(
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
  updateGroceryList(grocerylist:IGroceryList): Observable<any> {
    return this.http.put<IGroceryList>(this.baseURL + 'grocerylists/',JSON.stringify(grocerylist)).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Not able to get data for server');

  }
}
