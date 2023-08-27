import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenurePage } from './menure.page';

const routes: Routes = [
  {
    path: '',
    component: MenurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenurePageRoutingModule {}
