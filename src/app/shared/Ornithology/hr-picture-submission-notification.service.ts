import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { HrThumbnailSubscriber } from 'src/app/model/Ornitho/hr-thumbnail-subscriber';
@Injectable({
  providedIn: 'root'
})
export class HrPictureSubmissionNotificationService {
  private _hubConnection: HubConnection = null;
  private _thumbnailSubscribers: HrThumbnailSubscriber[] = [];
  constructor() { }
  public registerToThumbnailEvent(subscriber: HrThumbnailSubscriber): void {
    let found = false;
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
    this._thumbnailSubscribers.forEach(element => {
      if (element != subscriber) {
        newSubscribers.push(element);
      }
    });
    this._thumbnailSubscribers = newSubscribers;
  }

  public connectToImageNotificationIfNeeded(): void {
    if (this._hubConnection === null) {
      this._hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://hrbirdswebapi-dev-as.azurewebsites.net/HRBirdPictureSubmission')
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this._hubConnection.start().catch(err => console.error(err.toString()));

      this._hubConnection.on('Message', (data: any) => {
        this._thumbnailSubscribers.forEach(element => {
          element.onThumbnailCreated(data);
        }
        );
      });
    }
  }
}
