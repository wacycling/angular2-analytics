import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalyticsService } from './analytics.service';
import { AnalyticsReport } from './analytics';

@Component({
  selector: 'analytics-audience',
  templateUrl: './analytics-audience.component.html'
})

export class AnalyticsAudienceComponent implements OnInit {
  @Input() viewId: string;
  userAgeBracketOptions: Object;
  userGenderOptions: Object;

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.service.getAudienceReport(this.viewId)
      .then(reports => {
        reports.forEach(report => {
          if (report.dimensions.indexOf("ga:userAgeBracket") !== -1) this.buildUserAgeBracketChart(report);
          if (report.dimensions.indexOf("ga:userGender") !== -1) this.buildUserGenderChart(report);
        });
      });
  }

  buildUserAgeBracketChart(report: AnalyticsReport) {
    let labels = report.rows.map(row => row.dimensions);
    let data = report.metrics.reduce((result, value, index) => {
      result[`${value}`] = report.rows.map(row => row.metrics[index]);
      return result;
    }, []);

    this.userAgeBracketOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Age'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: labels
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
        data: data['ga:sessions']
      }]
    };
  }

  buildUserGenderChart(report: AnalyticsReport) {
    let data = report.rows.map(row => ({
      name: row.dimensions.shift(),
      y: row.metrics.shift()
    }));
    this.userGenderOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Gender'
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
}