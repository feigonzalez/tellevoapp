import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BdserviceService } from '../services/bdservice.service';
import { DummyApiServiceService } from '../services/dummy-api-service.service';
import { Usuario } from '../services/usuario';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  username: string = '';
  password: string = '';
  showErrorMessage: boolean = false; // Initialize the error message variable
  errorMessage: string ="";

  usuarios : any = [];

  dummyData : any = [];

  constructor(private navCtrl: NavController, private db:BdserviceService,
      private api:DummyApiServiceService) {
    if(localStorage.getItem("loggedIn")){
      if(localStorage.getItem("uRole")=="conductor")
        this.navCtrl.navigateForward('/inicio-conductor');
      else if(localStorage.getItem("uRole")=="pasajero")
        this.navCtrl.navigateForward('/inicio-pasajero');
      else
        this.db.presentAlert("Illegal state: Bad uRole");
    }
  }

  ngOnInit(){
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchRoles().subscribe(items=>{
          this.usuarios = items;
        })
      }
    })
    this.api.getUsuarios().subscribe(r=>{
      this.dummyData = r;
      this.db.presentAlert(this.dummyData[0]["id"]+": "+this.dummyData[0]["name"]);
    })
  }

  async login(){
    if(this.username.trim()=="bdreport" && this.password.trim()=="bdreport"){
      this.navCtrl.navigateForward('/bdreport');
    }
    this.showErrorMessage = false;
    if(this.username.trim()==""){
      this.errorMessage="Ingrese su correo";
      this.showErrorMessage = true;
      return;
    } else if(this.password.trim()==""){
      this.errorMessage="Ingrese su contraseña";
      this.showErrorMessage = true;
      return;
    }
    let qName=this.username.trim().toLowerCase();
    let user:Usuario = await this.db.leerUsuarioPorCorreo(qName);
    if(user === null){
      this.errorMessage="Usuario no existe";
      this.showErrorMessage = true;
      return;
    } else {
      if(this.password.trim() == user.password){
        localStorage.setItem("loggedIn","true");
        localStorage.setItem("uID",user.id_usuario);
        if(user.id_rol == "1"){
          this.navCtrl.navigateForward('/inicio-conductor');
          localStorage.setItem("uRole","conductor");
        } else {
          this.navCtrl.navigateForward('/inicio-pasajero');
          localStorage.setItem("uRole","pasajero");
        }
      } else {
        this.errorMessage="Contraseña incorrecta";
        this.showErrorMessage = true;
      }
    }
  }
}

