import { Region } from 'src/app/model/region'

export class HRCountryFilterModel {
    regionAndLanguage : {
      region: Region,
      language: string
    }
    population : {
      amount: number,
      over: boolean
    }
}
