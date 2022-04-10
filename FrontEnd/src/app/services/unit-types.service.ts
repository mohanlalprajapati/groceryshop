import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUnitType } from '../interfaces/i-unit-type';

@Injectable({
  providedIn: 'root'
})
export class UnitTypesService {
  baseUrl: string = environment.baseURL;
  constructor(private httpService:HttpClient) { }

  getUnitTypes(): Observable<IUnitType[]> {
    return this.httpService.get<IUnitType[]>(this.baseUrl + "unittypes"+ "/").pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Not able to get data for server');

  }

}
