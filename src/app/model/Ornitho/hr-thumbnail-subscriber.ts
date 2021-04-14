export  interface HrThumbnailSubscriber {
  onThumbnailCreated(data1: string, data2: string, data3: string): void;
  onImageCreated(data1: string, data2: string, data3: string): void;
  onConnectionDone(data : string);
}
