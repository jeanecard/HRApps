
export class HRPictureOrnitho {
  id: string | null;
  vernacularName: string;
  url: any; //Uint32Array;// string | ArrayBuffer;
  typeAge: string;
  isMale : boolean;
  source : string | null;
  credit : string | null;
  imageData : File;
  comment : string | null;
}

export class FileToUpload {
  fileName: string = "";
  fileSize: number = 0;
  fileType: string = "";
  lastModifiedTime: number = 0;
  lastModifiedDate: Date = null;
  fileAsBase64: string = "";
}