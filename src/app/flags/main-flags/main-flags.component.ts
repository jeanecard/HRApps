import { Component, OnInit, AfterContentInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Menage
import { FormControl, FormGroup } from '@angular/forms';
import { Region } from 'src/app/model/region';
import { HRCountryFilterPreferencesService } from 'src/app/shared/hrcountry-filter-preferences.service';


@Component({
  selector: 'app-main-flags',
  templateUrl: './main-flags.component.html',
  styleUrls: ['./main-flags.component.scss']
})
export class MainFlagsComponent implements OnInit {

  mainFlagForm : FormGroup;
  countriesCount : number = 0;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;

  constructor(private breakpointObserver: BreakpointObserver, private prefService : HRCountryFilterPreferencesService) {
 
  }

  ngOnInit() {

    this.mainFlagForm = new FormGroup({
      hrCountryFilter: new FormControl(this.prefService.getDefaultValue()),
      flagList: new FormControl()
    });
    this.mainFlagForm.controls['hrCountryFilter'].valueChanges.subscribe(filterValue => {
      this.mainFlagForm.controls['flagList'].setValue(filterValue);
       });

       this.mainFlagForm.controls['flagList'].valueChanges.subscribe(filterValue => {
        this.countriesCount = this.mainFlagForm.controls['flagList'].value.countriesCount;
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

