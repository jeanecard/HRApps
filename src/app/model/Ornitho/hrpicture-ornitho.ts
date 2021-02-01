
export class HRPictureOrnitho {
  id: string;
  vernacularName: string;
  url: string | ArrayBuffer;
  typeAge: string;
  isMale : boolean;
  source : string | null;
  credit : string | null;
}

export class HRPictureOrnithoDialog extends  HRPictureOrnitho {
  isCreationMode: boolean;
}
