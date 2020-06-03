import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/models/delivery';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { faIdCard, faMapMarker, faBox, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-current-deliveries',
  templateUrl: './current-deliveries.component.html',
  styleUrls: ['./current-deliveries.component.css']
})
export class CurrentDeliveriesComponent implements OnInit {

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
    private apiService: ApiService,
    private toastr: ToastrService,
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

  getDeliveries(){
    this.apiService.getDeliveries(this.worker.id).subscribe(
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
