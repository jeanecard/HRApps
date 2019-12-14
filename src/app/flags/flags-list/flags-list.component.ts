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
  isWorking: boolean;
  isMoreCoutries: boolean;

  hrCountries$: Observable<HRCountry[]>;
  hrCountriesDisplayed: HRCountry[];
  hrAllCountries: HRCountry[];

  constructor(
    private countryService: HRCountryService,
    public dialog: MatDialog) {


  }

  ngOnInit() {
    this.isWorking = true;
    this.isMoreCoutries = false;
    this.hrCountries$ = this.countryService.getCountries(this.region, this.language, this.population);
    this.hrCountries$.subscribe(data => {
      this.countriesCount = data.length.toString();
      this.hrAllCountries = data;
      if (data.length > 21) {
        this.hrCountriesDisplayed = data.slice(0, 20);
        this.isMoreCoutries = true;
      } else {
        this.hrCountriesDisplayed = data;
        this.isMoreCoutries = false;
      }
      this.isWorking = false;
    });    
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
    this.isWorking = true;
    this.language = languageEvent;
    this.hrCountriesDisplayed = null;
    this.hrCountries$ = this.countryService.getCountries(this.region, this.language, this.population);
  }

  onPopulationChanged(populationEvent: PopulationFilterModel) {
    this.isWorking = true;
    this.population = populationEvent;
    this.hrCountriesDisplayed = null;
    this.hrCountries$ = this.countryService.getCountries(this.region, this.language, this.population);
  }

  onRegionChanged(regionEvent: Region) {
    this.isWorking = true;
    this.region = regionEvent;
    this.language = null; //!TODO : bad must be set to filter to be synchro or get from filter ...
    this.hrCountriesDisplayed = null;
    this.hrCountries$ = this.countryService.getCountries(this.region, this.language, this.population);
  }

  openDialog(country: HRCountry): void {
    const dialogRef = this.dialog.open(FlagDetailComponent, {
      width: '600px',
      data: country
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  onDisplayMore(): void {
    this.hrCountriesDisplayed = this.hrAllCountries;
    this.isMoreCoutries = false;
  }
}
