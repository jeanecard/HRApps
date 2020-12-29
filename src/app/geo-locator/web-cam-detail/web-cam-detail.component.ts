import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebCamItemModel } from 'src/app/model/web-cam-model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-web-cam-detail',
  templateUrl: './web-cam-detail.component.html',
  styleUrls: ['./web-cam-detail.component.scss']
})
export class WebCamDetailComponent implements OnInit {
  url: string = "https://www.mmlpqtpkasjdashdjahd.com";
  public dayUrlSafe: SafeResourceUrl;
  public lifeTimeUrlSafe: SafeResourceUrl;


  constructor(public dialogRef: MatDialogRef<WebCamDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WebCamItemModel, private sanitizer:DomSanitizer) { 
      this.dayUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(data.player.day.embed);
      this.lifeTimeUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(data.player.lifetime.embed);
    }

  ngOnInit() {
  }

}
