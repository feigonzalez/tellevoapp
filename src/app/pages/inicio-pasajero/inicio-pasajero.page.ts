import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-inicio-pasajero',
  templateUrl: './inicio-pasajero.page.html',
  styleUrls: ['./inicio-pasajero.page.scss'],
})
export class InicioPasajeroPage implements OnInit {

    rutas: any = {}
    usuario: any = {}

  constructor(private router: Router, private db:BdserviceService) {}

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchRutas().subscribe(items=>{
          this.rutas = items;
        })
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
    this.db.leerRutas();
  }

  async verRuta(id:string){
    console.log("!:verRutaPasajero("+id+")")
    let ruta=await this.db.leerRutaPorId(id);
    let ne:any={state:{
      ruta:ruta,
      conductor:await this.db.leerUsuarioPorID(ruta.id_usuario),
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
