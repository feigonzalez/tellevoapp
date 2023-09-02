import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajeConductorPage } from './mensaje-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: MensajeConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajeConductorPageRoutingModule {}
