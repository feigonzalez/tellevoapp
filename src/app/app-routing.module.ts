import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio-conductor',
    loadChildren: () => import('./pages/inicio-conductor/inicio-conductor.module').then( m => m.InicioConductorPageModule)
  },  {
    path: 'registrop',
    loadChildren: () => import('./pages/registrop/registrop.module').then( m => m.RegistropPageModule)
  },
  {
    path: 'registroc',
    loadChildren: () => import('./pages/registroc/registroc.module').then( m => m.RegistrocPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
