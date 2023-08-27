import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenurePageRoutingModule } from './menure-routing.module';

import { MenurePage } from './menure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenurePageRoutingModule
  ],
  declarations: [MenurePage]
})
export class MenurePageModule {}
