export class JsonLogger {
public flattenObject(obj : any) : string{
  if(obj != null && obj != undefined){
    let retour : string;
    for (let propNamei in obj){
      retour = retour + '-' + propNamei + '/' + obj[propNamei];
  }
  }
  return 'null or undefined object';
}

}

