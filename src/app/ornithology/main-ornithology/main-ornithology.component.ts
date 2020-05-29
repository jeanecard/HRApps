import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
import { HROrnithoBirdsService } from 'src/app/shared/hrornitho-birds.service';
import { HRBirdModel } from 'src/app/model/hrbird-model';

@Component({
  selector: 'app-main-ornithology',
  templateUrl: './main-ornithology.component.html',
  styleUrls: ['./main-ornithology.component.scss']
})
export class MainOrnithologyComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;

  public mainOrnithoFormGroup: FormGroup = null;
  public ornithoList : FormControl = null;
  public ornithoMap : FormControl = null;
  public selectedFeature = 0;



  constructor(private breakpointObserver: BreakpointObserver) { 
  }

  ngOnInit() {
    this.ornithoList = new FormControl('');
    this.ornithoMap = new FormControl('');

    this.mainOrnithoFormGroup = new FormGroup({
      ornithoList : this.ornithoList,
      ornithoMap : this.ornithoMap
    });


  }

  public featureSelectedChanged(evt : MatTabChangeEvent): void{
    console.log(evt);
    this.selectedFeature = evt.index;
  }

  public onDisplayMore() : void {

  }

}
