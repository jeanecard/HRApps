import { Region } from 'src/app/model/region'
import { IHRCountryFilterModel } from './ihrcountry-filter-model';
import { IRegionAndLanguage } from './iregion-and-language';
import { IPopulation } from './ipopulation';
import { SourceMapModel } from 'src/app/model/source-map-model';

export class HRCountryFilterModel implements IHRCountryFilterModel{
  regionAndLanguage: IRegionAndLanguage;  
  population: IPopulation;
  map : SourceMapModel;

}
