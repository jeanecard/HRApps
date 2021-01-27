import { Component, OnInit } from '@angular/core';
import { HRSoundOrnitho } from 'src/app/model/Ornitho/hrsound-ornitho';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: HRSoundOrnitho[] = [
  {id : 'Psittacus erithacus', url : '', isMale : true, source:"", typeSound:"Alarm", xenoCantoId:"666"}
];
@Component({
  selector: 'app-hr-sounds',
  templateUrl: './hr-sounds.component.html',
  styleUrls: ['./hr-sounds.component.scss']
})
export class HrSoundsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'typeSound', 'isMale', 'source', 'xenoCantoId'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
