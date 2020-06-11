import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { HRCDNPicturesService } from 'src/app/shared/hrcdnpictures.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hrdash-board',
  templateUrl: './hrdash-board.component.html',
  styleUrls: ['./hrdash-board.component.scss']
})
export class HRDashBoardComponent {

  public cards:Observable<any> = null;
  /** Based on the screen size, switch from standard to one column per row */

  onClick= function (item) {
    this.router.navigateByUrl(item);
};
  //
  onImageLoaded(card: any): void {
    if (card) {
      card.loaded = true;
    }
  }
  constructor(
    private breakpointObserver: BreakpointObserver, 
    private router: Router,
    private picService : HRCDNPicturesService) {
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          return [
            {
              title: 'HR Flags',
              tech: 'Full Angular Material',
              alt: 'Image of a Flag',
              src: picService.getPicture(HRCDNPicturesService.INTERNATIONAL_ID),
              caption: 'Search country flags',
              reDirect: '/flags',
              description: 'Look for a country Flag by Region, language and number of Inahbitants. To get information on a country, click on its flag in the result grid. Data available are capital city, area, currencies, languages spoken and much more ..'
            },
            {
              title: 'HR Map',
              tech: 'OpenLayer 4',
              alt: 'Image of a Map',
              src: picService.getPicture(HRCDNPicturesService.MAP_ID),
              caption: 'Search country on map',
              reDirect: '/countries',
              description: "Look for country on a world map by Region, language and number of Inahbitants. Work in progress..."
            },
            {
              title: 'HR GeoLocation',
              tech: 'Rapid API',
              alt: 'Image of a map with a point of interest',
              src: picService.getPicture(HRCDNPicturesService.GEOLOCATOR_ID),
              caption: 'Search anything on map',
              reDirect: '/geolocator',
              description: 'Look for any place on a world map by its name. Work in progress...'
            },
            {
              title: 'HR Ornithology',
              tech: 'ML.NET',
              alt: 'Image of a Bird',
              src: picService.getPicture(HRCDNPicturesService.HRNITHOLOGY_ID),
              caption: 'Birds sound recognition',
              reDirect: '/ornithology',
              description: 'Birds sounds recognition by Machine learning. Work in progress...'
            }
          ];
        })
      );
     }
}
