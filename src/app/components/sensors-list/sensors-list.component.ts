import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SensorsService } from 'src/app/services/sensors.service';
import { Sensor } from 'src/app/models/sensor.model';

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
})
export class SensorsListComponent implements OnInit {
  sensors: Sensor[] = [];

  displayedColumns: string[] = ['id', 'moisture'];
  dataSource = new MatTableDataSource();

  constructor(private sensorService: SensorsService) {}

  ngOnInit(): void {
    this.getSensors();
  }

  getSensors(): void {
    this.sensorService.getSensors().subscribe((data) => {
      this.sensors = data.sensors;
      // Update the dataSource with the new sensor data
      this.dataSource.data = this.sensors;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
