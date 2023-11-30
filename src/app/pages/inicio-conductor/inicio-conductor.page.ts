import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-inicio-conductor',
  templateUrl: './inicio-conductor.page.html',
  styleUrls: ['./inicio-conductor.page.scss'],
})
export class InicioConductorPage implements OnInit {
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
constructor(private router: Router, private navCtrl:NavController, private activatedRoute: ActivatedRoute, private weatherService: WeatherService, private db:BdserviceService) {
    this.usuario.imagen = null; // Inicializa la propiedad imagen en null
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        if(this.router.getCurrentNavigation()?.extras.state?.['updateUser']){
          this.loadUsuario();
        }
      }
    })
}

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchRutas().subscribe(items=>{
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
  async loadUsuario(){
    let uID=localStorage.getItem("uID");
    if(uID) this.usuario=await this.db.leerUsuarioPorID(uID);
  }

  async loadRutas(){
    let uID=localStorage.getItem("uID");
    if(uID) this.db.leerRutasPorUsuario(uID);
  }

  crearRuta(){
    console.log("!:crearRuta()")
    //se crea una ruta nueva, y se redirige a la interfaz "editar-ruta"
    let ne:any={state:{
      ruta:{
         id_ruta:-1,
         origen:"",
         destino:"",
         tarifa:0,
         hora_salida:"00:00",
         id_usuario:localStorage.getItem("uID")
        },
      viewType:"new"
      }
    }
    this.router.navigate(['/editar-ruta'],ne)
  }

  async verRuta(id:string){
    console.log("!:verRuta("+id+")")
    let ne:any={state:{
      ruta:await this.db.leerRutaPorId(id),
      viewType:"view"
    }}
    this.router.navigate(['/ver-ruta'],ne)
  }

  salirCuenta(){
    this.navCtrl.navigateRoot(['/login'])
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("uRole")
    localStorage.removeItem("uID")
  }
}
