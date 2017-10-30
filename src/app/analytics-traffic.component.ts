import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalyticsService } from './analytics.service';
import { AnalyticsReport } from './analytics';

@Component({
  selector: 'analytics-traffic',
  templateUrl: './analytics-traffic.component.html',
})

export class AnalyticsTrafficComponent implements OnInit {
  @Input() viewId: string;
  channelOptions: Object;
  sourceOptions: Object;

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.service.getTrafficReport(this.viewId)
      .then(reports => {
        reports.forEach(report => {
          if (report.dimensions.indexOf("ga:channelGrouping") !== -1) this.buildChannelGroupingChart(report);
          if (report.dimensions.indexOf("ga:source") !== -1) this.buildSourceChart(report);
        });
      });
  }

  buildChannelGroupingChart(report: AnalyticsReport) {
    let data = report.rows.map(row => ({
      name: row.dimensions.shift(),
      y: row.metrics.shift()
    }));
    this.channelOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Channels'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true
        }
      },
      series: [{
        name: 'Session',
        colorByPoint: true,
        data: data
      }]
    };
  }

  buildSourceChart(report: AnalyticsReport) {
    let labels = report.rows.map(row => row.dimensions);
    let data = report.rows.map(row => ({
      name: row.dimensions.shift(),
      y: row.metrics.shift()
    }));
    this.sourceOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Source'
      },
      subtitle: {
        text: 'Top 10'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        min: 0,
        title: {
          text: null
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Session',
        data: data
      }]
    };
  }

}