import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BdserviceService } from '../services/bdservice.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private navCtrl:NavController, private db:BdserviceService) {
  }

  ngOnInit(){
    if(localStorage.getItem("loggedIn")){
      if(localStorage.getItem("uRole")=="conductor")
        this.navCtrl.navigateRoot('/inicio-conductor');
      else if(localStorage.getItem("uRole")=="pasajero")
        this.navCtrl.navigateRoot('/inicio-pasajero');
      else
        this.db.presentAlert("Illegal state: Bad uRole");
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }
}

