import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, tap } from 'rxjs';
import { Weather } from 'src/model/mode';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  defaultLat: number;
  defaultLng: number;
  constructor(public appService: AppService) {
    this.defaultLat = 0;
    this.defaultLng = 0;
  }
  title = 'weather-app';
  searchControl = new FormControl()
  weatherData: Weather = {}
  loading = false

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((location) => {
      this.defaultLat = location.coords.latitude;
      this.defaultLng = location.coords.longitude;
      this.appService.getWeatherForecastByGeo(this.defaultLat, this.defaultLng);
    },() => {
      console.log('User did not grant location permission')
      this.appService.getWeatherForecastByCity('Lagos');
    }, { timeout: 10000 })
    
    this.appService.getWeatherData().subscribe(data => this.weatherData = data);
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(value => value && value.length > 3)
      ).subscribe((value) => {
        this.loading = true
        this.appService.getWeatherForecastByCity(value);
    })
  }

  reset() {
    this.searchControl.reset()
  }
}
