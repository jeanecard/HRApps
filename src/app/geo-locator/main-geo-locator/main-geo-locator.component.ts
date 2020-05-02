import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog,  } from '@angular/material/dialog';
import {  WebCamItemModel } from 'src/app/model/web-cam-model';
import { WebCamDetailComponent } from '../web-cam-detail/web-cam-detail.component';
import { HRGeolocatorPreferencesService } from 'src/app/shared/hrgeolocator-preferences.service';

@Component({
  selector: 'app-main-geo-locator',
  templateUrl: './main-geo-locator.component.html',
  styleUrls: ['./main-geo-locator.component.scss']
})
export class MainGeoLocatorComponent implements OnInit, OnDestroy {

  public mainGeolocatorForm: FormGroup;
  public hrLayerSelector: FormControl;
  public locatorMap: FormControl;
  public hrLocatorSelector: FormControl;
  public hrwebCamRange: FormControl;
  private subscription: Subscription;
  private webCamDialog : Subscription;


  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;
  constructor(private breakpointObserver: BreakpointObserver, 
    private prefService: HRGeolocatorPreferencesService,
    public dialog: MatDialog) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    //1- libération des Observer
    this.subscription.unsubscribe();
    this.webCamDialog.unsubscribe();
    

    //2- Enregistrement despréférences
    if(this.prefService){
      this.prefService.setDefaultValue(this.locatorMap.value);
  
    }
  }

  ngOnInit() {
    let prefs = this.prefService.getDefaultValue();
    //1-Map selector
    this.hrLayerSelector = new FormControl(prefs.map);
    //2- locator Map
    this.locatorMap = new FormControl(prefs);
    //3-
    this.hrLocatorSelector = new FormControl('');
    //4-
    this.hrwebCamRange = new FormControl(prefs.range);

    this.mainGeolocatorForm = new FormGroup({
      hrLayerSelector: this.hrLayerSelector,
      locatorMap: this.locatorMap,
      hrLocatorSelector: this.hrLocatorSelector,
      hrwebCamRange: this.hrwebCamRange

    });

    this.subscription.add(this.hrLayerSelector.valueChanges.subscribe(data => {
      let valueToUpdate = this.locatorMap.value;
      valueToUpdate.map = data;
      this.locatorMap.setValue(valueToUpdate, {emitEvent : false} );
      console.log(this.locatorMap.value);
    }));
    this.subscription.add(this.hrLocatorSelector.valueChanges.subscribe(data => {
      if(data.mapCenterLat !== undefined && data.mapCenterLon !== undefined){
        let valueToUpdate = this.locatorMap.value;
        valueToUpdate.mapCenterLat = data.mapCenterLat;
        valueToUpdate.mapCenterLon = data.mapCenterLon;
        this.locatorMap.setValue(valueToUpdate, {emitEvent : false} );
      
      }
    }));
    this.subscription.add(this.hrwebCamRange.valueChanges.subscribe(data => {
      if(data){
        let valueToUpdate = this.locatorMap.value;
        valueToUpdate.range = data;
        this.locatorMap.setValue(valueToUpdate, {emitEvent : false} );

      }
    }));
    this.webCamDialog = this.locatorMap.valueChanges.subscribe( data =>{
      if(data.webcam){
        this.openDialog(data.webcam);
      }
    }
    );
  }

  public openDialog(webCam: WebCamItemModel): void {
    const dialogRef = this.dialog.open(WebCamDetailComponent, {
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      data: webCam
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private getDialogWidth() : string{
    //TODO
    return '600px';
  }
  private getDialogHeight() : string{
    //TODO
    return '600px';
  }

}
