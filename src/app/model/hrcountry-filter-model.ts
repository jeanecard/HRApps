import { Language } from './language';
import { Region } from './region';
import { PopulationFilterModel } from './population-filter-model';

export class HRCountryFilterModel {
  private _language: Language = null;
  private _region: Region;
  private _population: PopulationFilterModel = null;


  get language(): Language {
    return this._language;
  }
  set language(value: Language) {
    this._language = value;
  }
  get region(): Region {
    return this._region;
  }
  set region(value: Region) {
    this._region = value;
  }
  get population(): PopulationFilterModel {
    return this._population;
  }
  set population(value: PopulationFilterModel) {
    this._population = value;
  }
}
