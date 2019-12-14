import { Component, OnInit, Input } from '@angular/core';
import { Translations } from 'src/app/model/hrcountry';

@Component({
  selector: 'app-hrcountry-translations-information',
  templateUrl: './hrcountry-translations-information.component.html',
  styleUrls: ['./hrcountry-translations-information.component.scss']
})
export class HRCountryTranslationsInformationComponent implements OnInit {
@Input() translations: Translations;

  constructor() { }

  ngOnInit() {
  }

}
