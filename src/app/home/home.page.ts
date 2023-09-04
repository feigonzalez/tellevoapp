import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = '';
  password: string = '';
  showErrorMessage: boolean = false; // Initialize the error message variable


  constructor(private navCtrl: NavController) {}

  conductor() {
    // Definimos el usuario y contraseña correcta
    const correctUsername = 'conductor';
    const correctPassword = '123';
    
    

    if (this.username.toLowerCase() === correctUsername && this.password === correctPassword) {
      // Redirección correcta en caso de inputs correctos wajajajaj
      this.navCtrl.navigateForward('/inicio-conductor');
    } else {
      // Mensaje incorrecto
      this.showErrorMessage = true;

    }
  }

  pasajero() {
    // Definimos el usuario y contraseña correcta
    const correctUsername = 'pasajero';
    const correctPassword = '123';

    if (this.username.toLowerCase() === correctUsername && this.password === correctPassword) {
      // Redirección correcta en caso de inputs correctos wajajajaj
      this.navCtrl.navigateForward('/inicio-pasajero');
    } else {
      // Mensaje incorrecto
      this.showErrorMessage = true;

    }
  }



}

