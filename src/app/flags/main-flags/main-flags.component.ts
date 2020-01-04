import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HRCountryFilterPreferencesService } from 'src/app/shared/hrcountry-filter-preferences.service';


@Component({
  selector: 'app-main-flags',
  templateUrl: './main-flags.component.html',
  styleUrls: ['./main-flags.component.scss']
})
export class MainFlagsComponent implements OnInit, OnDestroy {
  mainFlagForm : FormGroup;
  hrCountryFilter: FormControl;
  flagList: FormControl;

  countriesCount : number = 0;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;

  constructor(private breakpointObserver: BreakpointObserver, private prefService : HRCountryFilterPreferencesService) {
 
  }

  ngOnInit() {
    let prefs = this.prefService.getDefaultValue();
    this.hrCountryFilter = new FormControl(prefs);
    this.flagList = new FormControl(prefs);

    this.mainFlagForm = new FormGroup({
      hrCountryFilter: this.hrCountryFilter,
      flagList: this.flagList
    });
    this.hrCountryFilter.valueChanges.subscribe(filterValue => {
      this.flagList.setValue(filterValue);
      //Test to save prefs.
      if(filterValue && filterValue.population && filterValue.regionAndLanguage){
        this.prefService.setValue(filterValue);
      }
    });

    this.flagList.valueChanges.subscribe(filterValue => {
        this.countriesCount = this.flagList.value.countriesCount;
   });

    if (window.innerWidth <= 400) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 600) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 800) {
      this.breakpoint = 3;
    } else if (window.innerWidth <= 1000) {
      this.breakpoint = 4;
    } else {
      this.breakpoint = 6;
    }
  }

  ngOnDestroy(): void {
    //Dummy. Why not set default value only on Destroy ??
    console.log('Why not set default value only on Destroy ??');
  }


  onResize(event: any): void {
    if (event.target.innerWidth <= 400) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 600) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth <= 800) {
      this.breakpoint = 3;
    } else if (event.target.innerWidth <= 1000) {
      this.breakpoint = 4;
    } else {
      this.breakpoint = 6;
    }
  }
}

