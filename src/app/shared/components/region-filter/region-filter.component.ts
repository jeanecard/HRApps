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
  }

  ngOnInit() {
    this.isWorking = true;
    this.regions$ = this.regionService.getRegions();
    this.regions$.subscribe(data => {
      this.isWorking = false;
    }
    );    
  }

  onSelection(regionEvent) {
    const region = regionEvent.value;
    this.selectedRegion = region;
    this.regionSelected.emit(region);
  }
}
