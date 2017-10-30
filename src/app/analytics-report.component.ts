import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { AnalyticsService } from './analytics.service';
import { AnalyticsWebProperty } from './analytics';

@Component({
  selector: 'analytics-report',
  templateUrl: './analytics-report.component.html'
})

export class AnalyticsReportComponent implements OnInit {

  viewId: String;
  property: AnalyticsWebProperty;

  constructor(
    private service: AnalyticsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.viewId = params.get('viewId');
      this.service
        .getAccountsProperty(params.get('accountId'), params.get('propertyId'))
        .then(data => this.property = data);
    });
  }
}