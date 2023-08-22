import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sensor, SensorData } from 'src/app/models/sensor.model';
import { SensorsService } from 'src/app/services/sensors.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
})
export class SensorComponent {
  routeName: string = '';
  sensor: Sensor = { sensor_id: '', moisture_rate_limit: '' }; // Initialize with default values

  constructor(
    private aRouter: ActivatedRoute,
    private sensorsService: SensorsService
  ) {}

  ngOnInit(): void {
    const selectedSensorId = Number(this.aRouter.snapshot.paramMap.get('id'));
    this.aRouter.url.subscribe((url) => {
      this.routeName = url[0].path;
    });

    this.getSensor(selectedSensorId);
  }

  getSensor(id: number): void {
    this.sensorsService.getSensor(id).subscribe((data) => {
      console.log('data', data);
      this.sensor = new Sensor(data);
    });
  }
}
