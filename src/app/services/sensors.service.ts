import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Sensor, SensorData } from '../models/sensor.model';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SensorsService {
  private apiUrl: string =
    'https://gm21kwpk1b.execute-api.eu-west-3.amazonaws.com/prod/sensor';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getSensors(): Observable<{
    sensors: Sensor[];
  }> {
    let params = new HttpParams();

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response) => {
        let sensors = response.body.Items.map((sensors: SensorData) => {
          return new Sensor(sensors);
        });
        console.log(sensors);
        return {
          sensors: sensors,
        };
      })
    );
  }

  getSensor(id: number): Observable<any> {
    // Create HttpParams with the 'id' query parameter
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response) => {
        const sensor = response.body.Items[0];
        console.log('getSensor', sensor);
        return sensor;
      })
    );
  }
}
