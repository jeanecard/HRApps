import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-countries',
  templateUrl: './main-countries.component.html',
  styleUrls: ['./main-countries.component.scss']
})
export class MainCountriesComponent implements OnInit {

  card: object = {
    src: './assets/icons/barrier.svg',
    alt: 'En construction',
    title: 'En construction ...'
  };

  constructor() { }

  ngOnInit() {
  }

}
