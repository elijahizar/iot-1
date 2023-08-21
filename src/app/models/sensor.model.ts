export interface SensorData {
    sensor_id: string,
    moisture_rate_limit: string
}

export class Sensor {
    sensor_id: string;
    moisture_rate_limit: string;

    constructor(data: SensorData){
        this.sensor_id = data.sensor_id
        this.moisture_rate_limit = data.moisture_rate_limit
    }
}