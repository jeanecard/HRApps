import { Injectable, Inject } from '@angular/core';
import { IValueName } from '../model/value-name';
import { Observable, from } from 'rxjs';
import { PopulationFilterModel } from '../model/population-filter-model';

@Injectable({
  providedIn: 'root'
})
export class HRPopulationValuesService {

  private readonly _keyAmountStorage = 'amount';
  private readonly _keyOverStorage = 'over';

  constructor() {
  }

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

  /**
 * Get the default value from local storage
 *  1- Check context
 *  2- If Local Storage is available and consistant, return value from it
 *  3- Else return this.getNullValue
 * @method getDefaultPopulationFilterValue
 * @return {PopulationFilterModel} a populationModel from local storage or the default value if localstorage is not set.
 */
  public getDefaultPopulationFilterValue(): PopulationFilterModel {
    //1-
    if (localStorage == null || localStorage == undefined) {
      throw Error('Local Storage service is not available');
    }
    //2-
    let lsAmountValue = localStorage.getItem(this._keyAmountStorage);
    let lsOverValue = localStorage.getItem(this._keyOverStorage);
    if (lsAmountValue && lsOverValue) {
      //2-
       let retour = {
          amount: parseInt(lsAmountValue),
          over:  lsOverValue == 'true'
        };
        if(isNaN(retour.amount)){
          retour = this.getNullValue();
        }
      return retour;

    } else {
      //3-
      return this.getNullValue();
    }
  }

  public SetDefaultPopulationFilterValue(val : PopulationFilterModel) : void {
    let amount : string;
    let over : string;
    if(val == null || val == undefined || val.amount == undefined){
      let nullval = this.getNullValue();
      amount = nullval.amount.toString();
      if(nullval.over){
        over = 'true';
      } else{
        over = 'false';
      }
    } else{
      amount = val.amount.toString();
      if(val.over){
        over = 'true';
      } else{
        over = 'false';
      }

    }
    //Don't catch exception
    localStorage.setItem(this._keyAmountStorage,amount);
    localStorage.setItem(this._keyOverStorage,over);

  }

  public getNullValue(): PopulationFilterModel {
    return { amount: 0, over: false };
  }


}
