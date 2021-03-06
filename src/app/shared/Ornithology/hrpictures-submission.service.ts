import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HrSubmitAge } from 'src/app/model/Ornitho/hr-submit-age';
import { HrSubmitGender } from 'src/app/model/Ornitho/hr-submit-gender';
import { HrSubmitSource } from 'src/app/model/Ornitho/hr-submit-source';
import { FileToUpload, HRPictureOrnithoAddOrUpdateInput, HRPictureOrnithoUpdateInput } from 'src/app/model/Ornitho/hrpicture-ornitho';
import { HRSubmitPictureModel } from 'src/app/model/Ornitho/hrsubmit-picture-model';

@Injectable({
  providedIn: 'root'
})
export class HRPicturesSubmissionService {
private _rootUrl = "https://hrbirdswebapi-dev-as.azurewebsites.net/";
//private _rootUrl = "https://localhost:44308/"; 


  deleteImage(id: string) : Observable<any> {
    return this.http.delete(this._rootUrl + 'api/v1.0/HRBirdSubmission/delete-image-metadata/' + id);
  }

  private API_URL = this._rootUrl + "api/HRPictureStorage/add-picture";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getImages(vernacularName: string): Observable<HRSubmitPictureModel[]> {

    if (vernacularName) {
      return this.http.get<HRSubmitPictureModel[]>(
        this._rootUrl 
        + 'api/v1.0/HRBirdSubmission/get-images/' + vernacularName);
    }
    return of([]);
  }


  public getImage(id: string): Observable<HRSubmitPictureModel> {

    if (id) {
      return this.http.get<HRSubmitPictureModel>(
        this._rootUrl 
        + 'api/v1.0/HRBirdSubmission/get-image/' + id);
    }
    return of(null);
  }
  public addImageData(data: HRSubmitPictureModel): Observable<HRSubmitPictureModel> {
    return this.http.post<HRSubmitPictureModel>(
      this._rootUrl 
      + 'api/v1.0/HRBirdSubmission/add-image-metadata', data);
  }

  public updateImage(data: HRSubmitPictureModel): Observable<HRSubmitPictureModel> {
    return this.http.put<HRSubmitPictureModel>(
      this._rootUrl 
      + 'api/v1.0/HRBirdSubmission/update-image-metadata', data);
  } 

  uploadFile(theFile: FileToUpload): Observable<any> {
    return this.http.post<FileToUpload>(this.API_URL, theFile, this.httpOptions);
  }

  public getSources(): Observable<HrSubmitSource[]> {
    return this.http.get<HrSubmitSource[]>(
      this._rootUrl 
      + 'api/HRSubmitReferences/sources');
  }
  public getGenders(): Observable<HrSubmitGender[]> {
    return this.http.get<HrSubmitGender[]>(
      this._rootUrl 
      + 'api/HRSubmitReferences/gender-types');
  }
  public getAges(): Observable<HrSubmitAge[]> {
    return this.http.get<HrSubmitAge[]>(
      this._rootUrl 
      + 'api/HRSubmitReferences/age-types');
  }
}
