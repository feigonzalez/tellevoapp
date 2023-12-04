import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  showErrorMessage: boolean = false; // Initialize the error message variable
  errorMessage: string ="";

  usuarios : any = [];

  constructor(private db:BdserviceService, private navCtrl:NavController) { }

  ngOnInit() {
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchRoles().subscribe(items=>{
          this.usuarios = items;
        })
      }
    })
  }

  async login(){
    if(this.username.trim()=="bdreport" && this.password.trim()=="bdreport"){
      this.navCtrl.navigateForward('/bdreport');
      return;
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
          this.navCtrl.navigateRoot('/inicio-conductor');
          localStorage.setItem("uRole","conductor");
        } else {
          this.navCtrl.navigateRoot('/inicio-pasajero');
          localStorage.setItem("uRole","pasajero");
        }
      } else {
        this.errorMessage="Contraseña incorrecta";
        this.showErrorMessage = true;
      }
    }
  }

}
