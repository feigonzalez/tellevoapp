import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-inicio-pasajero',
  templateUrl: './inicio-pasajero.page.html',
  styleUrls: ['./inicio-pasajero.page.scss'],
})
export class InicioPasajeroPage implements OnInit {

  /*rutas : any = [
    {
      id: 1,
        nombre: "Viaje 1",
        distancia: 13.7,
        duracion: 18,
        tarifa: 3000,
        horaSalida: "18:30"
      },
      {
        id: 2,
        nombre: "Viaje 2",
        distancia: 16.3,
        duracion: 21,
        tarifa: 4000,
        horaSalida: "14:00"
      }
    ]
    */

    rutas: any = {}
    usuario: any = {}

  constructor(private router: Router, private db:BdserviceService) {}

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.loadUsuario();
        this.loadRutas();
      }
    })
  }

  async loadUsuario(){
    let uID=localStorage.getItem("uID");
    if(uID) this.usuario=await this.db.leerUsuarioPorID(uID);
  }

  async loadRutas(){
    this.rutas=await this.db.leerRutas();
  }

  getRutaFromId(id:number){
    let res:any=null;
    this.rutas.forEach((r:any)=>{
      if(r.id==id) res = r;
    })
    return res;
  }

  verRuta(id:number){
    console.log("!:verRutaPasajero("+id+")")
    let ne:any={state:{
      ruta:this.getRutaFromId(id),
      viewType:"view"
    }}
    this.router.navigate(['/ver-ruta-pasajero'],ne)
  }

  salirCuenta(){
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("uRole")
    localStorage.removeItem("uID")
    this.router.navigate(['/'])
  }
}
