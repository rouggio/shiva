import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(EventAggregator)
export class HttpServices {

  private httpClient = new HttpClient();

  private constructor(private ea: EventAggregator) {
    this.configureHttpClient();
  }

  public configureHttpClient(jwt?: string) {
    var headers = {
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch'
    };
    if (jwt) {
      headers['Authorization'] = "Bearer " + jwt;
    }

    this.httpClient.configure(config => {
      var baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:8000/api" : "/api";
      config
        .withBaseUrl(baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: headers
        })
        .withInterceptor({
          request(request) {
            this.isRequesting = true;
            return request;
          },
          response(response) {
            this.isRequesting = false;
            if (response.status >= 400) {
              throw response;
            } else {
              return response;
            }
          }
        });
    });
  }

  public get HttpClient() {
    return this.httpClient;
  }

}
