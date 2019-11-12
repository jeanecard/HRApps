import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Language } from 'src/app/model/language';
import { Observable, from } from 'rxjs';
import { LanguageService } from 'src/app/shared/language.service';
import { Region } from 'src/app/model/region';
import { MatSelectChange } from '@angular/material';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-language-filter',
  templateUrl: './language-filter.component.html',
  styleUrls: ['./language-filter.component.scss']
})
export class LanguageFilterComponent implements OnInit {
  @Output() languageChanged = new EventEmitter<Language>();
  languages$: Observable<Language[]>;
  isWorking: boolean;

  constructor(private languageService: LanguageService) {
    this.isWorking = true;
    this.languages$ = languageService.getLanguagesByContinent(null);
    this.languages$.subscribe(data => this.isWorking = false);
  }

  ngOnInit() {
  }

  onSelectionChange(languageEvent: MatSelectChange) {
    this.languageChanged.emit(languageEvent.value);
  }

  onRegionChange(regionEvent: Region) {
    this.isWorking = true;
    this.languages$ = this.languageService.getLanguagesByContinent(regionEvent);
  }
}
