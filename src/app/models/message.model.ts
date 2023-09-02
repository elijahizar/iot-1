import * as moment from 'moment';

export interface MessageData {
  id: string;
  sensor_id: string;
  moisture: string;
  creation_date: Date;
  alert: string;
}

export class Message {
  id: string;
  sensor_id: string;
  moisture: string;
  creationDate: Date;
  alert: string;

  constructor(data: MessageData) {
    this.id = data.id;
    this.sensor_id = data.sensor_id;
    this.moisture = data.moisture;
    this.creationDate = moment(
      data.creation_date,
      'DD/MM/YYYY HH:mm:ss'
    ).toDate();
    this.alert = data.alert;
  }
}
