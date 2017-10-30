export class AnalyticsReport {
  dimensions: [String];
  metrics: [String];
  rowCount: Number;
  totals: [Number];
  rows: [AnalyticsReportRow];
}
export class AnalyticsReportRow {
  dimensions: [String];
  metrics: [Number];
}
export class AnalyticsAccount {
  id: String;
  name: String;
  properties: [AnalyticsWebProperty]
}
export class AnalyticsWebProperty {
  id: String;
  name: String;
  profiles: [AnalyticsProfile];
}
export class AnalyticsProfile {
  id: String;
  name: String;
}