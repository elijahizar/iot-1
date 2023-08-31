export interface MessageData {
  id: string;
  sensor_id: string;
  moisture: string;
  creation_date: string;
  alert: string;
}

export class Message {
  id: string;
  sensor_id: string;
  moisture: string;
  creationDate: string;
  alert: string;

  constructor(data: MessageData) {
    this.id = data.id;
    this.sensor_id = data.sensor_id;
    this.moisture = data.moisture;
    this.creationDate = data.creation_date;
    this.alert = data.alert;
  }
}
