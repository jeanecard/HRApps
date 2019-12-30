import { PartialObserver, NextObserver, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { RegionFilterComponent } from './region-filter.component';
import { LanguageService } from '../../language.service';


export class RegionControlObserver<Region> implements NextObserver<Region>
{
  constructor(private component : RegionFilterComponent, private languageService: LanguageService){

  }
  next(value: Region): void {
    //3.1-
    let extEvt = {
      region: value,
      language: ''
    };
    this.component.propagateChange(extEvt);
    this.component.propagateTouch(extEvt);
    if (value) {
      this.component.isLanguageWorking = true;
      //this.component.languages$ = this.languageService.getLanguagesByContinent(value);
      //3.2-
      this.component.languages$.pipe(take(1)).subscribe(data => {
        this.component.isLanguageWorking = false;
        if (data) {
          this.component.languagesCount = data.length;
        }
        //3.3-
        this.component.languageFilterForm.patchValue({
          languageCtrl: '',
        }, { emitEvent: false });
      });
    }
  }
  closed?: boolean;
  //next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;

}

// export class RegionControlObserver<number> implements PartialObserver<number>{
// }
