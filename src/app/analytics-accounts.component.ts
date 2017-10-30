import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnalyticsService } from './analytics.service';
import { AnalyticsAccount, AnalyticsWebProperty, AnalyticsProfile } from './analytics';

@Component({
  selector: 'analytics-accounts',
  templateUrl: './analytics-accounts.component.html',
  styleUrls: ['./analytics-accounts.component.css']
})

export class AnalyticsAccountsComponent implements OnInit {

  accounts: AnalyticsAccount[];

  constructor(
    private router: Router,
    private service: AnalyticsService
  ){}

  ngOnInit(): void {
    this.service.getAccounts()
      .then(data => this.accounts = data);
  }

  // onSelect(account: AnalyticsAccount, property: AnalyticsWebProperty, profile: AnalyticsProfile): void {
  //   this.router.navigate(['/analytics', account.id, property.id, profile.id]);
  // }
}