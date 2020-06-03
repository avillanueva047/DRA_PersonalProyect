import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PendingDeliveriesComponent } from './pending-deliveries/pending-deliveries.component';
import { ItemsDeliveredComponent } from './items-delivered/items-delivered.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: 'pending',
    component: HeaderComponent
  },
  {
    path: 'delivered',
    component: HeaderComponent
  }
]

@NgModule({
  declarations: [HeaderComponent, PendingDeliveriesComponent, ItemsDeliveredComponent],
  imports: [
    RouterModule.forChild(routes),
    FontAwesomeModule,
    CommonModule,
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
export class UserPagesModule { }
