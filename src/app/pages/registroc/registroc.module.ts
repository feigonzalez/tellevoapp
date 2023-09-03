import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrocPageRoutingModule } from './registroc-routing.module';

import { RegistrocPage } from './registroc.page';

import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrocPageRoutingModule,
    MatRadioModule,
    MatSnackBarModule,
    MatRippleModule
  ],
  declarations: [RegistrocPage]
})
export class RegistrocPageModule {}
