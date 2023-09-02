import * as moment from 'moment';

export interface SensorData {
  sensor_id: string;
  moisture_rate_limit: string;
  lastMessage?: {
    moisture: number;
    alert: boolean;
    creation_date: string;
  } | null;
}

export class Sensor {
  sensorId: string;
  moistureRateLimit: string;
  lastMessage?: {
    moisture: number;
    alert: boolean;
    creationDate: Date;
  } | null;

  constructor(data: SensorData) {
    this.sensorId = data.sensor_id;
    this.moistureRateLimit = data.moisture_rate_limit;
    this.lastMessage = data.lastMessage
      ? {
          ...data.lastMessage,
          creationDate: moment(
            data.lastMessage.creation_date,
            'DD/MM/YYYY HH:mm:ss'
          ).toDate(),
        }
      : null; // Initialize lastMessage as null if it's not provided
  }
}
