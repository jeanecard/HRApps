import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saucisse',
  templateUrl: './saucisse.component.html',
  styleUrls: ['./saucisse.component.scss']
})
export class SaucisseComponent implements OnInit {

  card: object = {
    src: './assets/icons/sausage.svg',
    alt: 'Saucisse',
    title: 'You want it ? You\'ve got it !'
  };

  constructor() { }

  ngOnInit() {
  }

}
