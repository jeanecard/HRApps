import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { HrThumbnailSubscriber } from 'src/app/model/Ornitho/hr-thumbnail-subscriber';
import { HRPictureOrnithoAddOrUpdateInput } from 'src/app/model/Ornitho/hrpicture-ornitho';
@Injectable({
  providedIn: 'root'
})
export class HrPictureSubmissionNotificationService {
  private _hubConnection: HubConnection = null;
  private _thumbnailSubscribers: HrThumbnailSubscriber[] = [];
  constructor() { }
  public registerToThumbnailEvent(subscriber: HrThumbnailSubscriber): void {
    let found = false;
    if(this._thumbnailSubscribers){
      this._thumbnailSubscribers.forEach(element => {
        if (element == subscriber) {
          found = true;
        }
      });
    } else{
      console.log("this._thumbnailSubscriber is null");
    }

    if (!found) {
      this._thumbnailSubscribers.push(subscriber);
      this.connectToImageNotificationIfNeeded();
    }
  }

  public unRegisterFromThumbnailEvent(subscriber: any): void {
    let newSubscribers: HrThumbnailSubscriber[];
    this._thumbnailSubscribers.forEach(element => {
      if (element != subscriber) {
        newSubscribers.push(element);
      }
    });
    this._thumbnailSubscribers = newSubscribers;
  }

 public internalImageAddedNotification(data : HRPictureOrnithoAddOrUpdateInput){
  this._thumbnailSubscribers.forEach(element => {
    element.onInternalImageCreated(data);
  });
 }

  public connectToImageNotificationIfNeeded(): void {
    if (this._hubConnection === null) {
      this._hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://hrbirdssignalrwebapi.azurewebsites.net/HRBirdPictureSubmission')
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this._hubConnection.start().catch(err => console.error(err.toString()));

      this._hubConnection.on('ThumbnailUpdated', (data1: any,data2: any,data3: any) => {
        this._thumbnailSubscribers.forEach(element => {
          element.onThumbnailCreated(data1, data2, data3);
        }
        );
      });

      this._hubConnection.on('ImageCreated', (data1: any,data2: any,data3: any) => {
        this._thumbnailSubscribers.forEach(element => {
          element.onImageCreated(data1,data2,data3);
        }
        );
      });


      this._hubConnection.on('ConnectionDone', (data: any) => {
        this._thumbnailSubscribers.forEach(element => {
          element.onConnectionDone(data);
        }
        );
      });
    }
  }
}
