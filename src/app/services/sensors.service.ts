import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Sensor, SensorData } from '../models/sensor.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({ providedIn: 'root' })
export class SensorsService {
  private apiUrl: string = environment.apiBaseUrl as string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      /* this.log(`${operation} failed: ${error.message}`); */

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSensors(): Observable<{
    sensors: Sensor[];
  }> {
    let params = new HttpParams();

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response) => {
        let sensors = response.Items.map((sensors: SensorData) => {
          return new Sensor(sensors);
        });
        return {
          sensors: sensors,
        };
      })
    );
  }

  getSensor(id: string): Observable<any> {
    // Create HttpParams with the 'id' query parameter
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response) => {
        const sensor = response.Item;
        return sensor;
      })
    );
  }

  /** POST a new sensor to the backend */
  createSensor(sensor: Sensor): Observable<Sensor> {
    const url = `${this.apiUrl}/create`;
    const data: SensorData = {
      moisture_rate_limit: sensor.moistureRateLimit,
      sensor_id: sensor.sensorId,
    };
    return this.http
      .post<Sensor>(url, data, this.httpOptions)
      .pipe(tap(() => console.log('Created new sensor')));
  }

  /** PUT an updated sensor to the backend */
  updateSensor(sensor: Sensor): Observable<any> {
    const url = `${this.apiUrl}/edit`;
    const data = {
      moisture_rate_limit: sensor.moistureRateLimit,
      sensor_id: sensor.sensorId,
    };
    return this.http.post(url, data, this.httpOptions).pipe(
      tap(() => console.log('Updated sensor')),
      catchError(this.handleError<any>('updateSensor'))
    );
  }

  /** DELETE a sensor from the backend */
  deleteSensor(sensorId: string): Observable<any> {
    const url = `${this.apiUrl}/delete`;
    const data = {
      sensor_id: sensorId,
    };
    return this.http.post(url, data, this.httpOptions).pipe(
      tap(() => console.log('Deleted sensor')),
      catchError(this.handleError<Sensor>('deleteSensor'))
    );
  }
}
