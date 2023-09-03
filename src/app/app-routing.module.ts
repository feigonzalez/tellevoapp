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
  },
  {
    path: 'perfil-conductor',
    loadChildren: () => import('./pages/perfil-conductor/perfil-conductor.module').then( m => m.PerfilConductorPageModule)
  },
  {
    path: 'registrop',
    loadChildren: () => import('./pages/registrop/registrop.module').then( m => m.RegistropPageModule)
  },
  {
    path: 'registroc',
    loadChildren: () => import('./pages/registroc/registroc.module').then( m => m.RegistrocPageModule)
  },
  {
    path: 'menure',
    loadChildren: () => import('./pages/menure/menure.module').then( m => m.MenurePageModule)
  },  {
    path: 'ver-ruta',
    loadChildren: () => import('./pages/ver-ruta/ver-ruta.module').then( m => m.VerRutaPageModule)
  },
  {
    path: 'editar-ruta',
    loadChildren: () => import('./pages/editar-ruta/editar-ruta.module').then( m => m.EditarRutaPageModule)
  },
  {
    path: 'inicio-pasajero',
    loadChildren: () => import('./pages/inicio-pasajero/inicio-pasajero.module').then( m => m.InicioPasajeroPageModule)
  },
  {
    path: 'perfil-pasajero',
    loadChildren: () => import('./pages/perfil-pasajero/perfil-pasajero.module').then( m => m.PerfilPasajeroPageModule)
  },
  {
    path: 'viaje-conductor',
    loadChildren: () => import('./pages/viaje-conductor/viaje-conductor.module').then( m => m.ViajeConductorPageModule)
  },
  {
    path: 'buzon-conductor',
    loadChildren: () => import('./pages/buzon-conductor/buzon-conductor.module').then( m => m.BuzonConductorPageModule)
  },
  {
    path: 'mensaje-conductor',
    loadChildren: () => import('./pages/mensaje-conductor/mensaje-conductor.module').then( m => m.MensajeConductorPageModule)
  },
  {
    path: 'ver-ruta-pasajero',
    loadChildren: () => import('./pages/ver-ruta-pasajero/ver-ruta-pasajero.module').then( m => m.VerRutaPasajeroPageModule)
  },
  {
    path: 'buzon-pasajero',
    loadChildren: () => import('./pages/buzon-pasajero/buzon-pasajero.module').then( m => m.BuzonPasajeroPageModule)
  },
  {
    path: 'mensaje-pasajero',
    loadChildren: () => import('./pages/mensaje-pasajero/mensaje-pasajero.module').then( m => m.MensajePasajeroPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
