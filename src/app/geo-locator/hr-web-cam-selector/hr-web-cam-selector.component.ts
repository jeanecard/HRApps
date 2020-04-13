import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-hr-web-cam-selector',
  templateUrl: './hr-web-cam-selector.component.html',
  styleUrls: ['./hr-web-cam-selector.component.scss']
})
export class HrWebCamSelectorComponent implements OnInit {
  
  public disabled = true;
  public min = 1;
  public value = 5;

  constructor() { }

  ngOnInit() {
  }

  public formatLabel(value: number) : string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value.toString();
  }

  public onSlide(event : MatSlideToggleChange) : void{
    this.disabled = !event.checked;
    
  }

}
