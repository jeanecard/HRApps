import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Language } from 'src/app/model/language';
import { Observable, from } from 'rxjs';
import { LanguageService } from 'src/app/shared/language.service';
import { Region } from 'src/app/model/region';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-language-filter',
  templateUrl: './language-filter.component.html',
  styleUrls: ['./language-filter.component.scss']
})
export class LanguageFilterComponent implements OnInit {
  @Output() languageChanged = new EventEmitter<Language>();
  @Input() region: Region;

  languages: Language[];
  selectedLanguage: Language;

  constructor(private languageService: LanguageService) {

  }

  ngOnInit() {
    this.region = Region.All;
    this.languageService.getLanguagesByContinent(this.region).subscribe((data: Language[]) => {
      this.languages = new Array<Language>();
      const emptyLanguage = new Language();
      emptyLanguage.name = '';
      this.languages.push(emptyLanguage);
      data.forEach(element => {
        this.languages.push(element);
      });
    }
    );

  }

  onSelectionChange(languageEvent: MatSelectChange) {
    this.languageChanged.emit(languageEvent.value);
  }

  onRegionChange(regionEvent: Region) {
    this.region = regionEvent;
    this.languageService.getLanguagesByContinent(this.region).subscribe((data: Language[]) => {
      this.languages = new Array<Language>();
      const emptyLanguage = new Language();
      emptyLanguage.name = '';
      this.languages.push(emptyLanguage);
      data.forEach(element => {
        this.languages.push(element);
      });
    }
    );
  }
}
