import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
  /**
 * Class to log by type Adding date of occurence.
  */
export class HRErrorLogService {
  constructor() {
    //Dummy.
  }
  /**
 * Log error by type according to the inpout error type.
 * If type is unknow, log in unknow error.
 * @method logError
 * @return nothing but display log on console..
 */
  public logError(error: any) : void {
    let curDate = new Date().toString();
    if (error instanceof HttpErrorResponse) {
      console.error(HRErrorLogServiceConstants.httpErrorHeader + curDate +  error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error(HRErrorLogServiceConstants.typeErrorHeader  + curDate, error.message);
    } else if (error instanceof Error) {
      console.error(HRErrorLogServiceConstants.generalErrorHeader  + curDate, error.message);
    } else {
      console.error(HRErrorLogServiceConstants.unknownErrorHeader  + curDate, error);
    }
  }
}

export class HRErrorLogServiceConstants{
  public static readonly httpErrorHeader = 'HR - HTTP error. ';
  public static readonly typeErrorHeader = 'HR - Type error. ';
  public static readonly generalErrorHeader = 'HR - General error. ';
  public static readonly unknownErrorHeader = 'HR - No known error trapped but something goes wrong ';
}