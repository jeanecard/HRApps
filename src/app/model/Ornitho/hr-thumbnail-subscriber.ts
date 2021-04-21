import { HRPictureOrnithoAddOrUpdateInput } from "./hrpicture-ornitho";

export  interface HrThumbnailSubscriber {
  onThumbnailCreated(data1: string, data2: string, data3: string): void;
  onImageCreated(data1: string, data2: string, data3: string): void;
  onConnectionDone(data : string);
  onInternalImageCreated(data : HRPictureOrnithoAddOrUpdateInput); //!bad temporary cheat ;-)
}
