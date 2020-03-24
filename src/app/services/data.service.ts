import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coursier } from '../models/coursier';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchValue: string = '';
  private coursierSubject = new BehaviorSubject<Coursier>(null);
  private notifications: any[] = [];
  private controls: any[];
  private notificationsSubject = new BehaviorSubject<any[]>([]);

  constructor(
   
  ) {

  }

  setCoursier(coursier) {
    console.log(coursier);
    this.coursierSubject.next(coursier);
  }

  getCoursier() {
    return this.coursierSubject.asObservable();
  }

  setNotifications(data) {
    this.notifications.unshift(data);
    this.notificationsSubject.next(this.notifications);
  }

  getNotifications() {
    return this.notificationsSubject.asObservable();
  }

  resetNotifications() {
    return new Promise((resolve, reject) => {
      this.notifications = [];
      this.notificationsSubject.next(this.notifications);
      resolve(true);
    });
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.coursierSubject.subscribe(
        coursier => {
          // let controls = coursier.controls;
          // if (controls.find(elem => elem.model + ':all' === 'coursier:all').coursierControl.isChecked) this.coursierService.loadData();
          // if (controls.find(elem => elem.model + ':all' === 'coursier:all').coursierControl.isChecked) this.coursierService.loadData();
          // if (controls.find(elem => elem.model + ':all' === 'client:all').coursierControl.isChecked) this.clientService.loadData();
          // if (controls.find(elem => elem.model + ':all' === 'engin:all').coursierControl.isChecked) this.enginService.loadData();
          resolve('data loaded successful!');
        }
      )
    });


  }

  setData(res) {
    console.log(res);
    res.forEach(
      element => {
        // switch (element.operation.model) {
        //   case 'Employe':
        //     this.coursierService.set(element.data);
        //     break;
        //   case 'Coursier':
        //     this.coursierService.set(element.data);
        //     break;
        //   case 'Client':
        //     this.clientService.set(element.data);
        //     break;
        //   case 'Engin':
        //     this.enginService.set(element.data);
        //     break;
        // }
      }
    );

  }
}