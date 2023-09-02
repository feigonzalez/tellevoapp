import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrocPageRoutingModule } from './registroc-routing.module';

import { RegistrocPage } from './registroc.page';

import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrocPageRoutingModule,
    MatRadioModule
  ],
  declarations: [RegistrocPage]
})
export class RegistrocPageModule {}
