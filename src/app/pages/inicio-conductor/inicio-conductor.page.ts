import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-inicio-conductor',
  templateUrl: './inicio-conductor.page.html',
  styleUrls: ['./inicio-conductor.page.scss'],
})
export class InicioConductorPage implements OnInit {

/*  rutas : any = [
    {id:1,
     nombre:"Nombre de la ruta",
     longitud:13.7,
     duracion:18,
     tarifa:3000,
     horaSalida:"18:30"},
    {id:2,
     nombre:"Ruta 2",
     longitud:16.3,
     duracion:21,
     tarifa:4000,
     horaSalida:"14:00"},
  ]
*/

  rutas : any={}
  usuario : any={}

  constructor(private router: Router, private db:BdserviceService) { }

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
    let uID=localStorage.getItem("uID");
    if(uID) this.rutas=await this.db.leerRutasPorUsuario(uID);
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

  getRutaFromId(id:number){
    let res:any=null;
    this.rutas.forEach((r:any)=>{
      if(r.id==id) res = r;
    })
    return res;
  }

  verRuta(id:number){
    console.log("!:verRuta("+id+")")
    let ne:any={state:{
      ruta:this.getRutaFromId(id),
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
