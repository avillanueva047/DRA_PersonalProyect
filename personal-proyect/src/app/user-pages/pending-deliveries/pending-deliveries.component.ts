import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { faIdCard, faMapMarker, faBox, faPhone, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';
import { Delivery } from 'src/app/models/delivery';

@Component({
  selector: 'app-pending-deliveries',
  templateUrl: './pending-deliveries.component.html',
  styleUrls: ['./pending-deliveries.component.css']
})
export class PendingDeliveriesComponent implements OnInit {

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
    private apiService: ApiService,
    private toastr: ToastrService,
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
        this.getDeliveries();
      }
    )
  }

  getDeliveries(){
    this.apiService.getDeliveries(this.user.id).subscribe(
      (deliveries) => {
        this.deliveries = deliveries;
      }
    );
  }

  showMap(delivery: Delivery){
    this.latitude = delivery.latitude;
    this.longitud = delivery.longitud;
  }

  delivered(d: Delivery){
    const id = d.id;
    const index = this.deliveries.indexOf(d, 0);
    if(index > -1){
      this.deliveries.splice(index, 1);
    }
    this.apiService.delivered(d.id).then(
      () => {
        this.toastr.success("Item Handed Successfully");
      }
    );
  }

}
