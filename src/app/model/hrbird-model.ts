import { SafeResourceUrl } from '@angular/platform-browser';

export class HRBirdModel {
  public name : string;
  public sumup : string;
  public scientificName : string;
  public mainPicture : string;
  public mainSound :string;
  public mainSoundURL : SafeResourceUrl;
}

export class HRBirdModels
{
  public totalItemsCount : number;
  public pageSize : number;
  public currentPage : number;
  public totalPages : number;
  public hasPreviousPage : boolean;
  public hasNextPage : boolean;
  public pageItems: HRBirdModel[]
}
