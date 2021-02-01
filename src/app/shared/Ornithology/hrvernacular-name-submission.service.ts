import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HRVernacularNameSubmissionService {

  constructor(private http: HttpClient) { }
  getExistingVernacularNames(pattern: String): Observable<string[]> {
    return of(["Turdus Merula", "Psitacus erithacus", "Angela Merkel"]);
}
}
