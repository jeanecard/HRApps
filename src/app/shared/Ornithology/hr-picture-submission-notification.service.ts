import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { HrThumbnailSubscriber } from 'src/app/model/Ornitho/hr-thumbnail-subscriber';
import { HRSubmitPictureModel } from 'src/app/model/Ornitho/hrsubmit-picture-model';
@Injectable({
  providedIn: 'root'
})
export class HrPictureSubmissionNotificationService {
  private _hubConnection: HubConnection = null;
  private _thumbnailSubscribers: HrThumbnailSubscriber[] = [];
  constructor() { }
  
  public registerToThumbnailEvent(subscriber: HrThumbnailSubscriber): void {
    let found = false;
    if(!this._thumbnailSubscribers){
      this._thumbnailSubscribers = [];
    }
    this._thumbnailSubscribers.forEach(element => {
        if (element == subscriber) {
          found = true;
        }
      });
    if (!found) {
      this._thumbnailSubscribers.push(subscriber);
      this.connectToImageNotificationIfNeeded();
    }
  }

  public unRegisterFromThumbnailEvent(subscriber: any): void {
    let newSubscribers: HrThumbnailSubscriber[];
    if(this._thumbnailSubscribers){
      this._thumbnailSubscribers.forEach(element => {
        if (element != subscriber) {
          newSubscribers.push(element);
        }
      });
    }
    this._thumbnailSubscribers = newSubscribers;
  }

 public internalImageAddedNotification(data : HRSubmitPictureModel){
   if(this._thumbnailSubscribers){
    this._thumbnailSubscribers.forEach(element => {
      element.onInternalImageCreated(data);
    });
   }
 }

  public connectToImageNotificationIfNeeded(): void {
    if (this._hubConnection === null) {
      this._hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://hrbirdssignalrwebapi.azurewebsites.net/HRBirdPictureSubmission')
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this._hubConnection.start().catch(err => console.error(err.toString()));

      this._hubConnection.on('ThumbnailUpdated', (data1: any) => {
        if(this._thumbnailSubscribers){
          this._thumbnailSubscribers.forEach(element => {
            element.onThumbnailCreated(data1);
          }
          );
        } else{
          console.log("--------- aucun _thumbnailSubscribers sur recepetion de ThumbnailUpdated ------------");
        }
      });

      this._hubConnection.on('ImageCreated', (data1: any) => {
        if(this._thumbnailSubscribers){
          this._thumbnailSubscribers.forEach(element => {
            element.onImageCreated(data1);
          }
          );
        }else{
          console.log("--------- aucun _thumbnailSubscribers sur recepetion de ImageCreated ------------");
        }
      });


      this._hubConnection.on('ConnectionDone', (data: any) => {
        if(this._thumbnailSubscribers){
          this._thumbnailSubscribers.forEach(element => {
            element.onConnectionDone(data);
          }
          );
        }else{
          console.log("--------- aucun _thumbnailSubscribers sur recepetion de ConnectionDone ------------");
        }
      });
    }
  }
}
