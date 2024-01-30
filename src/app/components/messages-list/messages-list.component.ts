import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  dataSource: MatTableDataSource<Message> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @Input() sensorId!: string;
  pageSizeOptions: number[] = [10, 25, 50]; // Define the page size options
  pageSize: number; // Initial page size
  pageIndex: number; // Initial page index
  messages!: Message[];

  displayedColumns: string[] = ['id', 'sensor_id', 'moisture', 'alert', 'date'];

  constructor(private messagesService: MessagesService) {
    this.pageSize = 10;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    if (this.sensorId) {
      this.getMessages(this.sensorId);
      setInterval(() => {
        this.getMessages(this.sensorId);
      }, 45000);
    }
  }

  ngAfterViewInit(): void {
    // Bind the paginator to the data source
    this.dataSource.paginator = this.paginator;
  }

  getMessages(sensorId: string): void {
    this.messagesService.getMessages(sensorId).subscribe((data) => {
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
