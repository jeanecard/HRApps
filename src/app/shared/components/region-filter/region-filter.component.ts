import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Region } from 'src/app/model/region';
import { Observable, from } from 'rxjs';
import { RegionService } from 'src/app/shared/region.service';

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss']
})
export class RegionFilterComponent implements OnInit {
  @Output() regionSelected = new EventEmitter<Region>();

  regions$: Observable<Region[]>;
  selectedRegion: Region;
  isWorking: boolean;

  constructor(private regionService: RegionService) {
    //!TODO Revoir on fait appel a 2 fois le service ...
    this.isWorking = true;
    this.regions$ = regionService.getRegions();
    
    this.regions$.subscribe(data => {
      this.isWorking = false;

    }
    );
  }

  ngOnInit() {
  }

  onSelection(regionEvent) {
    console.log("Changement de Region");
    const region = regionEvent.value;
    this.regionSelected.emit(region);
    this.selectedRegion = region;
  }
}
