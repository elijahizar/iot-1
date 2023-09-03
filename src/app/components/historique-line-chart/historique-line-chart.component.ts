import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { ChartOptions, ChartDataset, ChartConfiguration } from 'chart.js';
import * as moment from 'moment';
import {} from 'ng2-charts';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-historique-line-chart',
  templateUrl: './historique-line-chart.component.html',
  styleUrls: ['./historique-line-chart.component.css'],
})
export class HistoriqueLineChartComponent implements OnInit {
  @Input() chartData!: Message[];
  labels: string[] = [];
  data: number[] = [];
  limit: number[] = [];
  title = 'Historique';
  loadChart: boolean = false;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Humidité',
        tension: 0.5,
        borderColor: '#B0DAFF',
        backgroundColor: '#B0DAFF',
      },
      {
        data: [],
        label: "Seuil d'humidité",
        tension: 0.5,
        borderColor: 'red',
        backgroundColor: 'red',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartLegend = true;

  ngOnInit() {
    setTimeout(() => {
      this.formatData(this.chartData);
      this.loadChart = true;
    }, 100);

    setInterval(() => {
      this.formatData(this.chartData);
    }, 45000);
  }

  formatData(jsonData: Message[]) {
    jsonData.forEach((message: Message) => {
      this.labels.unshift(
        moment(message.creationDate).format('YYYY-MM-DD HH:mm:ss')
      );
      this.data.unshift(message.moisture ? parseInt(message.moisture) : 0);
      this.limit.unshift(
        message.moistureRateLimit ? parseInt(message.moistureRateLimit) : 0
      );
    });

    this.lineChartData.labels = this.labels;
    this.lineChartData.datasets[0].data = this.data;
    this.lineChartData.datasets[1].data = this.limit;
  }
}
