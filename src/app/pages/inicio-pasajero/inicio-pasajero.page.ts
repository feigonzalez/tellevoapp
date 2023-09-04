import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-inicio-pasajero',
  templateUrl: './inicio-pasajero.page.html',
  styleUrls: ['./inicio-pasajero.page.scss'],
})
export class InicioPasajeroPage implements OnInit {
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement>;
  private animation: Animation;

  viajes: any = [
    {
      id: 1,
      nombre: "Viaje 1",
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
    nombre: "Tulio",
    apellido: "Triviño",
    imagen: "assets/icon/user_tulio.jpg"
  }

  constructor(private router: Router,private animationCtrl: AnimationController)  {

  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
  }
  play() {
    this.animation.play();
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
    //la página "ver-viaje" no existe. cuando se cree, descomentar esta línea
    //this.router.navigate(['/ver-viaje'], ne); // Asegúrate de tener una ruta 'ver-viaje'
  }

  salirCuenta(){
    console.log("!:salirCuenta()");
    //salir de la cuenta. borrar la sesión y todo eso
    this.router.navigate(['/'])
  }
}

