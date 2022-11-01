import { inject } from 'aurelia-framework';
import { Schedule } from 'model/schedule';
import { HttpServices } from './http-services';
import { json } from 'aurelia-fetch-client';

@inject(HttpServices)
export class ScheduleServices {

  constructor(private httpServices: HttpServices) { }

  findAll(): Promise<Schedule[]> {
    return this.httpServices.HttpClient
      .fetch('/schedule', {
        method: 'get'
      }).then(data => data.json());
  }

  save(schedule: Schedule): Promise<Schedule> {
    return this.httpServices.HttpClient
      .fetch('/schedule', {
        method: 'post',
        body: json(schedule)
      })
      .then(data => data.json());
  }

  delete(id: string) {
    return this.httpServices.HttpClient
      .fetch('/schedule/' + id, {
        method: 'delete'
      }).then(data => data.json());
  }

}
