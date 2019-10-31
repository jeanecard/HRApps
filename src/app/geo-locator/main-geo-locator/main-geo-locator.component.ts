import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-geo-locator',
  templateUrl: './main-geo-locator.component.html',
  styleUrls: ['./main-geo-locator.component.scss']
})
export class MainGeoLocatorComponent implements OnInit {
  card: object = {
    src: './assets/icons/barrier.svg',
    alt: 'En construction',
    title: 'En construction ...'
  };
  data: Array<number> = new Array<number>();

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.data.push(1);
    }
  }

}
