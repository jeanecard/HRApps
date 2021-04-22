import { HRSubmitPictureModel } from "./hrsubmit-picture-model";

export  interface HrThumbnailSubscriber {
  onThumbnailCreated(rawJson: string): void;
  onImageCreated(rawJson: string): void;
  onConnectionDone(data : string);
  onInternalImageCreated(data : HRSubmitPictureModel); //!bad temporary cheat ;-)
}
