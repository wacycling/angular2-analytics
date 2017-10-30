import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let accounts = [{
      "id": "99999999",
      "name": "foo",
      "properties": [{
        "id": "UA-99999999-2",
        "name": "foo site",
        "websiteUrl": "http://example.jp",
        "profiles": [{
          "id": "2",
          "name": "All web site data"
        }]
      },{
        "id": "UA-99999999-3",
        "name": "foo site",
        "websiteUrl": "http://example.jp",
        "profiles": [{
          "id": "3",
          "name": "All web site data"
        }]
      }, {
        "id": "UA-99999999-4",
        "name": "foo site",
        "websiteUrl": "http://example.jp",
        "profiles": [{
          "id": "4",
          "name": "All web site data"
        }]
      }]
    },{
      "id": "888888",
      "name": "bar",
      "properties": [{
        "id": "UA-8888888-1",
        "name": "bar site",
        "websiteUrl": "http://example.jp",
        "profiles": [{
          "id": "1",
          "name": "All web site data"
        }]
      },{
        "id": "UA-8888888-1",
        "name": "bar site",
        "websiteUrl": "http://example.jp",
        "profiles": [{
          "id": "1",
          "name": "All web site data"
        }]
      },{
        "id": "UA-8888888-1",
        "name": "bar site",
        "websiteUrl": "http://example.jp",
        "profiles": [{
          "id": "1",
          "name": "All web site data"
        }]
      }]
    },{
      "id": "777777",
      "name": "foo / bar",
      "properties": [{
        "id": "UA-8888888-5",
        "name": "for / bar site",
        "websiteUrl": "http://example.jp",
        "profiles": [{
          "id": "5",
          "name": "All web site data"
        }]
      }]
    }];

    let reports = [{
      "id": "overview",
      "data": [{
        "dimensions": ["ga:yearMonth"],
        "metrics": ["ga:sessions", "ga:users", "ga:newUsers", "ga:pageviews", "ga:bounceRate", "ga:goalCompletionsAll"],
        "rowCount": 12,
        "totals": [4155, 3484, 3254, 1200, 64.72406005859375, 18],
        "rows": [
          { "dimensions": ["201611"], "metrics": [679, 533, 509, 300, 72.23333, 0] },
          { "dimensions": ["201612"], "metrics": [636, 528, 492, 300, 12.1234, 0] },
          { "dimensions": ["201701"], "metrics": [585, 498, 463, 300, 12.2343, 0] },
          { "dimensions": ["201702"], "metrics": [432, 381, 357, 300, 12.2122, 0] },
          { "dimensions": ["201703"], "metrics": [398, 358, 335, 300, 12.2333, 0] },
          { "dimensions": ["201704"], "metrics": [327, 281, 262, 300, 12.5552, 0] },
          { "dimensions": ["201705"], "metrics": [253, 205, 187, 300, 12.2666, 0] },
          { "dimensions": ["201706"], "metrics": [244, 207, 192, 300, 12.2777, 0] },
          { "dimensions": ["201707"], "metrics": [158, 139, 127, 300, 12.2888, 0] },
          { "dimensions": ["201708"], "metrics": [190, 169, 156, 300, 12.2112, 0] },
          { "dimensions": ["201709"], "metrics": [203, 146, 141, 300, 12.2333, 6] },
          { "dimensions": ["201710"], "metrics": [190, 169, 156, 300, 12.4342, 12] },
        ]
      }]
    }, {
      "id": "audience",
      "data": [{
        "dimensions":["ga:userAgeBracket"],
        "metrics":["ga:sessions"],
        "rowCount":4,
        "totals":[421],
        "rows":[
          {"dimensions":["18-24"],"metrics":[47]},
          {"dimensions":["25-34"],"metrics":[177]},
          {"dimensions":["35-44"],"metrics":[147]},
          {"dimensions":["45-54"],"metrics":[50]}
        ]
      }, {
        "dimensions":["ga:userGender"],
        "metrics":["ga:sessions"],
        "rowCount":2,
        "totals":[450],
        "rows":[
          {"dimensions":["male"],"metrics":[318]},
          {"dimensions":["female"],"metrics":[132]}
        ]
      }]
    },{
      "id": "mobile",
      "data": [
        {
        "dimensions": ["ga:deviceCategory"],
        "metrics": ["ga:sessions"],
        "rowCount": 3,
        "totals": [145],
        "rows": [
          { "dimensions": ["desktop"], "metrics": [86] },
          { "dimensions": ["mobile"], "metrics": [49] },
          { "dimensions": ["tablet"], "metrics": [10] }
        ]
      },
      {
        "dimensions": ["ga:mobileDeviceInfo"],
        "metrics": ["ga:sessions"],
        "rowCount": 199,
        "totals": [1591],
        "rows": [
          { "dimensions": ["Apple iPhone"], "metrics": [788] },
          { "dimensions": ["Apple iPad"], "metrics": [197] },
          { "dimensions": ["(not set)"], "metrics": [78] },
          { "dimensions": ["Sony SO-01H Xperia Z5"], "metrics": [24] },
          { "dimensions": ["Microsoft Xbox One"], "metrics": [18] },
          { "dimensions": ["Sony SO-02G Xperia Z3 Compact"], "metrics": [18] },
          { "dimensions": ["Sony SO-04H Xperia X Performance"], "metrics": [16] },
          { "dimensions": ["Sony SO-05F DoCoMo tablet Xperia Z2 Tablet"], "metrics": [13] },
          { "dimensions": ["Sharp SH-04G Aquos Ever"], "metrics": [12] },
          { "dimensions": ["Sharp Aquos 503SH Xx2 Mini"], "metrics": [11] }
        ]
      }
      ]
    }, {
      "id": "traffic",
      "data": [{
        "dimensions": ["ga:channelGrouping"],
        "metrics": ["ga:sessions"],
        "rowCount": 4,
        "totals": [4530],
        "rows": [
          { "dimensions": ["Direct"], "metrics": [869] },
          { "dimensions": ["Organic Search"], "metrics": [3273] },
          { "dimensions": ["Referral"], "metrics": [318] },
          { "dimensions": ["Social"], "metrics": [70] }
        ]
      }, {
        "dimensions": ["ga:source"],
        "metrics": ["ga:sessions"],
        "rowCount": 75,
        "totals": [4530],
        "rows": [
          { "dimensions": ["google"], "metrics": [1867] },
          { "dimensions": ["yahoo"], "metrics": [1212] },
          { "dimensions": ["(direct)"], "metrics": [869] },
          { "dimensions": ["bing"], "metrics": [162] },
          { "dimensions": ["com.google.android.googlequicksearchbox"], "metrics": [46] },
          { "dimensions": ["reddit.com"], "metrics": [32] },
          { "dimensions": ["ttt.xyz"], "metrics": [18] },
          { "dimensions": ["thenextweb.com"], "metrics": [18] },
          { "dimensions": ["addons.mozilla.org"], "metrics": [17] },
          { "dimensions": ["example.jp"], "metrics": [15] }
        ]
      }]
    }, {
      "id": "content",
      "data": [{
        "dimensions":["ga:landingPagePath"],
        "metrics":["ga:sessions","ga:goalConversionRateAll","ga:goalCompletionsAll"],
        "rowCount":3,"totals":[1652,1.1501210927963257,19],
        "rows":[
          {"dimensions":["/"],"metrics":[1598,0.6883604526519775,11]},
          {"dimensions":["/contact"],"metrics":[22,31.81818199157715,7]},
          {"dimensions":["/foo"],"metrics":[1420,20.125,30]},
          {"dimensions":["/bar"],"metrics":[2142,30.125,20]},
          {"dimensions":["/foo/bar"],"metrics":[142,40.125,10]},
          {"dimensions":["/foo/bar/bar"],"metrics":[142,10.125,6]},
          {"dimensions":["/works"],"metrics":[32,3.125,1]}
        ]
      }]
    }, {
      "id": "conversions",
      "data": [
        {
          "dimensions":["ga:yearMonth"],
          "metrics":["ga:sessions","ga:goalConversionRateAll","ga:goalCompletionsAll","ga:goalValueAll"],
          "rowCount":12,
          "totals":[27405,3.1673052310943604,868,0],
          "rows":[
            {"dimensions":["201610"],"metrics":[1362,0,0,0]},
            {"dimensions":["201611"],"metrics":[1476,0,0,0]},
            {"dimensions":["201612"],"metrics":[1700,0,0,0]},
            {"dimensions":["201701"],"metrics":[2184,0,0,0]},
            {"dimensions":["201702"],"metrics":[2470,0,0,0]},
            {"dimensions":["201703"],"metrics":[2680,0,0,0]},
            {"dimensions":["201704"],"metrics":[2408,0,0,0]},
            {"dimensions":["201705"],"metrics":[2447,0.9807928204536438,24,0]},
            {"dimensions":["201706"],"metrics":[2420,8.842975616455078,214,0]},
            {"dimensions":["201707"],"metrics":[2764,7.199710369110107,199,0]},
            {"dimensions":["201708"],"metrics":[2929,7.272106647491455,213,0]},
            {"dimensions":["201709"],"metrics":[2565,8.499025344848633,218,0]}
          ]
        }, {
          "dimensions":["ga:goalCompletionLocation"],
          "metrics":["ga:goalCompletionsAll","ga:goalValueAll"],
          "rowCount":2,
          "totals":[19,0],
          "rows":[
            {"dimensions":["/foo"],"metrics":[20,1500]},
            {"dimensions":["/foo/website"],"metrics":[18,1000]},
            {"dimensions":["/foo/bar"],"metrics":[17,0]},
            {"dimensions":["/foo/website/bar"],"metrics":[16,0]},
            {"dimensions":["/contact"],"metrics":[18,400]},
            {"dimensions":["/solution/foo"],"metrics":[16,100]},
            {"dimensions":["/solution/bar"],"metrics":[3,20]},
            {"dimensions":["/solution/foo/bar"],"metrics":[1,0]}
          ]
        }]
      }
    ];
    return { accounts, reports };
  }
}