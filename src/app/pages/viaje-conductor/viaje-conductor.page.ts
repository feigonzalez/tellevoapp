import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viaje-conductor',
  templateUrl: './viaje-conductor.page.html',
  styleUrls: ['./viaje-conductor.page.scss'],
})
export class ViajeConductorPage implements OnInit {

  ruta? : any;
  viewType : string="";
  countdown :any;

  constructor(private location:Location,private router: Router, private activatedRoute: ActivatedRoute,
      private alertController: AlertController) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.viewType=this.router.getCurrentNavigation()?.extras?.state?.['viewType']
      }
    })
  }

  ngOnInit() {
    this.countdown=setTimeout(()=>this.finViaje(),5000)
  }

  cancelarViaje(){
    console.log("!:cancelarViaje()");
    //cancela el viaje. la lógica detrás de esto aún no está clara, pero es imperativo
    //que la opción exista.
    clearInterval(this.countdown);
    this.location.back()
  }

  async finViaje() {
    const alert = await this.alertController.create({
      header: 'Ha llegado a su destino',
      buttons: ['Cerrar'],
    });
    alert.addEventListener("didDismiss",()=>{
      this.location.back()
    })
    await alert.present();
  }

}
