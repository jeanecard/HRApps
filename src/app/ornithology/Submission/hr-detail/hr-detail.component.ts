import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HrGeneralOrnitho } from 'src/app/model/Ornitho/hr-general-ornitho';

@Component({
  selector: 'app-hr-detail',
  templateUrl: './hr-detail.component.html',
  styleUrls: ['./hr-detail.component.scss']
})
export class HrDetailComponent implements OnInit {
  
  public internalModel : HrGeneralOrnitho;
  public ornithoDetail: FormGroup;
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

  constructor() { }

  ngOnInit(): void {
    this.internalModel = new HrGeneralOrnitho();
    //1- Load from local storage
    this.loadFromLocalStorage();
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

    

    this.ornithoDetail = new FormGroup({
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
    this.internalModel.envergureMaxInCm = 50;
    this.internalModel.envergureMinInCm = 35;
    this.internalModel.oeufParPonteMax = 5;
    this.internalModel.oeufParPonteMin = 2;
    this.internalModel.poidsMinGr = 25;
    this.internalModel.poidsMaxGr = 1500;
    this.internalModel.oeufParPonteMin = 0;
    this.internalModel.oeufParPonteMax = 3;
    this.internalModel.longueurMinInCm = 25;
    this.internalModel.longueurMaxInCm = 75;
    this.internalModel.source = "HR Corp";
    this.internalModel.statut = "protected";

  }

}
