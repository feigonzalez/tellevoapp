import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/usuario';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.page.html',
  styleUrls: ['./perfil-conductor.page.scss'],
})
export class PerfilConductorPage implements OnInit {
  city: string = 'Santiago';
  weatherData: any;
  private apiKey = 'ffe31d51024efac03faf1902e771d2b4';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  usuario: any = {};
  vehiculo: any = {};
  imagen: string | null = null;
  passActual: string = '';
  passNueva: string = '';
  passNuevaConfirm: string = '';

  formErrors:any = {};

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private db: BdserviceService,
    private weatherService: WeatherService,
    // No necesitas HttpClient aquí ya que está en el servicio WeatherService
  ) {
    this.usuario.imagen = null; // Inicializa la propiedad imagen en null
  }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.loadUsuarioYVehiculo();
      }
    });
  } 

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }

  async loadUsuarioYVehiculo() {
    let uID = localStorage.getItem("uID");
    if (uID){
      this.usuario = await this.db.leerUsuarioPorID(uID);
      this.vehiculo = await this.db.leerVehiculoPorUsuario(uID);
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      correo: [''],
      numero_cel: [''],
      telefono: [''],
      patente: [''],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.usuario.imagen = URL.createObjectURL(file); // Almacena la ruta de la imagen en el usuario
    }
  }

  validarNombre(){
    let valid=true;
    this.formErrors["nombre_empty"]=false;
    this.formErrors["nombre_short"]=false;
    if(this.usuario.nombre===null || this.usuario.nombre.trim()==""){
      this.formErrors["has_empty_fields"]=true;
      this.formErrors["nombre_empty"]=true; valid=false;}
    else if(this.usuario.nombre.length<3){
      this.formErrors["nombre_short"]=true; valid=false;}
    return valid;
  }

  validarTelefono(){
    let valid=true;
    this.formErrors["telefono_empty"]=false;
    this.formErrors["telefono_invalid"]=false;
    if(this.usuario.numero_cel===null || this.usuario.numero_cel.trim()==""){
      this.formErrors["has_empty_fields"]=true;
      this.formErrors["telefono_empty"]=true; valid=false;
    } else if(!this.usuario.numero_cel.match(/^\+?\d{8,}$/)){
        this.formErrors["telefono_invalid"]=true;
    }
    return valid;
  }

  validarPassActual(){
    let valid=true;
    this.formErrors["passMain_empty"]=false;
    this.formErrors["passMain_wrong"]=false;
    if(this.passActual === null || this.passActual.trim() == ""){
      this.formErrors["passMain_empty"]=true;valid=false}
    return valid;
  }

  validarPassActualCorrecta(){
    let valid=true;
    this.formErrors["passMain_wrong"]=false;
    if(this.usuario.password != this.passActual){
      this.formErrors["passMain_wrong"]=true; valid=false;}
    return valid;
  }

  validarPassNueva(){
    let valid=true;
    this.formErrors["password_empty"]=false;
    this.formErrors["password_short"]=false;
    this.formErrors["password_needUppercase"]=false;
    this.formErrors["password_needLowercase"]=false;
    this.formErrors["password_needNumber"]=false;
    this.formErrors["password_needSpecial"]=false;
    if(this.passNueva===null || this.passNueva.trim()==""){
      this.formErrors["has_empty_fields"]=true;
      this.formErrors["password_empty"]=true; valid=false;}
    else{
      if(this.passNueva.length<6){
        this.formErrors["password_short"]=true; valid=false;}
      if(!this.passNueva.match(/.*[A-Z].*/)){
        this.formErrors["password_needUppercase"]=true; valid=false;}
      if(!this.passNueva.match(/.*[a-z].*/)){
        this.formErrors["password_needLowercase"]=true; valid=false;}
      if(!this.passNueva.match(/.*\d.*/)){
        this.formErrors["password_needNumber"]=true; valid=false;}
      if(!this.passNueva.match(/.*[!$%&?@*].*/)){
        this.formErrors["password_needSpecial"]=true; valid=false;}
    }
    return valid;
  }

  validarPassConfirm(){
    let valid=true;
    this.formErrors["pass2_empty"]=false;
    this.formErrors["pass2_noMatch"]=false;
    if(this.passNuevaConfirm===null || this.passNuevaConfirm.trim()==""){
      this.formErrors["has_empty_fields"]=true;
      this.formErrors["pass2_empty"]=true; valid=false;}
    else if(this.passNuevaConfirm!=this.passNueva){
      this.formErrors["pass2_noMatch"]=true; valid=false;}
    return valid;
  }

  validarPatente(){
    let valid=true;
    this.formErrors["patente_empty"]=false;
    this.formErrors["patente_invalid"]=false;
    if(this.vehiculo.patente === null || this.vehiculo.patente.trim()==""){
      this.formErrors["has_empty_fields"]=true;
      this.formErrors["patente_empty"]=true; valid=false;}
    else if(!this.vehiculo.patente.toUpperCase().match(/[A-Z]{2}[0-9]{4}|[BCDFGHJKLMNPRSTWXYZ]{4}[0-9]{2}/) || this.vehiculo.patente.length!=6){
      this.formErrors["patente_invalid"]=true; valid=false;}
    return valid;
  }

  validarColor(){
    let valid=true;
    this.formErrors["color_empty"]=false;
    if(this.vehiculo.color === null || this.vehiculo.color.trim()==""){
      this.formErrors["has_empty_fields"]=true;
      this.formErrors["color_empty"]=true; valid=false;}
    return valid;
  }

  validarAsientos(){
    let valid=true;
    this.formErrors["asientos_empty"]=false;
    this.formErrors["asientos_low"]=false;
    if(this.vehiculo.n_asientos=== null || this.vehiculo.n_asientos === undefined){
      this.formErrors["has_empty_fields"]=true;
      this.formErrors["asientos_empty"]=true; valid=false;}
    else if(this.vehiculo.n_asientos<1){
      this.formErrors["asientos_low"]=true; valid=false;}
    return valid;
  }

  actualizarDatos(){
    this.formErrors={};
    let valid:boolean=true
    valid=this.validarNombre()&&valid;
    valid=this.validarTelefono()&&valid;
    if(valid){
      this.db.actualizarUsuarioDatos(this.usuario.id_usuario,this.usuario.nombre,this.usuario.numero_cel,this.usuario.imagen);
      this.db.showToast("Datos actualizados","success");
      this.navCtrl.navigateBack('/inicio-conductor',{state:{"updateUser":true}});
    }
  }

  actualizarPass(){
    this.formErrors={};
    let valid:boolean=true
    valid=this.validarPassActual()&&valid;
    valid=this.validarPassActualCorrecta()&&valid;
    valid=this.validarPassNueva()&&valid;
    valid=this.validarPassConfirm()&&valid;
    if(valid){
      this.db.actualizarUsuarioPass(this.usuario.id_usuario,this.passNueva);
      this.db.showToast("Contraseña actualizada","success");
      this.navCtrl.navigateBack('/inicio-conductor');
    }
  }

  actualizarVehiculo(){
    this.formErrors={};
    let valid:boolean=true
    valid=this.validarPatente()&&valid;
    valid=this.validarColor()&&valid;
    valid=this.validarAsientos()&&valid;
    if(valid){
      this.db.actualizarVehiculo(this.vehiculo.id_vehiculo,this.vehiculo.patente,this.vehiculo.color,this.vehiculo.n_asientos,this.usuario.id_usuario);
      this.db.showToast("Vehículo actualizado","success");
      this.navCtrl.navigateBack('/inicio-conductor');
    }
  }
}
