import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Message, MessageData } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private apiUrl: string =
    'https://gm21kwpk1b.execute-api.eu-west-3.amazonaws.com/prod/message';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMessages(sensorId: string): Observable<{
    messages: Message[];
  }> {
    let params = new HttpParams().set('id', sensorId.toString());
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response) => {
        let messages = response.Items.map((messages: MessageData) => {
          return new Message(messages);
        });
        return {
          messages: messages,
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
        return sensor;
      })
    );
  }
}
