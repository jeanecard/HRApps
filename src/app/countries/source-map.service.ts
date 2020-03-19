import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SourceMapModel } from '../model/source-map-model';

@Injectable({
  providedIn: 'root'
})
export class SourceMapService {

  constructor() { }

  getSources() : SourceMapModel[] {
    return [
      {name : 'Topography', url : 'https://api.maptiler.com/maps/topographique/{z}/{x}/{y}.png?key=0U9Dg5h9puL9z2B1TmCu', maxZoom : 24}, 
      {name : 'Satellite', url : '', maxZoom : 24}, 
      {name : 'IGN', url : '', maxZoom : 24}
    ] 
  };
}
