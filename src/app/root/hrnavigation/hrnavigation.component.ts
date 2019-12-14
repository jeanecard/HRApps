import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrnavigation',
  templateUrl: './hrnavigation.component.html',
  styleUrls: ['./hrnavigation.component.scss']
})
export class HRNavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }
  btnClick= function (item) {
    this.router.navigateByUrl('/' + item);
};
}
