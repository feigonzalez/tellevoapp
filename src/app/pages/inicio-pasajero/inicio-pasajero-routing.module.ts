import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPasajeroPage } from './inicio-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPasajeroPageRoutingModule {}
