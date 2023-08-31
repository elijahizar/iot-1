export interface SensorData {
  sensor_id: string;
  moisture_rate_limit: string;
}

export class Sensor {
  sensorId: string;
  moistureRateLimit: string;

  constructor(data: SensorData) {
    this.sensorId = data.sensor_id;
    this.moistureRateLimit = data.moisture_rate_limit;
  }
}
