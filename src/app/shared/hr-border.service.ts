import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HrBorder } from '../model/hr-border';

@Injectable({
  providedIn: 'root'
})
export class HrBorderService {
  private BaseServiceURL = 'https://fullcoreservices-ci.azurewebsites.net/api/v1.0/HRBordersByContinent/Europe';

  constructor(private http: HttpClient) { }

  getBorders(): Observable<HrBorder[]> {
    let urlToQuery = this.BaseServiceURL;
    
    return this.http.get<HrBorder[]>(urlToQuery);
  }
}
