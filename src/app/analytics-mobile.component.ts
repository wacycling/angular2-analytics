import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalyticsService } from './analytics.service';
import { AnalyticsReport, AnalyticsReportRow } from './analytics';

@Component({
  selector: 'analytics-mobile',
  templateUrl: './analytics-mobile.component.html',
})

export class AnalyticsMobileComponent implements OnInit {
  @Input() viewId: string;
  deviceOptions: Object;
  mobileOptions: Object;

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.service.getMobileReport(this.viewId)
      .then(reports => {
        reports.forEach(report => {
          if (report.dimensions.indexOf("ga:deviceCategory") !== -1) this.buildDevicesCategoryChart(report);
          if (report.dimensions.indexOf("ga:mobileDeviceInfo") !== -1) this.buildMobileChart(report);
        });
      });
  }

  buildDevicesCategoryChart(report: AnalyticsReport) {
    let data = report.rows.map(row => ({
      name: row.dimensions.shift(),
      y: row.metrics.shift()
    }));
    this.deviceOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Device Category'
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
        type: 'pie',
        innerSize: '40%',
        name: 'Session',
        colorByPoint: true,
        data: data,
        // dataLabels: {
        //   enabled: false
        // }
      }]
    };
  }

  buildMobileChart(report: AnalyticsReport) {
    let labels = report.rows.map(row => row.dimensions);
    let data = report.rows.map(row => ({
      name: row.dimensions.shift(),
      y: row.metrics.shift()
    }));
    this.mobileOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Devices'
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