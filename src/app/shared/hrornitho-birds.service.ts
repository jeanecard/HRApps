import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HRBirdModel, HRBirdModels } from '../model/hrbird-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HROrnithoBirdsService {

  private readonly stub: HRBirdModel[];
  private readonly serviceURL1 = 'https://hrcorebordersservicesv-3-1.azurewebsites.net/api/v1.0/HRBird?';
  private readonly serviceURLSeason = 'Season=';
  private readonly serviceURLLat = '&Lat=';
  private readonly serviceURLLon = '&Lon=';
  private readonly serviceURLRange = '&Range=';
  private readonly serviceURLLang = '&Lang_Iso_Code=';
  private readonly serviceURLPageSize = '&PageSize=';
  private readonly serviceURLPageNumber = '&PageNumber=';

  private readonly serviceURL3 = '&radiusInKilometers=';

  constructor(private http: HttpClient) {
    this.stub = [
      {
        mainPicture: 'https://i.pinimg.com/originals/8e/1a/e5/8e1ae50a5f1098511fbf51362e7fa8eb.jpg',
        name: 'African gray parrot',
        scientificName: 'Raoul vulgaris',
        mainSound: '',
        sumup: '',
        mainSoundURL : null
      },
      {
        mainPicture: 'http://www.centpourcentnaturel.fr/public/.moineau1_s.jpg',
        name: 'Sparrow',
        scientificName: 'Gros moineau sympa',
        mainSound: '',
        sumup: '',
        mainSoundURL : null
      },
      {
        mainPicture: 'https://champagne-ardenne.lpo.fr/images/multithumb_thumbs/c_215_130_16777215_00_images_mediatheque_images_Decouverte_une_semaine_un_oiseau_2018_merle-noir.jpg',
        name: 'Black bird',
        scientificName: 'Merle qui chante trop bien',
        mainSound: '',
        sumup: '',
        mainSoundURL : null
      },
      {
        mainPicture: 'https://paca.lpo.fr/images/multithumb_thumbs/c_400_322_16777215_00_images_mediatheque_images_section_actualite_2016_08_huppe_fasciee_aurelien_audevard.jpg',
        name: 'Huppe fasciee',
        scientificName: 'bel oiseau',
        mainSound: '',
        sumup: '',
        mainSoundURL : null
      },
      {
        mainPicture: 'https://www.lpo.fr/images/actualites/2015/odj/etourneau_sansonnet_f.cahez_650.jpg',
        name: 'Etourneau',
        scientificName: 'petit gabarit mais très costaud',
        mainSound: '',
        sumup: '',
        mainSoundURL : null
      },

    ];
  }

  public getBirds(): Observable<HRBirdModels> {
    // https://hrcorebordersservicesv-3-1.azurewebsites.net/api/v1.0/HRBird?Season=0&Lat=0&Lon=0&Range=0&Lang_Iso_Code=fr&PageSize=20&PageNumber=0
    return this.http.get<HRBirdModels>(
      this.serviceURL1 +
      + this.serviceURLSeason + '0'
      + this.serviceURLLat + '0.0'
      + this.serviceURLLon + '0.0'
      + this.serviceURLRange + '0.0'
      + this.serviceURLLang + 'fr'
      + this.serviceURLPageSize + '20'
      + this.serviceURLPageNumber + '0'
    );
    //    return of(this.stub);
  }
}
