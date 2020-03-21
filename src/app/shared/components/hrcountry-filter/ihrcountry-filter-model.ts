import { IRegionAndLanguage } from './iregion-and-language';
import { IPopulation } from './ipopulation';
import { SourceMapModel } from 'src/app/model/source-map-model';

export interface IHRCountryFilterModel {
  regionAndLanguage : IRegionAndLanguage;
  population : IPopulation;
  map : SourceMapModel;
}
