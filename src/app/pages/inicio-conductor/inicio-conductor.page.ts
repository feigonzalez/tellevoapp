import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-conductor',
  templateUrl: './inicio-conductor.page.html',
  styleUrls: ['./inicio-conductor.page.scss'],
})
export class InicioConductorPage implements OnInit {

  rutas : any = [
    {id:1,
     nombre:"Nombre de la ruta",
     longitud:13.7,
     duracion:18},
    {id:2,
     nombre:"Ruta 2",
     longitud:16.3,
     duracion:21},
  ]

  usuario : any={
    nombre:"Juan Carlos",
    apellido:"Bodoque",
    imagen:"assets/icon/userIcon.jpg"
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  crearRuta(){
    console.log("!:crearRuta()")
    //se crea una ruta nueva, y se redirige a la interfaz "editar-ruta"
  }

  editarRuta(id:number){
    console.log("!:editarRuta("+id+")")
    //redirige a "editar-ruta" para editar la ruta correspondiente a "id"
  }

  editarPerfil(id:number){
    console.log("!:editarPerfil("+id+")")
    //redirige a "editar-ruta" para editar la ruta correspondiente a "id"
  }

}
