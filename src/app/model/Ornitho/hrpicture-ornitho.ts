
export class HRPictureOrnithoAddInput {
  id: string | null;
  vernacularName: string;
  ageType: string | null;
  genderType : string | null;
  sourceType : string | null;
  credit : string | null;
  comment : string | null;
  thumbnailUrl : string | null;
  fullImageUrl : string | null;
}

export class HRPictureOrnithoUpdateInput {
  id: string | null;
  vernacularName: string;
  ageType: string | null;
  genderType : string | null;
  sourceType : string | null;
  credit : string | null;
  comment : string | null;
  thumbnailUrl : string | null;
  fullImageUrl : string | null;
}
export class HRPictureOrnithoListItem {
  id: string | null;
  thumbnailUrl : string | null;
  vernacularName: string;
  age: string;
  ageType: string;
  gender : string;
  genderType : string;
  source : string ;
  sourceType : string ;
  credit : string ;
  comment : string;
  fullImageUrl : string | null;
  isNew : boolean
}

export class FileToUpload {
  fileName: string = "";
  fileSize: number = 0;
  fileType: string = "";
  lastModifiedTime: number = 0;
  lastModifiedDate: Date = null;
  fileAsBase64: string = "";
  part: number = 0;
  partCount: number = 0;
  submittedPicture : HRPictureOrnithoAddInput = null;
}