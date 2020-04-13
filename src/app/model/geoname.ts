export interface AdminCodes1 {
  ISO3166_2: string;
}

export interface Geoname {
  adminCode1: string;
  lng: string;
  geonameId: number;
  toponymName: string;
  countryId: string;
  fcl: string;
  population: number;
  countryCode: string;
  name: string;
  fclName: string;
  adminCodes1: AdminCodes1;
  countryName: string;
  fcodeName: string;
  adminName1: string;
  lat: string;
  fcode: string;
}

export interface GeonameOutput {
  totalResultsCount: number;
  geonames: Geoname[];
}

