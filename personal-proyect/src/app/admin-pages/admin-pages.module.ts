import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { CreateDeliveryComponent } from './create-delivery/create-delivery.component';
import { CurrentDeliveriesComponent } from './current-deliveries/current-deliveries.component';
import { DoneDeliveriesComponent } from './done-deliveries/done-deliveries.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: 'current',
    component: HeaderComponent
  },
  {
    path: 'create',
    component: HeaderComponent
  },
  {
    path: 'done',
    component: HeaderComponent
  }
]

@NgModule({
  declarations: [CreateDeliveryComponent, CurrentDeliveriesComponent, DoneDeliveriesComponent, HeaderComponent],
  imports: [
    RouterModule.forChild(routes),
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ["places"]
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPagesModule { }
