import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-ornithology',
  templateUrl: './main-ornithology.component.html',
  styleUrls: ['./main-ornithology.component.scss']
})
export class MainOrnithologyComponent implements OnInit {

  card: object = {
    src: './assets/icons/barrier.svg',
    alt: 'En construction',
    title: 'En construction ...'
  };

  constructor() { }

  ngOnInit() {
  }

}
