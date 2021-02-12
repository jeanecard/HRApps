import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HrSubmitAge } from 'src/app/model/Ornitho/hr-submit-age';
import { HrSubmitGender } from 'src/app/model/Ornitho/hr-submit-gender';
import { HrSubmitSource } from 'src/app/model/Ornitho/hr-submit-source';
import { FileToUpload, HRPictureOrnithoAddInput, HRPictureOrnithoListItem, HRPictureOrnithoUpdateInput } from 'src/app/model/Ornitho/hrpicture-ornitho';

@Injectable({
  providedIn: 'root'
})
export class HRPicturesSubmissionService {
  deleteImage(id: string) : Observable<any> {
    return this.http.delete('https://localhost:44308/api/v1.0/HRBirdSubmission/delete-image-data/' + id);
  }

  private API_URL = "https://localhost:44308/api/v1.0/HRBirdSubmission/add-picture";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getImages(vernacularName: string): Observable<HRPictureOrnithoListItem[]> {

    if (vernacularName) {
      return this.http.get<HRPictureOrnithoListItem[]>('https://localhost:44308/api/v1.0/HRBirdSubmission/get-images/' + vernacularName);
    }
    return of([]);
  }

  public addImageData(data: HRPictureOrnithoAddInput): Observable<HRPictureOrnithoAddInput> {

    this.http.post<HRPictureOrnithoAddInput>('https://localhost:44308/api/v1.0/HRBirdSubmission/add-image-data', data).subscribe(result => {
      console.log("KO ?");
    });
    return of(data);
  }

  public updateImage(data: HRPictureOrnithoUpdateInput): Observable<HRPictureOrnithoUpdateInput> {
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
