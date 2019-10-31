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

  regions: Region[];
  selectedRegion: Region;

  constructor(private regionService: RegionService) { }

  ngOnInit() {
    this.regionService.getRegions().subscribe((data: Region[]) => {
      this.regions = new Array<Region>();
      data.forEach(element => {
        this.regions.push(element);
      });
    }
    );
    this.selectedRegion = Region.All;
  }

  onSelection(regionEvent) {
    const region = regionEvent.value;
    console.log('region is : ' + region);
    this.regionSelected.emit(region);
    this.selectedRegion = region;
  }
}
