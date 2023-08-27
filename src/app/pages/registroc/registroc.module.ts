import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrocPageRoutingModule } from './registroc-routing.module';

import { RegistrocPage } from './registroc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrocPageRoutingModule
  ],
  declarations: [RegistrocPage]
})
export class RegistrocPageModule {}
