import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { NavController } from '@ionic/angular';

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

  constructor(private navCtrl:NavController, private router: Router, private activatedRoute: ActivatedRoute, private db:BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.ruta = this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.viewType = this.router.getCurrentNavigation()?.extras?.state?.['viewType']
      }
    })
  }

  ngOnInit() {
    //this.db.presentAlert("Espere a que el conductor apruebe su solicitud");
  }

  async cancelarViaje() {
    console.log("!:cancelarViaje()");
    let uID=localStorage.getItem("uID")
    if(uID) await this.db.cancelarViaje(this.ruta.id_ruta,uID)
    let ne={state:{
      cancel:true
    }}
    this.db.showToast("La solicitud fue cancelada.","success");
    this.navCtrl.navigateBack('/ver-ruta-pasajero',ne);
  }
}
