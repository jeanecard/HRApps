import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrdash-board',
  templateUrl: './hrdash-board.component.html',
  styleUrls: ['./hrdash-board.component.scss']
})
export class HRDashBoardComponent {

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        {
          title: 'HR Flags',
          alt: 'Flag',
          src: '../../../assets/icons/International.png',
          caption: 'Search country flags',
          reDirect: '/flags'
        },
        {
          title: 'HR Map',
          alt: 'Map',
          src: '../../../assets/icons/map95.svg',
          caption: 'Search country on map',
          reDirect: '/countries'
        },
        {
          title: 'HR GeoLocation',
          alt: 'Geo location',
          src: '../../../assets/icons/geoLocator12.svg',
          caption: 'Search anything on map',
          reDirect: '/geolocator'
        },
        {
          title: 'HR Ornithology',
          alt: 'Bird',
          src: '../../../assets/icons/hrnithologie4.svg',
          caption: 'Birds sound recognition',
          reDirect: '/ornithology'
        }
      ];
    })
  );
  onClick(card: any): void {
    this.router.navigate([card.reDirect]);
  }
  //
  onImageLoaded(card: any): void {
    if (card) {
      card.loaded = true;
    }
  }
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

}
