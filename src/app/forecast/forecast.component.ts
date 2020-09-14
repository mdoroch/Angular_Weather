import { Component, OnInit} from '@angular/core';
import { WeatherService} from '../weather.service';
import {error} from '@angular/compiler/src/util';
import {State} from '../state';
import {map} from 'rxjs/operators';
import {StateSort} from '../stateSort';

@Component({
  selector: 'app-forecast',
    templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  weather;
  error: any;
  constructor(private weatherService: WeatherService) {
  }
  state:State[] = [];
  ngOnInit(): void {

  }
  getCity(city){
    this.state.splice(0, this.state.length);

    this.weatherService.getWeatherDataByCityName(city).subscribe(data=>
      {
        this.weather = data;
        for(let i=0; i<this.weather.list.length; i= i+8) {
          let forecastWeather = new State(
            this.weather.list[i].main.temp
          );

          this.state.push(forecastWeather);
        }
        console.log(this.state);
        return this.state;

      },

      error => {this.error = error.message;
        console.log('error');}

    )

  }
  getCitySort(city){
    this.state.splice(0, this.state.length);
    this.weatherService.getWeatherDataByCityName(city).subscribe(data=>
      {
        this.weather = data;
        for(let i=this.weather.list.length; i>=0; i=i-8) {
          for(let j = 8; j<=i; j=j+8) {
            if (this.weather.list[j-8].main.temp > this.weather.list[j]) {
              let delta = this.weather.list[j-8].main;
              this.weather.list[j-8].main = this.weather.list[j].main;
              this.weather.list[j].main = delta;

            }
          }
        }
        for(let i=0;i<this.weather.list.length;i=i+8) {
          let forecastWeather2 = new StateSort(
            this.weather.list[i].main.temp);
          this.state.push(forecastWeather2);
        }

        console.log(this.state);
        return this.state;

      },

      error => {this.error = error.message;
        console.log('error');}

    )
  }

}
