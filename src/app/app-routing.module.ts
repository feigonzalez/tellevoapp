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
    path: 'buzon-conductor',
    loadChildren: () => import('./pages/buzon-conductor/buzon-conductor.module').then( m => m.BuzonConductorPageModule)
  },
  {
    path: 'buzon-pasajero',
    loadChildren: () => import('./pages/buzon-pasajero/buzon-pasajero.module').then( m => m.BuzonPasajeroPageModule)
  },
  {
    path: 'editar-ruta',
    loadChildren: () => import('./pages/editar-ruta/editar-ruta.module').then( m => m.EditarRutaPageModule)
  },
  {
    path: 'inicio-conductor',
    loadChildren: () => import('./pages/inicio-conductor/inicio-conductor.module').then( m => m.InicioConductorPageModule)
  },
  {
    path: 'inicio-pasajero',
    loadChildren: () => import('./pages/inicio-pasajero/inicio-pasajero.module').then( m => m.InicioPasajeroPageModule)
  },
  {
    path: 'mensaje-conductor',
    loadChildren: () => import('./pages/mensaje-conductor/mensaje-conductor.module').then( m => m.MensajeConductorPageModule)
  },
  {
    path: 'mensaje-pasajero',
    loadChildren: () => import('./pages/mensaje-pasajero/mensaje-pasajero.module').then( m => m.MensajePasajeroPageModule)
  },
  {
    path: 'menure',
    loadChildren: () => import('./pages/menure/menure.module').then( m => m.MenurePageModule)
  },
  {
    path: 'perfil-conductor',
    loadChildren: () => import('./pages/perfil-conductor/perfil-conductor.module').then( m => m.PerfilConductorPageModule)
  },
  {
    path: 'perfil-pasajero',
    loadChildren: () => import('./pages/perfil-pasajero/perfil-pasajero.module').then( m => m.PerfilPasajeroPageModule)
  },
  {
    path: 'registroc',
    loadChildren: () => import('./pages/registroc/registroc.module').then( m => m.RegistrocPageModule)
  },
  {
    path: 'registrop',
    loadChildren: () => import('./pages/registrop/registrop.module').then( m => m.RegistropPageModule)
  },
  {
    path: 'ver-ruta',
    loadChildren: () => import('./pages/ver-ruta/ver-ruta.module').then( m => m.VerRutaPageModule)
  },
  {
    path: 'ver-ruta-pasajero',
    loadChildren: () => import('./pages/ver-ruta-pasajero/ver-ruta-pasajero.module').then( m => m.VerRutaPasajeroPageModule)
  },
  {
    path: 'viaje-conductor',
    loadChildren: () => import('./pages/viaje-conductor/viaje-conductor.module').then( m => m.ViajeConductorPageModule)
  },
  {
    path: 'viaje-pasajero',
    loadChildren: () => import('./pages/viaje-pasajero/viaje-pasajero.module').then( m => m.ViajePasajeroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
