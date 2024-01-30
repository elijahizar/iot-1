import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsListComponent } from './sensors-list.component';
import { SensorsService } from 'src/app/services/sensors.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

describe('SensorsListComponent', () => {
  let component: SensorsListComponent;
  let fixture: ComponentFixture<SensorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsListComponent],
      providers: [SensorsService],
      imports: [HttpClientTestingModule, HttpClientModule, MatTableModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
