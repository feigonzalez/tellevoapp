import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BdreportPageRoutingModule } from './bdreport-routing.module';

import { BdreportPage } from './bdreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BdreportPageRoutingModule
  ],
  declarations: [BdreportPage]
})
export class BdreportPageModule {}
