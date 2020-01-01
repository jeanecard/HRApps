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
      console.error('HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error('Type error.', error.message);
    } else if (error instanceof Error) {
      console.error('General error.', error.message);
    } else {
      console.error('No known error trapped but something goes wrong', error);
    }
  }
}
