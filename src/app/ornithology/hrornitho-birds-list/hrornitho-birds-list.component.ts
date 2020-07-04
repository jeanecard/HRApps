import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { HROrnithoBirdsService } from 'src/app/shared/hrornitho-birds.service';
import { Subscription } from 'rxjs';
import { HRBirdModel } from 'src/app/model/hrbird-model';
import { DomSanitizer } from '@angular/platform-browser';
import { HRCDNPicturesService } from 'src/app/shared/hrcdnpictures.service';
import { MatDialog } from '@angular/material';
import { HROrnithoBirdsDetailComponent } from '../hrornitho-birds-detail/hrornitho-birds-detail.component';

@Component({
  selector: 'app-hrornitho-birds-list',
  templateUrl: './hrornitho-birds-list.component.html',
  styleUrls: ['./hrornitho-birds-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HROrnithoBirdsListComponent),
      multi: true
    }]
})
export class HROrnithoBirdsListComponent implements OnInit, ControlValueAccessor {

  private serviceSubscription : Subscription = null;
  public isDatabaseWorking = false;
  public hrBirdsInfoDisplayed : HRBirdModel[];
  public isMoreBirds = true;
  public noResult:String;



  constructor( 
    private service : HROrnithoBirdsService, 
    private sanitizer:DomSanitizer,
    private picService : HRCDNPicturesService,
    public dialog: MatDialog) { 
    this.hrBirdsInfoDisplayed = [];
    this.noResult = picService.getPicture(HRCDNPicturesService.NO_RESULT_ID);
  }
  writeValue(obj: any): void {

    // TODO
  }
  registerOnChange(fn: any): void {
    // TODO
  }
  registerOnTouched(fn: any): void {
    // TODO
  }
  setDisabledState?(isDisabled: boolean): void {
    // TODO
  }

  ngOnInit() {
    this.isDatabaseWorking = true;
    this.serviceSubscription = this.service.getBirds().subscribe(data =>{
      this.isDatabaseWorking = false;
      this.hrBirdsInfoDisplayed = data.pageItems;
      this.hrBirdsInfoDisplayed.forEach(element => {
         element.mainSoundURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.xeno-canto.org/' + element.mainSound + '/download');
        // element.mainSoundURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.xeno-canto.org/' + element.mainSound + '/embed?simple=1');
      });
    });

  }
  public openDialog(bird : HRBirdModel) : void{
    const dialogRef = this.dialog.open(HROrnithoBirdsDetailComponent, {
      width: '1000px',
      data: bird
    });
  }
  public onDisplayMore() : void{
    
  }

}
