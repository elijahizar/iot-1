import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorComponent } from './components/sensor/sensor.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { SensorsListComponent } from './components/sensors-list/sensors-list.component';

const routes: Routes = [
  { path: '', component: SensorsListComponent },
  { path: 'sensor/:id', component: SensorComponent },
  { path: 'sensor/create', component: SensorComponent },
  { path: 'messages', component: MessagesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
