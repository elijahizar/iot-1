export interface MessageData {
  id: string;
  sensor_id: string;
  moisture: string;
  creation_date: string;
}

export class Message {
  id: string;
  sensor_id: string;
  moisture: string;
  creation_date: string;

  constructor(data: MessageData) {
    this.id = data.id;
    this.sensor_id = data.sensor_id;
    this.moisture = data.moisture;
    this.creation_date = data.creation_date;
  }
}
