import { Injectable } from '@angular/core';
import { HrStorageServiceInterface } from './hr-storage-service-interface';

@Injectable({
  providedIn: 'root'
})
export class HrStorageService implements HrStorageServiceInterface{

  constructor() { };
    /**
   * Returns the current value associated with the given key, 
   * or null if the given key does not exist in the list associated with the object.
   * PassThrough from localstorage
   */
  public getItem(key: string): string | null{
    return localStorage.getItem(key);
  }
    /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   * 
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. 
   * (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   * Pass through from localstorage
   */
  public setItem(key: string, value: string): void{
    localStorage.setItem(key, value);
  }
}