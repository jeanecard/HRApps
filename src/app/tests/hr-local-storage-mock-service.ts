import { HrStorageServiceInterface } from '../shared/hr-storage-service-interface';

export class HrLocalStorageMockService implements HrStorageServiceInterface{
  public throwException : boolean = false;
  public value : string;

  getItem(key: string): string {
    return this.value;
  }  
  
  setItem(key: string, value: string): void {
    if(this.throwException){
      throw new Error("Error.");
    } else{
      this.value = value;
    }
  }

}
