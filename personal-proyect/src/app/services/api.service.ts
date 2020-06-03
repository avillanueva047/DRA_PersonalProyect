import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage'
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Delivery } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isLoggedIn = false;

  token: any;
  header: HttpHeaders;

  constructor(
    private http: HttpClient,
    private storage: StorageMap,
    private env: EnvService
  ) { }

  /*Authentication methods*/

  login(email:String, password: String){
    return this.http.post(this.env.API_URL + 'auth/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.set('token', token).toPromise().then(
          () => {
            console.log('Token Stored');
          },
          error => 
            console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  getToken(){
    return this.token;
  }

  logOut(){
    this.header = new HttpHeaders ({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });

    return this.http.get(this.env.API_URL + 'auth/logout', {headers: this.header}).pipe(
      (data) => {
        this.storage.clear();
        this.isLoggedIn = false;
        delete this.token;
        return data;
      },
    );
  }

  register(name: String, email: String, password: String){
    return this.http.post(this.env.API_URL + 'auth/register',
      {name: name, email: email, password: password, admin: false}
    );
  }

  /* In app methods */

  getUser() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });

    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers }).pipe(
      tap(user => {
        return user;
      })
    );
  }

  getWorkers(){
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User[]>(this.env.API_URL + 'auth/admin/workers', {headers: headers})
  }

  async addDelivery(delivery: Delivery){
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"],
    });
    await this.http.post(this.env.API_URL + 'auth/admin/create', { 
      user_id: delivery.user_id, deliver_name: delivery.deliver_name, delivery_name: delivery.delivery_name, 
      client_name: delivery.client_name, client_email: delivery.client_email, client_direction: delivery.client_direction,
      client_phone: delivery.client_phone, latitude: delivery.latitude, longitud: delivery.longitud
    }, { headers: headers }).toPromise().then(
      () => {
        console.log("Delivery Added")
      }
    )
  }

  getDeliveries(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<Delivery[]>(this.env.API_URL + 'auth/admin/deliveries/' + id, {headers: headers});
  }

  getDelivered(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<Delivery[]>(this.env.API_URL + 'auth/admin/delivered/' + id, {headers: headers});
  }

  async delivered(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    await this.http.post(this.env.API_URL + 'auth/user/delivered', {id: id}, {headers: headers}).toPromise().then(
      () => {
        console.log("Delivery Handed")
      }
    )
  }
}
