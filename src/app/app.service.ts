import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Weather } from 'src/model/mode';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private weatherData = new BehaviorSubject<Weather>({})
  private weatherData$ = this.weatherData.asObservable();

  private loadinData = new BehaviorSubject<Boolean>(false)
  private loadinData$ = this.loadinData.asObservable();

  private errorMessage = new BehaviorSubject<String | undefined>(undefined)
  private errorMessage$ = this.errorMessage.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getWeatherForecastByCity(location: string): void{
    this.loadinData.next(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a48ee17624eea0a508a6f91b9a17268c`
    this.httpClient.get(url).subscribe({
      next: (data) => {
        this.weatherData.next(data)
        this.loadinData.next(false)
        this.errorMessage.next(undefined)
      },
      error: (error: any) => {
        this.errorMessage.next(error.error.message)
        this.loadinData.next(false)
      }
    })
  }

  getWeatherForecastByGeo(lat: number, lng: number): void{
    this.loadinData.next(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=a48ee17624eea0a508a6f91b9a17268c`
    this.httpClient.get(url).subscribe({
      next: (data) => {
        this.weatherData.next(data)
        this.loadinData.next(false)
        this.errorMessage.next(undefined)
      },
      error: (error: any) => {
        this.errorMessage.next(error.error.message)
        this.loadinData.next(false)
      }
    })
  }

  getWeatherData(): Observable<Weather> {
    return this.weatherData$
  }

  getLoadingData(): Observable<Boolean> {
    return this.loadinData$
  }

  getErrorData(): Observable<String | undefined> {
    return this.errorMessage$
  }
}
