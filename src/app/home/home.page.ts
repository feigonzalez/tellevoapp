import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = '';

  constructor(private navCtrl: NavController) {}

  conductor() {
    if (this.username.toLowerCase() === 'conductor') {
      // Redirect to another page (replace 'target-page' with your actual page route)
      this.navCtrl.navigateForward('/inicio-conductor');
    }
     else {
      // Handle incorrect input or show an error message
      console.log('Error en inicio de sesión.');
    }
  }
  pasajero() {
    if (this.username.toLowerCase() === 'pasajero') {
      // Redirect to another page (replace 'target-page' with your actual page route)
      this.navCtrl.navigateForward('/inicio-pasajero');
    }
     else {
      // Handle incorrect input or show an error message
      console.log('Error en inicio de sesión.');
    }
  }
}

