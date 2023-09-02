import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'],
})
export class MessagesListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [10, 25, 50]; // Define the page size options
  pageSize = 10; // Initial page size
  pageIndex = 0; // Initial page index
  @Input() sensorId!: string | null;
  messages: Message[] = [];

  displayedColumns: string[] = ['id', 'sensor_id', 'moisture', 'alert', 'date'];
  dataSource = new MatTableDataSource();

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    if (this.sensorId) this.getMessages(this.sensorId);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    // Set the initial page size after the view is initialized
    this.paginator.pageSize = this.pageSize;

    // Bind the paginator to the data source
    this.dataSource.paginator = this.paginator;
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

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Apply pagination to the data source
    this.dataSource.paginator = this.paginator;
  }
}
