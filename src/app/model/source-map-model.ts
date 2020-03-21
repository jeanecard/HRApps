import { HrMapTheme } from './hr-map-theme';
import Layer from 'ol/layer/Layer';

export class SourceMapModel {
  public name : string;
  public layer : Layer;
  public theme : HrMapTheme;
}
