import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HRErrorLogService {

  constructor() {
    //Dummy.
  }
  public logError(error: any) : void {
    if (error instanceof HttpErrorResponse) {
      console.error('HR - HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error('HR - Type error.', error.message);
    } else if (error instanceof Error) {
      console.error('HR - General error.', error.message);
    } else {
      console.error('HR - No known error trapped but something goes wrong', error);
    }
  }
}
