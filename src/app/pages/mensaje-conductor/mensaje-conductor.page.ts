import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-mensaje-conductor',
  templateUrl: './mensaje-conductor.page.html',
  styleUrls: ['./mensaje-conductor.page.scss'],
})
export class MensajeConductorPage implements OnInit {

  id_pareja:any;
  chat:any=[];
  @Input() mensajeInput:string="";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private db:BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id_pareja=this.router.getCurrentNavigation()?.extras?.state?.['id_pareja']
      }
    })
  }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.loadChat();
        this.db.fetchMensajes().subscribe(items=>{
          this.chat = items;
          for(let m of this.chat){
            if(m.id_remitente==localStorage.getItem("uID")) m.sent=true;
          }
/*
Cada mensaje en la lista "chat" tiene los siguientes atributos
  id_mensaje; id_remitente; id_destinatario; fecha; texto.
Luego, se le añade un atributo "sent", que es "true" si el usuario actual envió el mensaje
*/
        })
      }
    })
  }

  loadChat(){
    let uID=localStorage.getItem("uID");
    if(uID) this.chat = this.db.leerConversacion(uID,this.id_pareja);
  }

  enviarMensaje(){
    console.log("!:enviarMensaje()");
    if(this.mensajeInput.trim()=="") return;
    let nuevoRow = document.createElement("ion-row");
    nuevoRow.classList.add("ion-align-items-center")
    let nuevoCol = document.createElement("ion-col");
    nuevoCol.classList.add("enviado");
    nuevoCol.setAttribute("size","12");
    nuevoCol.style.textAlign="right";
    let nuevoSpan = document.createElement("span");
    nuevoSpan.innerText=this.mensajeInput;
    nuevoSpan.classList.add("mensaje");
    nuevoSpan.style.display="inline-block";
    nuevoSpan.style.borderRadius="15px";
    nuevoSpan.style.padding="0.75rem";
    nuevoSpan.style.color="#222";
    nuevoSpan.style.backgroundColor="#eee";
    nuevoSpan.style.borderBottomRightRadius="0";
    nuevoCol.appendChild(nuevoSpan);
    nuevoRow.appendChild(nuevoCol);
    document.getElementById("mensajesContainer")?.appendChild(nuevoRow);
    nuevoRow.scrollIntoView();
    this.mensajeInput="";
  }

}
