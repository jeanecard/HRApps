import { Injectable } from '@angular/core';
import { RangeModel } from '../model/range-model';

@Injectable({
  providedIn: 'root'
})
export class HRWebcamRangePreferencesService {

  private static readonly _keyRangeValueStorage = 'webCamRange-Value';
  private static readonly _keyMaxValueStorage = 'webCamRange-Max';
  private static readonly _keyMinValueStorage = 'webCamRange-Min';
  private static readonly _keyDisplayValueStorage = 'webCamRange-Display';

  private _prefix: string = "";

  constructor() { }

  public get prefix(): string {
    return this._prefix;
  }
  public set prefix(value: string) {
    this._prefix = value;
  }


  /**
* Get the default value from local storage
*  1- Check context
*  2- If Local Storage is not fully available and consistant, return null value
*  3- Else return value from local storage
* @method getDefaultValue
* @return {RangeModel} a rangeModel from local storage or the default value if localstorage is not set or properly set.
*/

  public getDefaultValue(): RangeModel {
    //1-
    if (localStorage == null || localStorage == undefined) {
      return this.getNullValue();
    }
    //2-
    const lsValue = localStorage.getItem(this._prefix + HRWebcamRangePreferencesService._keyRangeValueStorage);
    const lsMax = localStorage.getItem(this._prefix + HRWebcamRangePreferencesService._keyMaxValueStorage);
    const lsMin = localStorage.getItem(this._prefix + HRWebcamRangePreferencesService._keyMinValueStorage);
    const lsDisplay = localStorage.getItem(this._prefix +HRWebcamRangePreferencesService._keyDisplayValueStorage);
    if (!lsValue || !lsMax || !lsMin || !lsDisplay) {
      return this.getNullValue();
    }
    const lsValueNumber = Number(lsValue);
    const lsMaxNumber = Number(lsMax);
    const lsMinNumber = Number(lsMin);
    let lsDisplayBoolean = true;
    //TODO revoir les conversions.
    if(lsDisplay === 'false') {
      lsDisplayBoolean = false;
    }
    if (lsValueNumber === NaN || lsMaxNumber === NaN || lsMinNumber === NaN) {
      return this.getNullValue();
    }
    //3-
    return { max: lsMaxNumber, min: lsMinNumber, range: lsValueNumber, display: lsDisplayBoolean };

  }

  /**
* Set the value to local storage
*  1- Check context
*  2- Set locale storage
* @method setDefaultValue
* @return Nothing. Does not throw any Exception.
*/
  public setDefaultValue(val: RangeModel): void {
    //1-
    if (val && val.max !== NaN && val.min != NaN && val.range != NaN ) {
      //2-

      try {
        localStorage.setItem(this._prefix+ HRWebcamRangePreferencesService._keyRangeValueStorage, val.range.toString());
        localStorage.setItem(this._prefix+ HRWebcamRangePreferencesService._keyMaxValueStorage, val.max.toString());
        localStorage.setItem(this._prefix + HRWebcamRangePreferencesService._keyMinValueStorage, val.min.toString());
        localStorage.setItem(this._prefix +HRWebcamRangePreferencesService._keyDisplayValueStorage, val.display.toString());
      }
      catch{
        console.log("Local storage not available.");
      }
    }
  }
  /**
 * Get the null value 
 * @method getNullValue
 * @return a initialized  RangeModel
 */
  public getNullValue(): RangeModel {
    return { max: 150, min: 1, range: 20, display: true };
  }



}
