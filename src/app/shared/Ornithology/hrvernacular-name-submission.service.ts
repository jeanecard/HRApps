import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HRVernacularNameSubmissionService {

  private _birdsSubmissionGetNames = 'https://hrbirdswebapi-dev-as.azurewebsites.net/api/v1.0/HRBirdSubmission/matching-names/';



  constructor(private http: HttpClient) { }
  getExistingVernacularNames(pattern: String): Observable<string[]> {

    if (pattern) {
    let urlToCall = this._birdsSubmissionGetNames + pattern;
    return this.http.get<string[]>(urlToCall);
    }   
    return of([]);
}
}
