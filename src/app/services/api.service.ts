import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private cloudSubject = new Subject<any>();

  constructor(
    private socket: Socket,
    private alert: AlertService
  ) {

  }

  listenServer() {
    return this.get('newData');
  }

  cloud() {
    return new Promise(
      (resolve, reject) => {
        this.socket.emit('cloud');
        this.socket.on('cloud', (res: any[]) => {
          resolve(res);
        });
      }
    );
  }

  post(event, data) {
    return new Promise(
      (resolve, reject) => {
        this.socket.emit(event, data);
        this.socket.on(event,
          res => {
            resolve(res.data);
            if (res.infos) this.alert.toast(res.infos);
          })
      }
    );
  }

  getStreamData() {
    return this.cloudSubject.asObservable();
  }

  get(event) {
    return this.socket
      .fromEvent(event);
  }

}

