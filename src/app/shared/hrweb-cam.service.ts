import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebCamModel, WebCamItemModel } from '../model/web-cam-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HRWebCamService {
  //https://hrcorebordersservicesv-3-1.azurewebsites.net
  private readonly serviceURL1 = 'https://hrcorebordersservicesv-3-1.azurewebsites.net/api/v1.0/HRWebCams?wgs84_lat=';
  private readonly serviceURL2 = '&wgs84_lon=';
  private readonly serviceURL3 = '&radiusInKilometers=';
  
  constructor(private http: HttpClient) { }

  public getNearestWebcams(wgs84Lat : number, wgs84Lon : number, radius : number) : Observable<WebCamModel>{
    
    return this.http.get<WebCamModel>(this.serviceURL1 + wgs84Lat.toString() + this.serviceURL2 + wgs84Lon.toString() + this.serviceURL3 + radius.toString());
  }

  public getStubbedwebCams(): WebCamItemModel[] {
    let webCam1 = {
      id: "1",
      status: "Active",
      title: "Le soulié",
      image: {
        current: {
          icon: "",
          thumbnail: "https://images-webcams.windy.com/63/1514532263/current/thumbnail/1514532263.jpg",
          preview: "",
          toenail: ""
        },
        daylight: {
          icon: "string",
          thumbnail: "string",
          preview: "string",
          toenail: "string"
        },
        sizes: {
          icon: {
            width: 100,
            height: 100
          },
          thumbnail: {
            width: 100,
            height: 100
          },
          preview: {
            width: 100,
            height: 100
          },
          toenail: {
            width: 100,
            height: 100
          }
        },
        update: 100
      },
      location: {
        city: "string",
        region: "string",
        region_code: "string",
        country: "string",
        country_code: "string",
        continent: "string",
        continent_code: "string",
        latitude: 48,
        longitude: 2,
        timezone: "string"
      },
      player: {
        live: {
          available: false,
          embed: "string"
        },
        day: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1514532263/day"
        },
        month: {
          available: true,
          link: "string",
          embed: "string"
        },
        year: {
          available: true,
          link: "string",
          embed: "string"
        },
        lifetime: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1514532263/lifetime"
        }
      }
    };
    let webCam2 = {
      id: "2",
      status: "Active",
      title: "La salvetat",
      image: {
        current: {
          icon: "",
          thumbnail: "https://images-webcams.windy.com/65/1565047565/current/thumbnail/1565047565.jpg",
          preview: "",
          toenail: ""
        },
        daylight: {
          icon: "string",
          thumbnail: "string",
          preview: "string",
          toenail: "string"
        },
        sizes: {
          icon: {
            width: 100,
            height: 100
          },
          thumbnail: {
            width: 100,
            height: 100
          },
          preview: {
            width: 100,
            height: 100
          },
          toenail: {
            width: 100,
            height: 100
          }
        },
        update: 100
      },
      location: {
        city: "string",
        region: "string",
        region_code: "string",
        country: "string",
        country_code: "string",
        continent: "string",
        continent_code: "string",
        latitude: 48,
        longitude: 2,
        timezone: "string"
      },
      player: {
        live: {
          available: false,
          embed: "string"
        },
        day: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1565047565/day"
        },
        month: {
          available: true,
          link: "string",
          embed: "string"
        },
        year: {
          available: true,
          link: "string",
          embed: "string"
        },
        lifetime: {
          available: true,
          link: "string",
          embed: "https://webcams.windy.com/webcams/public/embed/player/1565047565/year"
        }
      }
    }
    return [webCam1, webCam2];

  }
}
