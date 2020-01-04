import { JsonLogger, JsonLoggerConstants } from './json-logger';

describe('JsonLogger', () => {
  it('should create an instance', () => {
    expect(new JsonLogger()).toBeTruthy();
  });

  it('should flatten null or undefined with a error message', () => {
    let flatter = new JsonLogger();
    let result = flatter.flattenObject(null);
    expect(result).toEqual(JsonLoggerConstants.nullObjectCanNotBeProcessed);
    result = flatter.flattenObject(undefined);
    expect(result).toEqual(JsonLoggerConstants.nullObjectCanNotBeProcessed);
  });

  it('should flatten {amount:42, over:true} as - amount / 42 - over / true', () => {
    let flatter = new JsonLogger();
    let result = flatter.flattenObject({amount:42, over:true});
    let expectedResult = JsonLoggerConstants.propertySeparator + 'amount' + JsonLoggerConstants.valueSeparator + '42' 
    + JsonLoggerConstants.propertySeparator + 'over' + JsonLoggerConstants.valueSeparator + 'true';
    expect(result).toEqual(expectedResult);
  });

});
