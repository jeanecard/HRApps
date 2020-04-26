import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog,  } from '@angular/material/dialog';
import {  WebCamItemModel } from 'src/app/model/web-cam-model';
import { WebCamDetailComponent } from '../web-cam-detail/web-cam-detail.component';
import { HRGeolocatorPreferencesService } from 'src/app/shared/hrgeolocator-preferences.service';
import { HRGeoLocatorPreferences } from 'src/app/model/hrgeo-locator-preferences';

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
      let  prefs : HRGeoLocatorPreferences = {
        map : this.hrLayerSelector.value,
        mapCenterLat : 0,
        mapCenterLon : 0,
        range : this.hrwebCamRange.value,
      }
      this.prefService.setDefaultValue(prefs);
  
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
      this.locatorMap.patchValue({map : data});
    }));
    this.subscription.add(this.hrLocatorSelector.valueChanges.subscribe(data => {
      this.locatorMap.patchValue(data);
    }));
    this.subscription.add(this.hrwebCamRange.valueChanges.subscribe(data => {
      this.locatorMap.patchValue({range : data});
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
