import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroceryList } from '../interfaces/i-grocery-list';
import { IGroceryItem } from '../interfaces/i-grocery-item';

@Injectable({
  providedIn: 'root'
})
export class GroceryItemService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  baseURL : string = environment.baseURL;
  constructor(private http:HttpClient, private router: Router) { }

  getGroceryItemList(): Observable<IGroceryItem[]> {
    return this.http.get<IGroceryItem[]>(this.baseURL + 'groceryitems/').pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  deleteGroceryItem(id:number): Observable<any> {
    return this.http.delete(this.baseURL + 'groceryitems/'+ id + "/").pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  updateGroceryItem(groceryItem:IGroceryItem): Observable<any> {
    return this.http.put<IGroceryItem>(this.baseURL + 'groceryitems/' + groceryItem.id + "/",JSON.stringify(groceryItem),this.httpOptions).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Not able to get data for server');

  }
}
