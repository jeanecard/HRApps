import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HrGeneralOrnitho } from 'src/app/model/Ornitho/hr-general-ornitho';

@Component({
  selector: 'app-hrgeneral',
  templateUrl: './hrgeneral.component.html',
  styleUrls: ['./hrgeneral.component.scss']
})
export class HrgeneralComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public internalModel : HrGeneralOrnitho;
  
  public ornithoGeneral: FormGroup;
  public vernacularName : FormControl;
  public language : FormControl;
  public name : FormControl;
  public maxEnvergure : FormControl;
  public minEnvergure : FormControl;
  public minEggs : FormControl;
  public maxEggs : FormControl;
  public minWeight: FormControl;
  public maxWeight: FormControl;
  public minLayCount: FormControl;
  public maxLayCount: FormControl;
  public minLength: FormControl;
  public maxLength: FormControl;
  public source: FormControl;
  public statut: FormControl;
  public selected : string;

  constructor() { }
  
    // OnInit ---------------------------------------------
    ngOnInit(): void {
      this.internalModel = new HrGeneralOrnitho();
      //1- Load from local storage
      this.loadFromLocalStorage();
      this.vernacularName = new FormControl();
      this.language = new FormControl();
      this.name = new FormControl();
      this.maxEnvergure = new FormControl(this.internalModel?.envergureMaxInCm);
      this.minEnvergure = new FormControl(this.internalModel?.envergureMinInCm);
      this.minEggs = new FormControl(this.internalModel?.oeufParPonteMin);
      this.maxEggs = new FormControl(this.internalModel?.oeufParPonteMax);
      this.minWeight = new FormControl(this.internalModel?.poidsMinGr);
      this.maxWeight = new FormControl(this.internalModel?.poidsMaxGr);
      this.minLayCount = new FormControl(this.internalModel?.nombrePonteMin);
      this.maxLayCount = new FormControl(this.internalModel?.nombrePonteMax);
      this.minLength = new FormControl(this.internalModel?.longueurMinInCm);
      this.maxLength = new FormControl(this.internalModel?.longueurMaxInCm);
      this.source = new FormControl(this.internalModel?.source);
      this.statut = new FormControl(this.internalModel?.statut);

      

      this.ornithoGeneral = new FormGroup({
        vernacularName: this.vernacularName,
        language: this.language,
        name : this.name,
        maxEnvergure : this.maxEnvergure,
        minEnvergure : this.minEnvergure,
        minEggs : this.minEggs,
        maxEggs : this.maxEggs,
        minWeight : this.minWeight,
        maxWeight : this.maxWeight,
        minLayCount : this.minLayCount,
        maxLayCount : this.minLayCount,
        minLength : this.minLength,
        maxLength : this.maxLength,
        source : this.source,
        statut : this.statut
      });      
    }
  loadFromLocalStorage() {
    this.internalModel.vernacularName = "saucisse";
  }
  
  // CVA -----------------------------------------------
  writeValue(obj: any): void {
   //  throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  // OnDestroy ---------------------------------------------
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}
