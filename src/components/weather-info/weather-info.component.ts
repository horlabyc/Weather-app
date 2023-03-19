import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Weather } from 'src/model/mode';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})
export class WeatherInfoComponent {
  @Input() weatherData: Weather = {}
  @Input() loadingData: Observable<Boolean> = of(false)
  @Input() errorMessage: Observable<String | undefined> = of(undefined)
  currentTime = `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`

  get description(): string | undefined {
    return this.weatherData.weather?.length ?  this.weatherData.weather[0].description : ''
  }

  get main(): string | undefined {
    return this.weatherData.weather?.length ?  this.weatherData.weather[0].main : ''
  }

  get sunriseTime(): string | undefined {
    const sunrise = this.weatherData.sys?.sunrise
    if (sunrise) {
      return new Date(sunrise * 1000).toLocaleTimeString();
    }
    return undefined
  }

  get sunsetTime(): string | undefined {
    const sunset = this.weatherData.sys?.sunset
    if (sunset) {
      return new Date(sunset * 1000).toLocaleTimeString();
    }
    return undefined
  }

  get weatherIcon(): string {
    const weatherIconType = this.weatherData.weather?.length ? this.weatherData.weather[0].icon : undefined
    if (weatherIconType) {
      return `http://openweathermap.org/img/wn/${weatherIconType}@2x.png`
    }
    return 'http://openweathermap.org/img/wn/04d@2x.png'
  }
}
