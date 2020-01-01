import { IRegionAndLanguage } from './iregion-and-language';
import { Region } from 'src/app/model/region';

export class RegionAndLanguage implements IRegionAndLanguage{
  region: Region;  
  language: string;
}
