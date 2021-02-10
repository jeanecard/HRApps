import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HrSubmitAge } from 'src/app/model/Ornitho/hr-submit-age';
import { HrSubmitGender } from 'src/app/model/Ornitho/hr-submit-gender';
import { HrSubmitSource } from 'src/app/model/Ornitho/hr-submit-source';
import { FileToUpload, HRPictureOrnitho } from 'src/app/model/Ornitho/hrpicture-ornitho';

@Injectable({
  providedIn: 'root'
})
export class HRPicturesSubmissionService {


  private _stubMerle: HRPictureOrnitho[];
  private _stubPerroquet: HRPictureOrnitho[];
  private _stubMerkel: HRPictureOrnitho[];

  private API_URL = "https://localhost:44308/api/v1.0/HRBirdSubmission/add-picture";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this._stubMerle = [];
    this._stubPerroquet = [];
    this._stubMerkel = [];

  }

  public getImages(vernacularName: string): Observable<HRPictureOrnitho[]> {

    if (vernacularName) {
      return this.http.get<HRPictureOrnitho[]>('https://localhost:44308/api/v1.0/HRBirdSubmission/get-images/' + vernacularName);
    }
    return of([]);
  }

  public addImage(data: HRPictureOrnitho): Observable<HRPictureOrnitho> {

    this.http.post<HRPictureOrnitho>('https://localhost:44308/api/v1.0/HRBirdSubmission/add-image', {
      "id": "063c3cd5-a9ff-4fe1-86c3-c12599077559",
      "vernacularName": data.vernacularName,
      "imageData": data.url,
      "typeAge": 1,
      "typeGender": 2,
      "sourceID": 4,
      "credit": data.credit
    }).subscribe(result => {
      console.log("KO ?");
    });
    return of(data);
  }

  public updateImage(data: HRPictureOrnitho): Observable<HRPictureOrnitho> {
    return of(data);
  }

  uploadFile(theFile: FileToUpload): Observable<any> {
    return this.http.post<FileToUpload>(this.API_URL, theFile, this.httpOptions);
  }

  public getSources(): Observable<HrSubmitSource[]> {
    return this.http.get<HrSubmitSource[]>('https://localhost:44308/api/HRSubmitReferences/sources');
  }
  public getGenders(): Observable<HrSubmitGender[]> {
    return this.http.get<HrSubmitGender[]>('https://localhost:44308/api/HRSubmitReferences/gender-types');
  }
  public getAges(): Observable<HrSubmitAge[]> {
    return this.http.get<HrSubmitAge[]>('https://localhost:44308/api/HRSubmitReferences/age-types');
  }
}
