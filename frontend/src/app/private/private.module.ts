import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  
  imports: [
    CommonModule,
    PrivateRoutingModule,
    DashboardComponent
  ]
})
export class PrivateModule { }
