import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HRPictureOrnitho } from 'src/app/model/Ornitho/hrpicture-ornitho';

@Injectable({
  providedIn: 'root'
})
export class HRPicturesSubmissionService {


  private _stubMerle: HRPictureOrnitho[];
  private _stubPerroquet: HRPictureOrnitho[];
  private _stubMerkel: HRPictureOrnitho[];

  constructor() {
    this._stubMerle = [];
    this._stubPerroquet = [];
    this._stubMerkel = [];

  }

  public getImages(vernacularName: string): Observable<HRPictureOrnitho[]> {
    if (vernacularName === "Turdus Merula") {
      return of(this._stubMerle);
    } else if (vernacularName === "Psitacus erithacus") {
      return of(this._stubPerroquet);
    } else {
      return of(this._stubMerkel);
    }
  }

  public addImage(data: HRPictureOrnitho): Observable<HRPictureOrnitho> {
    if (data.vernacularName === "Turdus Merula") {
      this._stubMerle.push(data);
    } else if (data.vernacularName === "Psitacus erithacus") {
      this._stubPerroquet.push(data);
    } else {
      this._stubMerkel.push(data);
    }    
    return of(data);
  }

  public updateImage(data: HRPictureOrnitho): Observable<HRPictureOrnitho> {
    return of(data);
  }


}
