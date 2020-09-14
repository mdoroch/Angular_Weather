import { Injectable} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import {error} from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'http://api.openweathermap.org/data/2.5/forecast';
  apiKey = 'cd568793ed4c1a5791ef68c832393f50';

  constructor(private http: HttpClient) { }
  getWeatherDataByCityName(city: string){
    let params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', this.apiKey)
    return this.http.get(this.url, {params});
  }



}

