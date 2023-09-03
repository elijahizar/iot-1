import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sensor, SensorData } from 'src/app/models/sensor.model';
import { SensorsService } from 'src/app/services/sensors.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css'],
})
export class SensorComponent implements OnInit {
  sensorForm: FormGroup;
  routeName: string = '';
  sensor: Sensor = { sensorId: '', moistureRateLimit: '' }; // Initialize with default values
  selectedSensorId: string | null = '';
  createOrUpdate: string = 'none';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private sensorsService: SensorsService
  ) {
    this.sensorForm = this.fb.group({
      sensorId: ['', Validators.required],
      moistureRateLimit: ['', Validators.required],
    });

    this.aRouter.snapshot.paramMap.get('id') == 'create'
      ? (this.routeName = 'create')
      : (this.selectedSensorId = this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.selectedSensorId) this.getSensor(this.selectedSensorId);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const sensor: Sensor = {
      sensorId: this.sensorForm.value.sensorId || '0',
      moistureRateLimit: this.sensorForm.value.moistureRateLimit,
    };
    if (this.createOrUpdate === 'create') {
      this.sensorsService.createSensor(sensor).subscribe((response) => {
        this.router.navigate([`/`]);
      });
    } else if (this.createOrUpdate === 'update') {
      // get sensor id from somewhere
      this.sensorsService.updateSensor(sensor).subscribe((response) => {
        this.router.navigate([`/sensor/${this.selectedSensorId}`]);
      });
    }
  }

  createSensor(): void {
    const sensor: Sensor = {
      sensorId: '0',
      moistureRateLimit: this.sensor.moistureRateLimit,
    };
    this.sensorsService.createSensor(sensor).subscribe({
      next: (v) => {
        this.router.navigate(['/']);
      },
    });
  }

  getSensor(id: string): void {
    this.sensorsService.getSensor(id).subscribe((data) => {
      this.sensor = new Sensor(data);
      this.sensorForm.patchValue({
        sensorId: this.sensor.sensorId,
        moistureRateLimit: this.sensor.moistureRateLimit,
      });
    });
  }

  deleteSensor(id: string) {
    this.sensorsService.deleteSensor(id).subscribe((data: string) => {
      this.router.navigate(['/']);
    });
  }
}
