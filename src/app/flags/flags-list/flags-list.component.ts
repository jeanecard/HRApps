import { Component, OnInit, ɵConsole, forwardRef } from '@angular/core';
import { Language } from 'src/app/model/language';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { Region } from 'src/app/model/region';
import { HRCountryService } from 'src/app/shared/hrcountry.service';
import { HRCountry } from 'src/app/model/hrcountry';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlagDetailComponent } from '../flag-detail/flag-detail.component';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  styleUrls: ['./flags-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlagsListComponent),
      multi: true
    }
  ]
})
export class FlagsListComponent implements OnInit, ControlValueAccessor {

  propagateChange = (_: any) => {};
  propagateTouch = (_: any) => { };


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

  writeValue(value: any): void {
    this.isWorking = true;
    this.isMoreCoutries = false;
    this.hrCountriesDisplayed = null;
    if (value) {
      let lang: Language = {
        iso639_1: value.language,
        iso639_2: '',
        name: '',
        nativeName: ''
      };
      this.hrCountries$ = this.countryService.getCountries(value.region, lang, value.population);
      this.hrCountries$.pipe(take(1)).subscribe(data => {
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
        this.propagateChange({countriesCount: data.length});
      });

    }
  }


  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
