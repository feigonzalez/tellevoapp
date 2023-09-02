import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buzon-conductor',
  templateUrl: './buzon-conductor.page.html',
  styleUrls: ['./buzon-conductor.page.scss'],
})
export class BuzonConductorPage implements OnInit {

  chats:any=[{
    id:0,
    uname:"Patana Trufillo",
    mensajes:[[1,"oye tio, donde estás?"],
      [0,"Estoy en el estacionamiento del canal"],
      [1,"ah ya, voy para allá"]],
    lastMsg:"ah ya, voy para allá",
    uIcon:"assets/icon/user_patana.jpg"
  },{
    id:1,
    uname:"Tulio Triviño",
    mensajes:[[1,"Juan Carlos, necesito que vayas a dejarme"],
      [0,"Pero Tulio, ¿qué le pasó a tu auto?"],
      [1,"Un idiota me chocó ayer saliendo del canal"],
      [1,"Tenía un auto igual al tuyo"],
      [0,"Ah, así que eras tú."],
      [1,"¿Qué significa eso?"],
      [0,"Eh... Nada, Tulio."],
      [0,"Lo siento, pero no te voy a poder llevar."]],
    lastMsg:"Lo siento, pero no te voy a poder llevar.",
    uIcon:"assets/icon/user_tulio.jpg"
  }]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  abrirMensajes(id:number){
    let ne:any={state:{
      chat:this.chats[id]
    }}
    this.router.navigate(["/mensaje-conductor"],ne);
  }
}
