import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mensaje-conductor',
  templateUrl: './mensaje-conductor.page.html',
  styleUrls: ['./mensaje-conductor.page.scss'],
})
export class MensajeConductorPage implements OnInit {

  chat:any;
  @Input() mensajeInput:string="";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.chat=this.router.getCurrentNavigation()?.extras?.state?.['chat']
        console.log(this.chat)
      }
    })
  }

  ngOnInit() {
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
