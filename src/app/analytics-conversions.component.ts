import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalyticsService } from './analytics.service';
import { AnalyticsReport } from './analytics';

@Component({
  selector: 'analytics-conversions',
  templateUrl: './analytics-conversions.component.html',
})

export class AnalyticsConversionsComponent implements OnInit {
  @Input() viewId: string;
  monthlyOptions: Object;
  goalLocationOptions: Object;
  monthlyData: Object;
  goalLocationData: Object[];

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.service.getConversionsReport(this.viewId)
      .then(reports => {
        reports.forEach(report => {
          if (report.dimensions.indexOf("ga:yearMonth") !== -1) this.buildYearMonthChart(report);
          if (report.dimensions.indexOf("ga:goalCompletionLocation") !== -1) this.buildGoalLocationChart(report);
        });
      });
  }

  buildYearMonthChart(report: AnalyticsReport) {
    let labels = report.rows.map(row => row.dimensions);
    let data = report.metrics.reduce((result, value, index) => {
      result[`${value}`] = {
        total: report.totals[index],
        data: report.rows.map(row => row.metrics[index])
      };
      return result;
    }, []);

    this.monthlyData = data;
    this.monthlyOptions = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'Goals Overview'
      },
      credits: {
        enabled: false
      },
      xAxis: [{
        categories: labels,
        crosshair: true
      }],
      yAxis: [{
        labels: {
          format: '{value:.0f}'
        },
        title: {
          text: 'Goal Completions'
        }
      }, {
        title: {
          text: 'Goal Conversion Rate'
        },
        labels: {
          format: '{value:.1f} %'
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        align: 'right',
        verticalAlign: 'top'
      },
      series: [{
        name: 'Goal Conversion Rate',
        type: 'column',
        yAxis: 1,
        data: data['ga:goalConversionRateAll']['data'],
        tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.1f}%</b><br>'
        }
      }, {
        name: 'Goal Completions',
        type: 'spline',
        data: data['ga:goalCompletionsAll']['data'],
        tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b>'
        }
      }]
    };
  }

  buildGoalLocationChart(report: AnalyticsReport) {
    let metricsKeys = report.metrics.reduce((result, value, index) => {
      result[`${value}`] = index;
      return result;
    }, []);
    this.goalLocationData = report.rows.map(row => ({
      path: row.dimensions.shift(),
      goalComplections: row.metrics[metricsKeys['ga:goalCompletionsAll']],
      goalValue: row.metrics[metricsKeys['ga:goalValueAll']]
    }));
  }

}