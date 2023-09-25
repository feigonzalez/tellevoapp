import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-buzon-pasajero',
  templateUrl: './buzon-pasajero.page.html',
  styleUrls: ['./buzon-pasajero.page.scss'],
})
export class BuzonPasajeroPage implements OnInit {

  chats:any=[{
    pairCode:-1,
    texto:'',
    id_pareja:-1,
    nom_pareja:'',
    img_pareja:''
  }];

  constructor(private router: Router, private db:BdserviceService) {
  }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.loadChats();
      }
    })
  }

  async loadChats(){
    let uID = localStorage.getItem("uID");
    if(uID){
      this.chats = await this.db.leerConversacionesPorUsuario(uID);
    }
  }

  abrirMensajes(id:number){
    let ne:any={state:{
      id_pareja:id
    }}
    this.router.navigate(["/mensaje-pasajero"],ne);
  }
}
