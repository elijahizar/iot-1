import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from 'src/app/models/message.model';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'],
})
export class MessagesListComponent implements OnInit {
  @Input() sensorId!: string | null;
  messages: Message[] = [];

  displayedColumns: string[] = ['id', 'sensor_id', 'moisture', 'alert', 'date'];
  dataSource = new MatTableDataSource();

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    if (this.sensorId) this.getMessages(this.sensorId);
  }

  getMessages(sensorId: string): void {
    console.log('sensorId', this.sensorId);
    this.messagesService.getMessages(sensorId).subscribe((data) => {
      console.log('responseMessages', data);
      this.messages = data.messages;
      // Update the dataSource with the new sensor data
      this.dataSource.data = this.messages;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
