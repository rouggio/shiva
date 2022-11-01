import { inject } from 'aurelia-framework';
import { Schedule } from 'model/schedule';
import { ScheduleServices } from 'service/schedule-services';

@inject(ScheduleServices)
export class Index {

  schedules: Schedule[];

  editingIndex: number;
  editingEntry: Schedule;

  constructor(private scheduleServices: ScheduleServices) { }

  activate() {
    this.scheduleServices.findAll().then(data => this.schedules = data);
  }
  
  saveNew() {
    this.scheduleServices.save(this.editingEntry).then(data => {
      this.schedules.push(data);
      this.editingIndex = null;
      this.editingEntry = null;
    });
  }

  newEntry() {
    this.editingEntry = {
      _id: null,
      name: ""
    };
    this.editingIndex = -1;
  }

  cancelNew() {
    this.editingEntry = null;
    this.editingIndex = null;
  }

  delete(entry: Schedule) {
    let index = this.schedules.findIndex(t => t._id == entry._id);
    return this.scheduleServices.delete(entry._id)
      .then(() => {
        this.schedules.splice(index, 1);
      });
  }

}
