import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SourceMapModel } from 'src/app/model/source-map-model';
import { Subscription } from 'rxjs';
import { MapLayerService } from 'src/app/shared/map-layer.service';

@Component({
  selector: 'app-sourceselector',
  templateUrl: './sourceselector.component.html',
  styleUrls: ['./sourceselector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SourceselectorComponent),
      multi: true
    }
  ]
})
export class SourceselectorComponent implements OnInit, ControlValueAccessor, OnDestroy {

  propagateChange = (_: any) => { };
  propagateTouch = (_: any) => { };
  private _subscription: Subscription = new Subscription();


  sourcesData: SourceMapModel[] = null;
  sourceSelectorForm: FormGroup = null;
  sourcesGroup: FormControl = null;

  /**
   * Constrctor of SourceselectorComponent
   *
   * @param SourceMapService,
   */

  constructor(private service: MapLayerService) {
    this.sourcesData = service.getSources();
  }

  /**
  * delete remainining observer link.
  *
  */
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  writeValue(obj: any): void {
    this.sourcesGroup.setValue(obj);

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    //Dummy in this version.
  }

  ngOnInit() {
    this.sourcesGroup = new FormControl('');
    this.sourceSelectorForm = new FormGroup({
      sourcesGroup: this.sourcesGroup,
    });

    this._subscription.add(this.sourceSelectorForm.valueChanges.subscribe(
      {
        next: data => {
          let sourceLayer = this.service.getSource(data.sourcesGroup);
          if(sourceLayer){
            
            let event = {
              map : sourceLayer
            }
            this.propagateChange(event);
            this.propagateTouch(event);
            }
        },
        error: (data) => {
          console.log('ERREUR DETECTEE');
          console.log(data);
        },
        complete: () => {
          //Dummy in this version.
        }
      })
    );
  }
}
