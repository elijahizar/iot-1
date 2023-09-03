import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueLineChartComponent } from './historique-line-chart.component';

describe('HistoriqueLineChartComponent', () => {
  let component: HistoriqueLineChartComponent;
  let fixture: ComponentFixture<HistoriqueLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueLineChartComponent]
    });
    fixture = TestBed.createComponent(HistoriqueLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
