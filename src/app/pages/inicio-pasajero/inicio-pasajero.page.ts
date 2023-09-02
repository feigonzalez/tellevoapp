import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-pasajero',
  templateUrl: './inicio-pasajero.page.html',
  styleUrls: ['./inicio-pasajero.page.scss'],
})
export class InicioPasajeroPage implements OnInit {

  viajes: any = [
    {
      id: 1,
      nombre: "Nombre del viaje",
      distancia: 13.7,
      duracion: 18,
      tarifa: 3000,
      horaSalida: "18:30"
    },
    {
      id: 2,
      nombre: "Viaje 2",
      distancia: 16.3,
      duracion: 21,
      tarifa: 4000,
      horaSalida: "14:00"
    }
  ]

  usuario: any = {
    nombre: "Juan Carlos",
    apellido: "Bodoque",
    patente: "TP8373",
    imagen: "assets/icon/userIcon.jpg"
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  solicitarViaje() {
    console.log("Solicitar Viaje");
    // Aquí puedes agregar la lógica para solicitar un viaje
  }

  getViajeFromId(id: number) {
    let res: any = null;
    this.viajes.forEach((v: any) => {
      if (v.id == id) res = v;
    })
    return res;
  }

  verViaje(id: number) {
    console.log("Ver Viaje(" + id + ")");
    let ne: any = {
      state: {
        viaje: this.getViajeFromId(id),
        viewType: "view"
      }
    }
    this.router.navigate(['/ver-viaje'], ne); // Asegúrate de tener una ruta 'ver-viaje'
  }

}
