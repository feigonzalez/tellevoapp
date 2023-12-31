import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioConductorPageRoutingModule } from './inicio-conductor-routing.module';

import { InicioConductorPage } from './inicio-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioConductorPageRoutingModule
  ],
  declarations: [InicioConductorPage],
  //providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite],
})
export class InicioConductorPageModule {}
