import { ErrorHandler } from '@angular/core';
import { HRErrorLogService } from './hrerror-log.service';

export class HRErrorHandler extends ErrorHandler  {
  constructor(private logService : HRErrorLogService) {
    super();
  }
    /**
     * Function to handle error thrown in application.
     *  1- Process Error with builtin Angular ErrorHandler (full call stack and debug info available in console.)
     *  2- Specific logging process (waiting for Loggly or ELK or other good util)
     * 
     * @param error : Any type of exception thrown in application.
     *
     */
  handleError(error: any) {
    //1-
    super.handleError(error);
    //2-
    if(this.logService){
        this.logService.logError(error);
    }
  }
}
