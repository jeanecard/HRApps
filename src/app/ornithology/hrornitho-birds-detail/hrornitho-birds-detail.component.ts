import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HRBirdModel } from 'src/app/model/hrbird-model';

@Component({
  selector: 'app-hrornitho-birds-detail',
  templateUrl: './hrornitho-birds-detail.component.html',
  styleUrls: ['./hrornitho-birds-detail.component.scss']
})
export class HROrnithoBirdsDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HROrnithoBirdsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HRBirdModel) { }

  ngOnInit() {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
