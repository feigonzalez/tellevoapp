import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Viaje } from 'src/app/services/viaje';

@Component({
  selector: 'app-administrar-viaje',
  templateUrl: './administrar-viaje.page.html',
  styleUrls: ['./administrar-viaje.page.scss'],
})
export class AdministrarViajePage implements OnInit {

  viajes:any;
  /*viajes=[
    {id_viaje:"1",
    estado:"prueba",
    id_pasajero:"0",
    pasajero:{
      imagen:"",
      nombre:"pasPruea"
    }}
  ]*/
  ruta?:any;
  vehiculo?:any;
  asResv=0;
  asDisp=0;

  constructor(private db:BdserviceService, private activatedRoute:ActivatedRoute, private router:Router) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras.state?.['ruta']
      }
    })
  }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchViajes().subscribe(items=>{
          this.viajes=items;
        })
        this.loadVehiculo();
        this.loadViajes();
      }
    })
  }

  async loadVehiculo(){
    let uID=localStorage.getItem("uID");
    if(uID){
      this.vehiculo=await this.db.leerVehiculoPorUsuario(uID);
      this.asDisp=this.vehiculo.n_asientos;
    }
  }

  async loadViajes(){
    if(this.ruta){
      this.asResv = await this.db.contarViajesPorRutaYEstado(this.ruta.id_ruta,"aceptado")
      await this.db.leerViajesPorRutaYEstado(this.ruta.id_ruta,"solicitado");
      for(let v of this.viajes){
        v.pasajero=await this.db.leerUsuarioPorID(v.id_pasajero)
      }
    }
  }

  aceptarPasaje(v:Viaje){
    if(this.asResv==this.asDisp){
      this.db.showToast("Cantidad máxima de solicitudes alcanzada","danger")
    } else {
      this.db.actualizarViaje(v.id_viaje, v.tarifa, v.fecha, "aceptado", v.id_ruta, v.id_pasajero)
      this.loadViajes();
    }
  }

  rechazarPasaje(v:Viaje){
    this.db.actualizarViaje(v.id_viaje, v.tarifa, v.fecha, "rechazado", v.id_ruta, v.id_pasajero)
    this.loadViajes();
  }

  comenzarViaje(){

  }

}
