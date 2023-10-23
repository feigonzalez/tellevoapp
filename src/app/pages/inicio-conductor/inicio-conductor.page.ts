import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-inicio-conductor',
  templateUrl: './inicio-conductor.page.html',
  styleUrls: ['./inicio-conductor.page.scss'],
})
export class InicioConductorPage implements OnInit {

  rutas : any={}
  usuario : any={}

  constructor(private router: Router, private db:BdserviceService) { }

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
    let uID=localStorage.getItem("uID");
    if(uID) this.db.leerRutasPorUsuario(uID);
  }

  crearRuta(){
    console.log("!:crearRuta()")
    //se crea una ruta nueva, y se redirige a la interfaz "editar-ruta"
    let ne:any={state:{
      ruta:{
         id:-1,
         nombre:"Nueva Ruta",
         longitud:0,
         duracion:0,
         tarifa:0,
         horaSalida:"00:00"},
      viewType:"new"
      }
    }
    this.router.navigate(['/ver-ruta'],ne)
  }

  async verRuta(id:string){
    console.log("!:verRuta("+id+")")
    let ne:any={state:{
      ruta:await this.db.leerRutaPorId(id),
      viewType:"view"
    }}
    this.router.navigate(['/ver-ruta'],ne)
  }

  salirCuenta(){
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("uRole")
    localStorage.removeItem("uID")
    this.router.navigate(['/'])
  }
}
