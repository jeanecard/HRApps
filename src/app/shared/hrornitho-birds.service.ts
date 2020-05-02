import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HRBirdModel } from '../model/hrbird-model';

@Injectable({
  providedIn: 'root'
})
export class HROrnithoBirdsService {

  private readonly stub : HRBirdModel[];

  constructor() { 
    this.stub = [
      {
       mainPicture : 'https://i.pinimg.com/originals/8e/1a/e5/8e1ae50a5f1098511fbf51362e7fa8eb.jpg',
       name : 'African gray parrot',
      scientificName : 'Raoul vulgaris' 
      },
      {
        mainPicture : 'http://www.centpourcentnaturel.fr/public/.moineau1_s.jpg',
        name : 'Sparrow',
       scientificName : 'Gros moineau sympa' 
       },
       {
        mainPicture : 'https://champagne-ardenne.lpo.fr/images/multithumb_thumbs/c_215_130_16777215_00_images_mediatheque_images_Decouverte_une_semaine_un_oiseau_2018_merle-noir.jpg',
        name : 'Black bird',
       scientificName : 'Merle qui chante trop bien' 
       },
       {
        mainPicture : 'https://paca.lpo.fr/images/multithumb_thumbs/c_400_322_16777215_00_images_mediatheque_images_section_actualite_2016_08_huppe_fasciee_aurelien_audevard.jpg',
        name : 'Huppe fasciee',
       scientificName : 'bel oiseau' 
       },
       {
        mainPicture : 'https://www.lpo.fr/images/actualites/2015/odj/etourneau_sansonnet_f.cahez_650.jpg',
        name : 'Etourneau',
       scientificName : 'petit gabarit mais très costaud' 
       },
    
    ];
  }

  public getBirds(): Observable<HRBirdModel[]> {
    return of(this.stub);
  }
}
