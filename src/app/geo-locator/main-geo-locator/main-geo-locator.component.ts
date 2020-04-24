import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { HRBorderFilterPreferencesService } from 'src/app/shared/hrborder-filter-preferences.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebCamModel, WebCamItemModel } from 'src/app/model/web-cam-model';
import { WebCamDetailComponent } from '../web-cam-detail/web-cam-detail.component';

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
    private prefService: HRBorderFilterPreferencesService,
    public dialog: MatDialog) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.webCamDialog.unsubscribe();
  }

  ngOnInit() {
    let prefs = this.prefService.getDefaultValue();
    //1-Map selector
    this.hrLayerSelector = new FormControl(prefs.map);
    //2- locator Map
    this.locatorMap = new FormControl(prefs.map);
    //3-
    this.hrLocatorSelector = new FormControl('');
    //4-
    this.hrwebCamRange = new FormControl({ range: 10, max: 50, min: 1, display: false });

    this.mainGeolocatorForm = new FormGroup({
      hrLayerSelector: this.hrLayerSelector,
      locatorMap: this.locatorMap,
      hrLocatorSelector: this.hrLocatorSelector,
      hrwebCamRange: this.hrwebCamRange

    });

    this.subscription.add(this.hrLayerSelector.valueChanges.subscribe(data => {
      this.locatorMap.setValue(data);
    }));
    this.subscription.add(this.hrLocatorSelector.valueChanges.subscribe(data => {
      this.locatorMap.setValue(data);
    }));
    this.subscription.add(this.hrwebCamRange.valueChanges.subscribe(data => {
      this.locatorMap.setValue(data);
    }));
    this.webCamDialog = this.locatorMap.valueChanges.subscribe( data =>{
      this.openDialog(data);
    }
    );
  }

  openDialog(webCam: WebCamItemModel): void {
    const dialogRef = this.dialog.open(WebCamDetailComponent, {
      width: '600px',
      height: '600px',
      data: webCam
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
