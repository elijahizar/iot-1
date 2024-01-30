import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesListComponent } from './messages-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MessagesService } from 'src/app/services/messages.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

describe('MessagesListComponent', () => {
  let component: MessagesListComponent;
  let fixture: ComponentFixture<MessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesListComponent],
      providers: [MessagesService],
      imports: [HttpClientTestingModule, HttpClientModule, MatTableModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
