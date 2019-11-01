import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HRCountry } from 'src/app/model/hrcountry';

@Component({
  selector: 'app-flag-detail',
  templateUrl: './flag-detail.component.html',
  styleUrls: ['./flag-detail.component.scss']
})
export class FlagDetailComponent {

  constructor(public dialogRef: MatDialogRef<FlagDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRCountry) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
