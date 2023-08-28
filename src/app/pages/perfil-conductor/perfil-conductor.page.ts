import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.page.html',
  styleUrls: ['./perfil-conductor.page.scss'],
})
export class PerfilConductorPage implements OnInit {

  usuario : any={
    nombre:"Juan Carlos",
    apellido:"Bodoque",
    patente:"TP8373",
    imagen:"assets/icon/userIcon.jpg"
  }

  constructor() { }

  ngOnInit() {
  }

  actualizarDatos(){
    console.log("!:actualizarDatos()");
    //los datos del usuario se validan. de ser validos, se guardan en db.
  }

  actualizarContrasena(){
    console.log("!:actualizarContrasena()");
    //las contraseñas se validan. de ser validas, se guardan en db.
  }

  eliminarCuenta(){
    console.log("!:eliminarCuenta()");
    //se pide confirmar. de confirmar, se elimina la cuenta de la db y se redigire a inicio.
  }

  editarImagenPerfil(){
    console.log("!:editarImagenPerfil()");
    //se abrela camara o la galeria, y permite subir una imagen. si se actualizan los datos,
    //se reemplaza la imagen en la db
  }
}
