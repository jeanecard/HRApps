import { TestBed } from '@angular/core/testing';
import { HRPopulationValuesService } from './hrpopulation-values.service';


describe('HRPopulationValuesService', () => {
  
  let service: HRPopulationValuesService;
  let store = {};
  let throwException = false;
  let mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      if(throwException){
        throw Error('Dummy.');

      }
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }

  };
  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [
        HRPopulationValuesService,
      ]
    });

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
     .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
    service = TestBed.get(HRPopulationValuesService);
    localStorage.clear();
    throwException = false;
  }
  );


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return {amount : 42, over : true} if localStorage if set to {amount : 42, over : true}', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('over','true');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(true);
  });

  it('should return {amount : 42, over : true} if SetDefaultPopulationFilterValue if set to {amount : 42, over : true}', () => {
    service.SetDefaultPopulationFilterValue({amount: 42, over: true});
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(true);
  });


  it('should return {amount : 42, over : false} if localStorage if set to {amount : 42, over : false}', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('over','false');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });

  it('should return {amount : 42, over : false} if SetDefaultPopulationFilterValue if set to {amount : 42, over : false}', () => {
    service.SetDefaultPopulationFilterValue({amount: 42, over: false});
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });


  it('should return getNullValue if localStorage if set to {amountX : 42, over : true}', () => {
    localStorage.setItem('amountX','42');
    localStorage.setItem('over','true');
    let result = service.getDefaultPopulationFilterValue();
    let nullResult = service.getNullValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });


  it('should return getNullValue if localStorage if set to {amount : 42, overX : true}', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('overX','true');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });


  it('should return getNullValue if localStorage is {amount: notAnumber, over : true}', () => {
    localStorage.setItem('amount','notANumberSorry');
    localStorage.setItem('over','true');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });

  it('should return getNullValue if SetDefaultPopulationFilterValue is {amount: notAnumber, over : true}', () => {
    service.SetDefaultPopulationFilterValue({amount : NaN, over: true});
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });


  it('should return {amount: 42, over : false} if localStorage is {amount: 42, over : notABoolean}', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('over','notABooleanSorry');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });


  it('should return {amount: 42, over : false} if localStorage is {amount: 42, over : 0}', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('over','false');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });

  it('should return {amount: 42, over : false} if localStorage is {amount: 42, over : null}', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('over','null');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });


  it('should return {amount: 42, over : false} if SetDefaultPopulationFilterValue is {amount: 42, over : null}', () => {
    service.SetDefaultPopulationFilterValue({amount: 42, over: null});
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });


  it('should return getNullValue if localStorage is {amount: 42, over : }', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('over','');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });

  it('should return {amount: 42, over : false} if localStorage is {amount: 42, over : undefined}', () => {
    localStorage.setItem('amount','42');
    localStorage.setItem('over','undefined');
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });

  it('should return {amount: 42, over : false} if SetDefaultPopulationFilterValue is {amount: 42, over : undefined}', () => {
    service.SetDefaultPopulationFilterValue({amount:42, over:undefined});
    let result = service.getDefaultPopulationFilterValue();
    expect(result).toBeTruthy();
    expect(result.amount).toEqual(42);
    expect(result.over).toEqual(false);
  });



  it('should return getNullValue if localStorage is {amount: undefined, over : true}', () => {
    localStorage.setItem('amount','undefined');
    localStorage.setItem('over','true');
    let result = service.getDefaultPopulationFilterValue();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });

  it('should return getNullValue if SetDefaultPopulationFilterValue is {amount: undefined, over : true}', () => {
    service.SetDefaultPopulationFilterValue({amount: undefined, over:true});
    let result = service.getDefaultPopulationFilterValue();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });


  it('should return getNullValue if localStorage is {amount: , over : true}', () => {
    localStorage.setItem('amount','');
    localStorage.setItem('over','true');
    let result = service.getDefaultPopulationFilterValue();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });

  it('should return getNullValue if SetDefaultPopulationFilterValue is {amount: , over : true}', () => {
    service.SetDefaultPopulationFilterValue({amount:null, over: false});
    let result = service.getDefaultPopulationFilterValue();
    let nullResult = service.getNullValue();
    expect(result.amount).toEqual(nullResult.amount);
    expect(result.over).toEqual(nullResult.over);
  });

  it('should return initialValue if SetDefaultPopulationFilterValue throw error', () => {
    
    service.SetDefaultPopulationFilterValue({amount:9999, over: true});
    try{
      throwException = true;
      service.SetDefaultPopulationFilterValue({amount:42, over: false});
     
    }
    catch{
      //Dummy for test purpose.
      throwException = false;
    }
    let result = service.getDefaultPopulationFilterValue();
    expect(result.amount).toEqual(9999);
    expect(result.over).toEqual(true);
  });
});
