import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { faIdCard, faMapMarker, faBox, faPhone, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';
import { Delivery } from 'src/app/models/delivery';

@Component({
  selector: 'app-items-delivered',
  templateUrl: './items-delivered.component.html',
  styleUrls: ['./items-delivered.component.css']
})
export class ItemsDeliveredComponent implements OnInit {

  faIdCard = faIdCard;
  faMapMarker = faMapMarker;
  faBox = faBox;
  faPhone = faPhone;
  faPeopleCarry = faPeopleCarry;

  user : User;
  deliveries : Delivery[];

  latitude: number;
  longitud: number;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.latitude = 36.828908;
    this.longitud = -2.407523;
  }

  async getUser(){
    await this.apiService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.getDelivered();
      }
    )
  }

  getDelivered(){
    this.apiService.getDelivered(this.user.id).subscribe(
      (deliveries) => {
        this.deliveries = deliveries;
      }
    );
  }

  showMap(delivery: Delivery){
    this.latitude = delivery.latitude;
    this.longitud = delivery.longitud;
  }

}
