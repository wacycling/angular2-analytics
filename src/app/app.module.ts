import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }　from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { AppRoutingModule } from './app-routing.module';
import { AnalyticsService } from './analytics.service';
import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';
import { AnalyticsAccountsComponent } from './analytics-accounts.component';
import { AnalyticsReportComponent } from './analytics-report.component';
import { AnalyticsOverviewComponent } from './analytics-overview.component';
import { AnalyticsAudienceComponent } from './analytics-audience.component';
import { AnalyticsMobileComponent } from './analytics-mobile.component';
import { AnalyticsTrafficComponent } from './analytics-traffic.component';
import { AnalyticsContentComponent } from './analytics-content.component';
import { AnalyticsConversionsComponent } from './analytics-conversions.component';
import { AnalyticsFailureComponent } from './analytics-failure.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

export function highchartsFactory() {
  const h = require('highcharts');
  const m = require('highcharts/highcharts-more');
  h.getOptions().plotOptions.pie.colors = (function () {
    var colors = [],
      base = h.getOptions().colors[0],
      i;
    for (i = 0; i < 10; i += 1) {
      colors.push(h.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
    }());
  m(h);
  return h;
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ChartModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { apiBase: 'api/analytics'})
  ],
  declarations: [
    AppComponent,
    AnalyticsFailureComponent,
    IndexComponent,
    AnalyticsAccountsComponent,
    AnalyticsReportComponent,
    AnalyticsOverviewComponent,
    AnalyticsAudienceComponent,
    AnalyticsMobileComponent,
    AnalyticsTrafficComponent,
    AnalyticsContentComponent,
    AnalyticsConversionsComponent
  ],
  providers: [
    AnalyticsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  entryComponents: [AnalyticsFailureComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
