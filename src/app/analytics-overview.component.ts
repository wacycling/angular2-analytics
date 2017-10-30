import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalyticsService } from './analytics.service';
import { AnalyticsReport } from './analytics';

@Component({
  selector: 'analytics-overview',
  templateUrl: './analytics-overview.component.html'
})

export class AnalyticsOverviewComponent implements OnInit {
  @Input() viewId: string;
  monthlyOptions: Object;
  data: any;

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.service.getOverviewReport(this.viewId)
      .then(reports => {
        reports.forEach(report => {
          if (report.dimensions.indexOf("ga:yearMonth") !== -1) this.buildMonthlyChart(report);
        });
      });
  }

  buildMonthlyChart(report: AnalyticsReport) {
    let labels = report.rows.map(row => row.dimensions);
    this.data = report.metrics.reduce((result, value, index) => {
        result[`${value}`] = {
          total: report.totals[index],
          data: report.rows.map(row => row.metrics[index])
        };
        return result;
      }
    , []);
    this.monthlyOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Audience Overview'
      },
      credits: {
        enabled: false
      },
      legend: {
        align: 'right',
        verticalAlign: 'top'
      },
      xAxis: {
        categories: labels,
        crosshair: true
      },
      yAxis: {
        title: {
          text: null
        },
        stackLabels: {
          enabled: true,
          y: -15
        }
      },
      tooltip: {
        shared: true,
      },
      series: [{
        type: 'area',
        name: 'Sessions',
        data: this.data['ga:sessions']['data'],
        fillOpacity: 0.3
      }, {
        name: 'Users',
        data: this.data['ga:users']['data']
      }, {
        name: 'NewUsers',
        data: this.data['ga:newUsers']['data']
      }]
    };
  }

}