import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buzon-pasajero',
  templateUrl: './buzon-pasajero.page.html',
  styleUrls: ['./buzon-pasajero.page.scss'],
})
export class BuzonPasajeroPage implements OnInit {

  chats:any=[{
    id:0,
    uname:"Juan Carlos bodoque.  ",
    mensajes:[[1,"Me llevas a mi casa?"],
      [0,"Hoy no , tengo que llevar mi auto al taller."],
      [1,"Ok , no hay problema."]],
    lastMsg:"Ok , no hay problema.",
    uIcon:"assets/icon/user_bodoque.jpg"
  },{
    id:1,
    uname:"Freddy Turbina.",
    mensajes:[[1,"Freddy , necesito que vayas a dejarme."],
     [0,"Por supuesto , donde te estas?"],
      [1,"En la entrada principal."]],
    lastMsg:"En la entrada principal.",
    uIcon:"assets/icon/user_freddy.jpg"
  }]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  abrirMensajes(id:number){
    let ne:any={state:{
      chat:this.chats[id]
    }}
    this.router.navigate(["/mensaje-pasajero"],ne);
  }
}
