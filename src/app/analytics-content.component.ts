import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalyticsService } from './analytics.service';
import { AnalyticsReport } from './analytics';

@Component({
  selector: 'analytics-content',
  templateUrl: './analytics-content.component.html',
})

export class AnalyticsContentComponent implements OnInit {
  @Input() viewId: string;
  bubbleOptions: Object;

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.service.getContentReport(this.viewId)
      .then(reports => {
        reports.forEach(report => {
          if (report.dimensions.indexOf("ga:landingPagePath") !== -1) this.buildBubbleChart(report);
        });
      });
  }

  buildBubbleChart(report: AnalyticsReport) {
    let metricsKeys = report.metrics.reduce((result, value, index) => {
      result[`${value}`] = index;
      return result;
    }, []);
    let data = report.rows.map(row => ({
      x: row.metrics[metricsKeys['ga:sessions']],
      y: row.metrics[metricsKeys['ga:goalConversionRateAll']],
      z: row.metrics[metricsKeys['ga:goalCompletionsAll']],
      name: row.dimensions.shift(),
    }));

    let x: number = Math.max.apply(null, data.map(d => {return d['x']}));
    let y: number = Math.max.apply(null, data.map(d => {return d['y']}));
    let xvalue = x / 2;
    let yvalue = y / 2;

    this.bubbleOptions = {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
      },
      legend: {
        enabled: false
      },
      title: {
        text: 'Sessions and Goal Conversion Rate per landing page'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        gridLineWidth: 1,
        title: {
          text: 'Sessions'
        },
        plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: xvalue,
          // label: {
          //   rotation: 0,
          //   x: 10,
          //   y: 20,
          //   text: 'Excellent page'
          // },
          zIndex: 3
        }]
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'CVR'
        },
        labels: {
          format: '{value:.1f} %'
        },
        maxPadding: 0.2,
        plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: yvalue,
          // label: {
          //   text: 'Be an excellent page',
          //   y: -20
          // },
          zIndex: 3
        }]
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><strong>{point.name}</strong></th></tr>' +
        '<tr><th>Sessions:</th><td>{point.x}</td></tr>' +
        '<tr><th>CVR:</th><td>{point.y:.1f}%</td></tr>',
        footerFormat: '</table>',
        followPointer: true
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        data: data
      }]
    };
  }

}