import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api =environment.apiUrl


  constructor(private http : HttpClient) { }


  getMeasurements(table: any, country: string [], year: number[]): Observable<any>{
    console.log('params', {table: table, country: country, year: year})
    return this.http.post(`${this.api}countries/manyYear`,{tables: table, countryName: country, Year: year})
  }

  getMeasurmentsStartEnd(table: string, country: string [], startYear: number, endYear: number, fields: string[]): Observable<any>{

    return this.http.post(`${this.api}countries/startEnd`,{table: table, countryName: country, startYear: startYear, endYear: endYear, fields: fields})
  }


  getMeasurmentsCountry( country: string,  fields: string[]): Observable<any>{
    return this.http.post(`${this.api}countries`,{countryName: country,  fields: fields})
  }

  getTablesFields(tableName:string):Observable<any>{
    return this.http.post(`${this.api}fields`,{tableName:tableName})
  }

  getCountryNames():Observable<any>{
    return this.http.get(`${this.api}countryNames`)
  }

  // getDatawithInterval(table: string, country: string, startYear: number, endYear: number, fields: string[]): Observable<any>{

    
  //   return this.http.post(`${this.api}countries/${startYear}/${endYear}/${interval}`,{table: table, countryName: country, startYear: startYear, endYear: endYear, fields: fields})
  // } 

 






}
