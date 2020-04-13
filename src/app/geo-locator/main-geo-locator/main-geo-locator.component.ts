import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormControl } from '@angular/forms';
import { HRBorderFilterPreferencesService } from 'src/app/shared/hrborder-filter-preferences.service';

@Component({
  selector: 'app-main-geo-locator',
  templateUrl: './main-geo-locator.component.html',
  styleUrls: ['./main-geo-locator.component.scss']
})
export class MainGeoLocatorComponent implements OnInit, OnDestroy {
  
  public mainGeolocatorForm: FormGroup;
  public hrLayerSelector: FormControl;
  public locatorMap : FormControl;
  public hrLocatorSelector : FormControl;
  private subscription : Subscription;


  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  breakpoint = 1;
  constructor(private breakpointObserver: BreakpointObserver, private prefService: HRBorderFilterPreferencesService) {
    this.subscription = new Subscription();
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
     let prefs = this.prefService.getDefaultValue();
     //1-Map selector
     this.hrLayerSelector = new FormControl(prefs.map);
     //2- locator Map
     this.locatorMap = new FormControl(prefs.map);
     //3-
     this.hrLocatorSelector = new FormControl('');
 
     this.mainGeolocatorForm = new FormGroup({
       hrLayerSelector: this.hrLayerSelector,
       locatorMap: this.locatorMap,
       hrLocatorSelector: this.hrLocatorSelector
     });
 
     this.subscription.add(this.hrLayerSelector.valueChanges.subscribe(data => {
       this.locatorMap.setValue(data);
     }));
     this.subscription.add(this.hrLocatorSelector.valueChanges.subscribe(data => {
      this.locatorMap.setValue(data);
    }));

  }

}
