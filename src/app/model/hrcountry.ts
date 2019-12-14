import { Currency } from "./currency";
import { Language } from './language';

export class HRCountry {
    public name: string;
    public alpha2Code: string;
    public alpha3Code: string;
    public capital: string;
    public population: number;
    public nativeName: string;
    public flag: string;
    public translations: Translations;
    public area: number;
    public currencies: Currency[];
    public languages: Language[];
}

export class Translations {
    public de: string;
    public es: string;
    public fr: string;
    public ja: string;
    public it: number;
    public br: string;
    public pt: string;
    public nl: string;
    public hr: string;
}
