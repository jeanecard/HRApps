import { Component, OnInit, ɵConsole } from '@angular/core';
import { Language } from 'src/app/model/language';
import { PopulationFilterModel } from 'src/app/model/population-filter-model';
import { Region } from 'src/app/model/region';
import { HRCountryService } from 'src/app/shared/hrcountry.service';
import { HRCountry } from 'src/app/model/hrcountry';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlagDetailComponent } from '../flag-detail/flag-detail.component';


@Component({
  selector: 'app-flags-list',
  templateUrl: './flags-list.component.html',
  styleUrls: ['./flags-list.component.scss']
})
export class FlagsListComponent implements OnInit {
  columnCount = 3;
  cards: Array<HRCountry> = null;
  language: Language = null;
  region: Region = Region.All;
  population: PopulationFilterModel = null;

  constructor(
    private countryService: HRCountryService,
    public dialog: MatDialog) { }

  populateCards(regionParam: Region, languageParam: Language, populationParam: PopulationFilterModel) {
    this.cards = new Array<HRCountry>();
    this.countryService.getCountries(regionParam, languageParam, populationParam).subscribe((data: HRCountry[]) => {
      data.forEach(element => {
        this.cards.push(element);
      });
    }
    );
  }

  ngOnInit() {
    this.populateCards(Region.All, null, null);
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
    console.log('Je suis notifié sur langage');
    console.log(languageEvent);
    this.populateCards(this.region, this.language, this.population);
  }

  onPopulationChanged(populationEvent: PopulationFilterModel) {
    this.population = populationEvent;
    console.log('Je suis notifié sur population');
    console.log(populationEvent);
    this.populateCards(this.region, this.language, this.population);
  }

  onRegionChanged(regionEvent: Region) {
    this.region = regionEvent;
    console.log('Je suis notifié sur region');
    console.log(regionEvent);
    this.populateCards(this.region, this.language, this.population);
  }

  openDialog(country: HRCountry): void {
    const dialogRef = this.dialog.open(FlagDetailComponent, {
      width: '400px',
      data: country
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
