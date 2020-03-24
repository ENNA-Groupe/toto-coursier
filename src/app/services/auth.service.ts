import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  sub: Subscription;

  constructor(
    private api: ApiService,
    private data: DataService
  ) { }

  login(data) {
    return this.api.post('auth:login', data).then(
      (res: any) => {
        if (res.isAuth) {
          this.data.setCoursier(res.coursier);
          this.data.loadData().then(
            (res) => {
              console.log(res);
              this.api.post('notification:all', null).then(
                (res2: any) => {
                  this.data.resetNotifications().then(
                    () => {
                      res2.operations.forEach(item => this.data.setNotifications(item));
                      this.sub = this.api.listenServer().subscribe(
                        res3 => {
                          console.log(res3);
                          this.data.setNotifications(res3);
                          this.api.cloud().then(
                            (res4) => {
                              this.data.setData(res4);
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
        return res.isAuth;
      }
    );
  }

  changePassword(password) {
    return this.api.post('auth:change-password', password).then(
      (res) => {
        return res;
      }
    );
  }

  logout() {
    return this.api.post('auth:logout', null).then(
      res => {
        if (res) this.sub.unsubscribe();
        return res;
      }
    );
  }

  setNotificationsSeen(data: any) {
    this.api.post('notification:setSeen', data).then(
      () => {
        this.data.resetNotifications().then(
          () => {
            this.api.post('notification:all', null).then(
              (res2: any) => {
                this.data.resetNotifications().then(
                  () => {
                    res2.operations.forEach(item => this.data.setNotifications(item));
                  }
                );
              }
            );
          }
        );
      }
    );
  }

}
