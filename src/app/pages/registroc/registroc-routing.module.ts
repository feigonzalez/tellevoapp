import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrocPage } from './registroc.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrocPageRoutingModule {}
