import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/models/delivery';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { faIdCard, faMapMarker, faBox, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-done-deliveries',
  templateUrl: './done-deliveries.component.html',
  styleUrls: ['./done-deliveries.component.css']
})
export class DoneDeliveriesComponent implements OnInit {

  faIdCard = faIdCard;
  faMapMarker = faMapMarker;
  faBox = faBox;
  faPhone = faPhone;

  workers : User[];
  worker : User;
  deliveries : Delivery[];

  latitude: number;
  longitud: number;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.latitude = 36.828908;
    this.longitud = -2.407523;
  }

  getUsers(){
    this.apiService.getWorkers().subscribe(
      (workers) => {
        this.workers = workers;
      }
    )
  }

  getDelivered(){
    this.apiService.getDelivered(this.worker.id).subscribe(
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
