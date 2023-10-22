import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-bdreport',
  templateUrl: './bdreport.page.html',
  styleUrls: ['./bdreport.page.scss'],
})
export class BdreportPage implements OnInit {

  roles : any = [];
  usuarios : any = [];
  vehiculos: any = [];
  rutas : any = [];
  viajes : any = [];
  calificaciones : any = [];
  mensajes : any = [];

  constructor(private db:BdserviceService) { }

  ngOnInit(){
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchRoles().subscribe(items=>{this.roles = items;})
        this.db.fetchUsuarios().subscribe(items=>{this.usuarios = items;})
        this.db.fetchVehiculos().subscribe(items=>{this.vehiculos = items;})
        this.db.fetchRutas().subscribe(items=>{this.rutas = items;})
        this.db.fetchViajes().subscribe(items=>{this.viajes = items;})
        this.db.fetchCalificaciones().subscribe(items=>{this.calificaciones = items;})
        this.db.fetchMensajes().subscribe(items=>{this.mensajes = items;})
      }
    })
    this.db.leerRoles();
    this.db.leerUsuarios();
    this.db.leerVehiculos();
    this.db.leerRutas();
    this.db.leerViajes();
    this.db.leerCalificaciones();
    this.db.leerMensajes();
  }

}
