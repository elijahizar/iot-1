import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SensorsListComponent } from './components/sensors-list/sensors-list.component';
import { SensorsService } from './services/sensors.service';
import { SensorComponent } from './components/sensor/sensor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SensorComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SensorsListComponent,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    FormsModule
  ],
  providers: [SensorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
