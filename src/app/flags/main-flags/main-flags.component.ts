import { Component, OnInit, AfterContentInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Menage
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-main-flags',
  templateUrl: './main-flags.component.html',
  styleUrls: ['./main-flags.component.scss']
})
export class MainFlagsComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['All', 'Africa', 'Europe', 'Asia', 'Polar', 'America', 'Oceania'];
  filteredOptions: Observable<string[]>;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  onImageLoaded(card: any): void {
    if (card) {
      card.loaded = true;
    }
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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

