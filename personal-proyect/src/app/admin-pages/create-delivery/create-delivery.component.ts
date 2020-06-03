/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router }  from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user'
import { MapsAPILoader } from '@agm/core';
import { Delivery } from 'src/app/models/delivery';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.css']
})
export class CreateDeliveryComponent implements OnInit {

  @ViewChild('search') searchElementRef: ElementRef;

  workers : User[];
  worker : User;
  delivery : Delivery;

  address: string;
  latitude: number;
  longitud: number;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private mapsApiLoader: MapsAPILoader
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(){
    this.mapsApiLoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", 
          () => {
            this.ngZone.run(
              () => {
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                this.address = place.formatted_address;
                this.latitude = place.geometry.location.lat();
                this.longitud = place.geometry.location.lng();
              }
            )
          });
      }
    );
  }

  getUsers(){
    this.apiService.getWorkers().subscribe(
      (workers) => {
        this.workers = workers;
      }
    )
  }

  addDelivery(form: NgForm){
    let delivery = new Delivery();

    delivery.user_id = this.worker.id;
    delivery.deliver_name = this.worker.name;
    delivery.delivery_name = form.value.delivery_name;
    delivery.client_name = form.value.client_name;
    delivery.client_email = form.value.client_email;
    delivery.client_direction = this.address;
    delivery.client_phone = form.value.client_phone;
    delivery.latitude = this.latitude;
    delivery.longitud = this.longitud;
    
    this.apiService.addDelivery(delivery).then(
      () => {
        this.toastr.success("Delivery Added Succesfully");
      }
    )
  }

}
