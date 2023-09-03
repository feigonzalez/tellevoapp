import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistropPageRoutingModule } from './registrop-routing.module';

import { RegistropPage } from './registrop.page';

import {MatRadioModule} from '@angular/material/radio';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistropPageRoutingModule,
    MatRadioModule,
    MatSnackBarModule,
    MatRippleModule  
  ],
  declarations: [RegistropPage]
})
export class RegistropPageModule {}
