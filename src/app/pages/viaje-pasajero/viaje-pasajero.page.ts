import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Viaje } from 'src/app/services/viaje';

@Component({
  selector: 'app-viaje-pasajero',
  templateUrl: './viaje-pasajero.page.html',
  styleUrls: ['./viaje-pasajero.page.scss'],
})
export class ViajePasajeroPage implements OnInit {

  ruta? : any;
  viewType : string="";
  countdown : any;
  viaje:any;

  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute,
      private alertController: AlertController) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.ruta = this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.viewType = this.router.getCurrentNavigation()?.extras?.state?.['viewType']
      }
    })
  }

  ngOnInit() {
    this.countdown = setTimeout(() => {
      this.finViaje();
    }, 0);
  }

  cancelarViaje() {
    console.log("CancelarViaje()");
    // Cancela el viaje. La lógica detrás de esto aún no está clara, pero es imperativo
    // que la opción exista.
    clearInterval(this.countdown);
    this.location.back();
  }

  async finViaje() {
    const alert = await this.alertController.create({
      header: 'El viaje esta comenzando.',
    
    });

    await alert.present();

    // Cierra la alerta automáticamente después de 5 segundos
    setTimeout(() => {
      alert.dismiss();
    
    }, 5000);
  }
}
