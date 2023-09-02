import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-pasajero', // Cambia el selector a 'app-perfil-pasajero'
  templateUrl: './perfil-pasajero.page.html', // Asegúrate de tener una vista HTML correspondiente
  styleUrls: ['./perfil-pasajero.page.scss'], // Asegúrate de tener un archivo de estilos correspondiente
})
export class PerfilPasajeroPage implements OnInit {

  usuario: any = {
    nombre: "Tulio",
    apellido: "Triviño",
    informacionAdicional: "que es lo que se supone que es este campo?", // Agregado un campo adicional
    imagen: "assets/icon/user_tulio.jpg"
  }

  constructor() { }

  ngOnInit() {
  }

  actualizarDatos() {
    console.log("Actualizar datos del pasajero");
    // Implementa la lógica para actualizar los datos del pasajero
  }

  actualizarContrasena() {
    console.log("Actualizar contraseña del pasajero");
    // Implementa la lógica para actualizar la contraseña del pasajero
  }

  eliminarCuenta() {
    console.log("Eliminar cuenta del pasajero");
    // Implementa la lógica para eliminar la cuenta del pasajero
  }

  editarImagenPerfil() {
    console.log("Editar imagen de perfil del pasajero");
    // Implementa la lógica para editar la imagen de perfil del pasajero
  }
}
