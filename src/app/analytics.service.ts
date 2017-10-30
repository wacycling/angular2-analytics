import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { AnalyticsAccount, AnalyticsReport, AnalyticsWebProperty } from './analytics';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsFailureComponent } from './analytics-failure.component';

@Injectable()
export class AnalyticsService {

  private url = 'api/analytics';
  private options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

  constructor(
    private http: Http,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  getAccountsProperty(accountId: String, propertyId: String): Promise<AnalyticsWebProperty> {
    return this.http.get(`${this.url}/accounts/${accountId}/properties/${propertyId}`, this.options)
      .toPromise()
      .then(response => response.json() as AnalyticsWebProperty)
      .catch(error => this.handleError(error));
  }

  getAccounts(): Promise<AnalyticsAccount[]> {
    return this.http.get(`${this.url}/accounts`, this.options)
      .toPromise()
      .then(response => response.json() as AnalyticsAccount[])
      .catch(error => this.handleError(error));
  }

  getOverviewReport(viewId: String): Promise<AnalyticsReport[]> {
    return this.http.get(`${this.url}/reports/overview/${viewId}`, this.options)
      .toPromise()
      .then(response => response.json().data as AnalyticsReport)
      .catch(error => this.handleError(error));
  }

  getAudienceReport(viewId: String): Promise<AnalyticsReport[]> {
    return this.http.get(`${this.url}/reports/audience/${viewId}`, this.options)
      .toPromise()
      .then(response => response.json().data as AnalyticsReport)
      .catch(error => this.handleError(error));
  }

  getMobileReport(viewId: String): Promise<AnalyticsReport[]> {
    return this.http.get(`${this.url}/reports/mobile/${viewId}`, this.options)
      .toPromise()
      .then(response => response.json().data as AnalyticsReport)
      .catch(error => this.handleError(error));
  }

  getTrafficReport(viewId: String): Promise<AnalyticsReport[]> {
    return this.http.get(`${this.url}/reports/traffic/${viewId}`, this.options)
      .toPromise()
      .then(response => response.json().data as AnalyticsReport)
      .catch(error => this.handleError(error));
  }

  getContentReport(viewId: String): Promise<AnalyticsReport[]> {
    return this.http.get(`${this.url}/reports/content/${viewId}`, this.options)
      .toPromise()
      .then(response => response.json().data as AnalyticsReport)
      .catch(error => this.handleError(error));
  }

  getConversionsReport(viewId: String): Promise<AnalyticsReport[]> {
    return this.http.get(`${this.url}/reports/conversions/${viewId}`, this.options)
      .toPromise()
      .then(response => response.json().data as AnalyticsReport)
      .catch(error => this.handleError(error));
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error.status);
    if (parseInt(error.status, 10) === 401) {
      this.modalService.open(AnalyticsFailureComponent, {backdrop: 'static'});
    };
    return Promise.reject(error.message || error);
  }
}