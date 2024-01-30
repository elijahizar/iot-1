import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorComponent } from './sensor.component';
import { SensorsService } from 'src/app/services/sensors.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('SensorComponent', () => {
  let component: SensorComponent;
  let fixture: ComponentFixture<SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorComponent],
      providers: [SensorsService],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
