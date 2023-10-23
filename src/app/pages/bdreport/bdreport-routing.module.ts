import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BdreportPage } from './bdreport.page';

const routes: Routes = [
  {
    path: '',
    component: BdreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BdreportPageRoutingModule {}
