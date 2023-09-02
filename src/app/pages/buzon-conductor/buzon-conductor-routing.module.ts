import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuzonConductorPage } from './buzon-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: BuzonConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuzonConductorPageRoutingModule {}
