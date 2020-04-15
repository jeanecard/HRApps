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
  fclName: string | null;
  adminCodes1: AdminCodes1 | null;
  countryName: string | null;
  fcodeName: string | null;
  adminName1: string | null;
  lat: string | null;
  fcode: string |null;
}

export interface GeonameOutput {
  totalResultsCount: number;
  geonames: Geoname[];
}

