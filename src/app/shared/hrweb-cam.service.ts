import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebCamModel } from '../model/web-cam-model';

@Injectable({
  providedIn: 'root'
})
export class HRWebCamService {

  constructor() { }

  public getNearestWebcams(wgs84Lat : number, wgs84Lon : number, radius : number) : Observable<WebCamModel>{

    return of({
      status : '"OK',
      result : {
        limit : 2,
        offset : 2,
        total : 1,
        webcams : [{
          id : '1',
          image : null,
          location : {
            city : '',
            continent : '',
            continent_code : '',
            country : '',
            country_code : '',
            latitude : wgs84Lat + 0.1,
            longitude : wgs84Lon + 0.1,
            region : '',
            region_code: '',
            timezone : ''
          },
          player : null,
          status : '',
          title : 'Essai'
        }
      ]
      }
    });
  }
}
