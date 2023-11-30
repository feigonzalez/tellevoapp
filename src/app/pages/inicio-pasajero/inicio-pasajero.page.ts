import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { WeatherService } from 'src/app/services/weather.service';
@Component({
  selector: 'app-inicio-pasajero',
  templateUrl: './inicio-pasajero.page.html',
  styleUrls: ['./inicio-pasajero.page.scss'],
})
export class InicioPasajeroPage implements OnInit {

  rutas: any = {}
  usuario: any = {}
  city: string = 'Santiago';
  weatherData: any;

  private apiKey = 'ffe31d51024efac03faf1902e771d2b4';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  imagen: string | null = null;
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarNuevaContrasena: string = '';

  constructor(private router: Router, private navCtrl:NavController, private weatherService: WeatherService, private db: BdserviceService) {
    this.usuario.imagen = null; // Inicializa la propiedad imagen en null
  }

  ngOnInit() {
    this.db.dbState().subscribe(res => {
      if (res) {
        this.db.fetchRutas().subscribe(items => {
          this.rutas = items;
        })
        this.loadUsuario();
        this.loadRutas();
      }
    })
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }
  async loadUsuario() {
    let uID = localStorage.getItem("uID");
    if (uID) this.usuario = await this.db.leerUsuarioPorID(uID);
  }

  async loadRutas() {
    this.db.leerRutas();
  }

  async verRuta(id: string) {
    console.log("!:verRutaPasajero(" + id + ")")
    let ruta = await this.db.leerRutaPorId(id);
    let ne: any = {
      state: {
        ruta: ruta,
        conductor: await this.db.leerUsuarioPorID(ruta.id_usuario),
        viewType: "view"
      }
    }
    this.router.navigate(['/ver-ruta-pasajero'], ne)
  }

  salirCuenta() {
    this.navCtrl.navigateRoot(['/login'])
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("uRole");
    localStorage.removeItem("uID");
  }
}
