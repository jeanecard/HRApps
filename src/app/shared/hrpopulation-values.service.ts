import { Injectable } from '@angular/core';
import { IValueName } from '../model/value-name';
import { Observable, from } from 'rxjs';
import { PopulationFilterModel } from '../model/population-filter-model';

@Injectable({
  providedIn: 'root'
})
export class HRPopulationValuesService {

  constructor() { }

  //Return an observable on availables values.
  public getPopulationsValues(): Observable<Array<IValueName>> {
    let retour: Array<IValueName> = [];
    retour.push({ value: 0, name: 'No filter' });
    retour.push({ value: 100000, name: '100 000' });
    retour.push({ value: 1000000, name: '1 Million' });
    retour.push({ value: 5000000, name: '5 Millions' });
    retour.push({ value: 20000000, name: '20 Millions' });
    retour.push({ value: 100000000, name: '100 Millions' });
    retour.push({ value: 500000000, name: '500 Millions' });
    retour.push({ value: 1000000000, name: '1 Billion' });
    //Convert Array to sequence of IValueName for an observable.
    return Observable.create(function (observer) {
      observer.next(retour);
      observer.complete();
    });
  }

  //Get default value from local storage
  public getDefaultPopulationFilterValue(): PopulationFilterModel{
    //!TODO
    return {amount:100000, over:true }; 
  }
}
