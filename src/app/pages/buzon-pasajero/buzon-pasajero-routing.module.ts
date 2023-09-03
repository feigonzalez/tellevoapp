import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuzonPasajeroPage } from './buzon-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: BuzonPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuzonPasajeroPageRoutingModule {}
