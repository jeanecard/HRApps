import { Component, OnInit, ɵConsole } from '@angular/core';
import { Language } from 'src/app/model/language';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { Region } from 'src/app/model/region';
import { HRCountryService } from 'src/app/shared/hrcountry.service';
import { HRCountry } from 'src/app/model/hrcountry';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlagDetailComponent } from '../flag-detail/flag-detail.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  styleUrls: ['./flags-list.component.scss']
})
export class FlagsListComponent implements OnInit {
  columnCount = 3;
  language: Language = null;
  region: Region = Region.All;
  population: PopulationFilterModel = null;
  countriesCount = '-';

  hrCountries$: Observable<HRCountry[]>;

  constructor(
    private countryService: HRCountryService,
    public dialog: MatDialog) {
    this.hrCountries$ = countryService.getCountries(this.region, this.language, this.population);
    this.hrCountries$.subscribe(data => this.countriesCount = data.length.toString());
  }

  ngOnInit() {
  }
  onResize(event: any): void {
    if (event.target.innerWidth <= 801) {
      this.columnCount = 1;
    } else if (event.target.innerWidth <= 1201) {
      this.columnCount = 2;
    } else if (event.target.innerWidth <= 1601) {
      this.columnCount = 3;
    } else {
      this.columnCount = 4;
    }
  }

  onLanguageChanged(languageEvent: Language) {
    this.language = languageEvent;
    this.hrCountries$ = this.countryService.getCountries(this.region, this.language, this.population);
  }

  onPopulationChanged(populationEvent: PopulationFilterModel) {
    console.log('Population changée interceptée. Montant : ' + populationEvent.amount + ' toggle : ' + populationEvent.over);
    this.population = populationEvent;
    console.log('mmmmmmmmmmmmmmmmmmmm');
    console.log(populationEvent);
    this.hrCountries$ = this.countryService.getCountries(this.region, this.language, this.population);
  }

  onRegionChanged(regionEvent: Region) {
    this.region = regionEvent;
    this.hrCountries$ = this.countryService.getCountries(this.region, this.language, this.population);
  }

  openDialog(country: HRCountry): void {
    const dialogRef = this.dialog.open(FlagDetailComponent, {
      width: '400px',
      data: country
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
