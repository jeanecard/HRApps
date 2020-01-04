export class JsonLoggerConstants {
  static readonly nullObjectCanNotBeProcessed = 'null or undefined object';
  static readonly propertySeparator = ' - ';
  static readonly valueSeparator = ' / ';
}

export class JsonLogger {
  public flattenObject(obj: any): string {
    if (obj != null && obj != undefined) {
      let retour = '';
      for (let propNamei in obj) {
        retour = retour + JsonLoggerConstants.propertySeparator + propNamei + JsonLoggerConstants.valueSeparator + obj[propNamei];
      }
      return retour;
    }
    return JsonLoggerConstants.nullObjectCanNotBeProcessed;
  }
}



