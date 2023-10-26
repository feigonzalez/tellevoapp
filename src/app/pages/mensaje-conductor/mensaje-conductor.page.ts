import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-mensaje-conductor',
  templateUrl: './mensaje-conductor.page.html',
  styleUrls: ['./mensaje-conductor.page.scss'],
})
export class MensajeConductorPage implements OnInit {
  id_pareja: any;
  chat: any = [];
  @Input() mensajeInput: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private db: BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id_pareja = this.router.getCurrentNavigation()?.extras?.state?.['id_pareja'];
      }
    });
  }

  ngOnInit() {
    this.db.dbState().subscribe(res => {
      if (res) {
        this.loadChat();
        this.db.fetchMensajes().subscribe(items => {
          this.chat = items;
          for (let m of this.chat) {
            if (m.id_remitente == localStorage.getItem("uID")) m.sent = true;
          }
        });
      }
    });
  }

  loadChat() {
    let uID = localStorage.getItem("uID");
    if (uID) this.chat = this.db.leerConversacion(uID, this.id_pareja);
  }

  enviarMensaje() {
    if (this.mensajeInput.trim() === "") return;

    // Almacena el mensaje en la base de datos
    this.db.crearMensaje(
      Number(localStorage.getItem("uID")), // ID del remitente (usuario actual)
      this.id_pareja, // ID del destinatario (pareja)
      this.mensajeInput // Texto del mensaje
    ).then(() => {
      // Obtener la hora actual en el huso horario de Chile
      const now = DateTime.now().setZone('America/Santiago');
      const formattedTime = now.toFormat('hh:mm a');

      // Crear el elemento del mensaje con la hora en paréntesis y espacio
      const nuevoRow = document.createElement("ion-row");
      nuevoRow.classList.add("ion-align-items-center");
      let nuevoCol = document.createElement("ion-col");
      nuevoCol.classList.add("enviado");
      nuevoCol.setAttribute("size", "12");
      nuevoCol.style.textAlign = "right";
      let nuevoSpan = document.createElement("span");
      nuevoSpan.classList.add("mensaje");
      nuevoSpan.style.display = "inline-block";
      nuevoSpan.style.borderRadius = "15px";
      nuevoSpan.style.padding = "0.75rem";
      nuevoSpan.style.color = "#222";
      nuevoSpan.style.backgroundColor = "#eee";
      nuevoSpan.style.borderBottomRightRadius = "0";

      // Crear un elemento para la hora con paréntesis
      const horaSpan = document.createElement("span");
      horaSpan.innerText = `(${formattedTime})`;
      horaSpan.style.fontSize = "10px"; // Tamaño de fuente más pequeño para la hora
      horaSpan.style.color = "#777"; // Color de la hora

      // Agregar la hora al nuevoSpan
      nuevoSpan.appendChild(horaSpan);

      // Agregar un espacio
      nuevoSpan.appendChild(document.createTextNode(" "));

      // Agregar el mensaje al nuevoSpan
      nuevoSpan.appendChild(document.createTextNode(this.mensajeInput));

      nuevoCol.appendChild(nuevoSpan);
      nuevoRow.appendChild(nuevoCol);
      document.getElementById("mensajesContainer")?.appendChild(nuevoRow);
      nuevoRow.scrollIntoView();
      this.mensajeInput = "";

      // Recarga los mensajes después de enviar uno
      this.loadChat();
    }).catch((error) => {
      console.error("Error al almacenar el mensaje: " + error.message);
    });
  }
}
