import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index.component';
import { AnalyticsAccountsComponent } from './analytics-accounts.component';
import { AnalyticsReportComponent } from './analytics-report.component';
import { AnalyticsFailureComponent } from './analytics-failure.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  // { path: 'analytics/', redirectTo: '/analytics/accounts', pathMatch: 'full' },
  { path: 'analytics/accounts',  component: AnalyticsAccountsComponent },
  { path: 'analytics/report/:accountId/:propertyId/:viewId',  component: AnalyticsReportComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
