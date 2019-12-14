import { Component, OnInit, Input } from '@angular/core';
import { HRCountry } from 'src/app/model/hrcountry';

@Component({
  selector: 'app-hrcountry-general-information',
  templateUrl: './hrcountry-general-information.component.html',
  styleUrls: ['./hrcountry-general-information.component.scss']
})
export class HRCountryGeneralInformationComponent  {
  @Input() country: HRCountry;
  constructor() { }


}
