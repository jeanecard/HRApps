import { Component, OnInit, AfterContentInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Menage
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-main-flags',
  templateUrl: './main-flags.component.html',
  styleUrls: ['./main-flags.component.scss']
})
export class MainFlagsComponent implements OnInit {

  mainFlagForm = new FormGroup({
    hrCountryFilterCtrl: new FormControl(),
    flagListCtrl: new FormControl()
  });

  myControl = new FormControl();
  countriesCount : number = 0;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.mainFlagForm.controls['hrCountryFilterCtrl'].valueChanges.subscribe(filterValue => {
      this.mainFlagForm.controls['flagListCtrl'].setValue(filterValue);
       });

       this.mainFlagForm.controls['flagListCtrl'].valueChanges.subscribe(filterValue => {
        //  console.log('ooooooooooooooooooooooooooooooooooooooooooooooooo');
        //  console.log(this.mainFlagForm.controls['flagListCtrl'].value);
        //  console.log('----------------------------------------------');
        //  console.log(filterValue);
        //  console.log('oooooooooooooooooooooooooooooooooooooooooooooooooo');
        this.countriesCount = this.mainFlagForm.controls['flagListCtrl'].value.countriesCount;
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

  onHRCountryFilterChange(value: any): void{
  }
}

