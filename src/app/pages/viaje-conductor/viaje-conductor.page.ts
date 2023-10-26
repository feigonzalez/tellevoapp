import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-viaje-conductor',
  templateUrl: './viaje-conductor.page.html',
  styleUrls: ['./viaje-conductor.page.scss'],
})
export class ViajeConductorPage implements OnInit {

  viajes:any;
  ruta? : any;
  viewType : string="";
  countdown :any;

  constructor(private location:Location,private router: Router, private activatedRoute: ActivatedRoute,
      private alertController: AlertController, private db:BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.viewType=this.router.getCurrentNavigation()?.extras?.state?.['viewType']
      }
    })
  }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchViajes().subscribe(items=>{
          this.viajes=items;
        })
      }
    })
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
    if(this.ruta){
      this.db.actualizarViajesPorTermino(this.ruta.id_ruta)
    }
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
