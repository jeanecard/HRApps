import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { FormControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SourceMapModel } from 'src/app/model/source-map-model';
import { Subscription } from 'rxjs';
import { MapLayerService } from 'src/app/shared/map-layer.service';

@Component({
  selector: 'app-layersSelector',
  templateUrl: './layersSelector.component.html',
  styleUrls: ['./layersSelector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LayersSelectorComponent),
      multi: true
    }
  ]
})
/**
 * ControlValueAccessor for select a single sourceName beyond sources by name.
 * Emitted event : { a-map-name-as-string)
 * SetValue .setValue('a-map-name-as-string');
 * }
*/
export class LayersSelectorComponent implements OnInit, ControlValueAccessor, OnDestroy {
  // A function to call when OnChange propagation is needed. Wiring with Angular Framework notification will be done when implementing ControlValueAccessor methods. 
  private _propagateChange = (_: any) => { };
  // A function to call when OnTouch propagation is needed. Wiring with Angular Framework notification will be done when implementing ControlValueAccessor methods. 
  private _propagateTouch = (_: any) => { };
  // Subscription to clean up suscriber onDestroy.
  private _subscription: Subscription = new Subscription();
  private readonly _ERROR_MESSAGE = 'ERROR IN _sourceSelectorForm.valueChanges';
  public readonly sourcesData: SourceMapModel[] = null;
  public sourceSelectorForm: FormGroup = null;
  public mapName: FormControl = null;
  /**
  * Constructor of SourceselectorComponent
  * @param service : MapLayerService to get SourceMapModels
  * @returns void
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
  /**
   * @description
   * Writes a new value to the element.
   *
   * This method is called by the forms API to write to the view when programmatic
   * changes from model to view are requested.
   *
   * @param  obj is the name of the new map to select. type string.
   * @returns void
   * @usageNotes
   * writeValue('name-of-the-map-to-select');
   * ### Write a value to the element
   */
  writeValue(obj: any): void {
    this.mapName.setValue(obj);
  }
  /**
   * @description
   * Register the function to call when OnChange propagation is needed.
   *
   */
  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }
  /**
 * @description
 * Register the function to call when OnTouch propagation is needed.
 *
 */
  registerOnTouched(fn: any): void {
    this._propagateTouch = fn;
  }
  /**
      * @description
      * Function that is called by the forms API when the control status changes to
      * or from 'DISABLED'. Depending on the status, it enables or disables the
      * appropriate DOM element.
      * @param isDisabled The disabled status to set on the element
      */
  setDisabledState?(isDisabled: boolean): void {
    //Dummy in this version.
  }

  /**
   * @description
   * A lifecycle method called when the directive's inputs are initialized. For internal use only.
   * 1- Create formControls (FormGroup use to catch all events in form and particullary radio changes. 
   *  Cheat way to avoid ngModel or radiocontrolvalueaccessor :https://angular.io/api/forms/RadioControlValueAccessor#radiocontrolvalueaccessor)
   * 2- add Observer on radio changes to propagate changes
   *
   */
  ngOnInit() {
    //1-
    this.mapName = new FormControl('');
    this.sourceSelectorForm = new FormGroup({
      mapName: this.mapName,
    });
    //2-
    this._subscription.add(this.sourceSelectorForm.valueChanges.subscribe(
      {
        next: data => {
            //!TODO est-ce cvraiment a lui de construire cet objet .... j'emet un ecvt quer je ne peux pas relire ...
            //C'est a la carto d'avoir son Layer object ici on s'en fout.
          // let sourceLayer = this.service.getSource(data.sourcesGroup);
          //   let event = {map: sourceLayer};
          //   this._propagateChange(event);
          //   this._propagateTouch(event);
            this._propagateChange(data.mapName);
            this._propagateTouch(data.mapName);
        },
       
        error: (data) => {
          console.log(this._ERROR_MESSAGE);
          console.log(data);
        },
        complete: () => {
          //Dummy in this version.
        }
      })
    );
  }

// private generateEventFromSourceMapModel(model : SourceMapModel) : SourceSelectorEvent{

// }
}
