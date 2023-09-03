import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.page.html',
  styleUrls: ['./perfil-conductor.page.scss'],
})
export class PerfilConductorPage implements OnInit {

  usuario : any={
    nombre:"Juan Carlos",
    apellido:"Bodoque",
    patente:"TP8373",
    imagen:"assets/icon/user_bodoque.jpg"
  }

  newPassA:string="";
  newPassB:string="";
  formDatos!: FormGroup;
  formErrors:any={};

  constructor(private router: Router,readonly fb: FormBuilder, private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
    this.formDatos = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre: ['', []],
      apellido: ['', []],
      patente: ['', []],
    });
  }


  async showToast(text:string,type:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000,
      position: 'bottom',
      color: type,
      buttons:[{
        icon:"close",
        role:"cancel"
      }]
    });
    await toast.present();
  }

  async alertaEliminar() {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar esta cuenta?',
      subHeader:'Esto no se puede deshacer',
      buttons: [{
          text:'Cancelar',
          role:"cancel",
        },{
          text:'Confirmar',
          role:"confirm",
          cssClass:"color-danger",
          handler:()=>{
            this.router.navigate(["/"]);
          }
        }
      ],
    });
    /* Se le pueden añadir eventos
    alert.addEventListener("didDismiss",()=>{
      this.location.back()
    })
    */
    await alert.present();
  }

  actualizarDatos(){
    console.log("!:actualizarDatos()");
    this.formErrors={};
    let valid:boolean=true;
    valid=valid&&this.validarNombre();
    valid=valid&&this.validarApellido();
    valid=valid&&this.validarPatente();
    if(valid){
      //actualizar datos en la db
      this.showToast("Datos actualizados","success");
    }
  }

  actualizarContrasena(){
    console.log("!:actualizarContrasena()");
    this.formErrors={};
    let valid:boolean=true;
    valid=valid&&this.validarContraA();
    valid=valid&&this.validarContraB();
    if(valid){
      //actualizar datos en la db
      this.showToast("Contraseña actualizada","success");
    }
  }

  validarNombre(){
    let valid=true;
    this.formErrors["nombre_empty"]=false;
    if(this.usuario.nombre.trim()==""){
      this.formErrors["nombre_empty"]=true; valid=false;}
    return valid;
  }

  validarApellido(){
    let valid=true;
    this.formErrors["apellido_empty"]=false;
    if(this.usuario.apellido.trim()==""){
      this.formErrors["apellido_empty"]=true; valid=false;}
    return valid;
  }

  validarPatente(){
    let valid=true;
    this.formErrors["patente_empty"]=false;
    this.formErrors["patente_invalid"]=false;
    if(this.usuario.patente.trim()==""){
      this.formErrors["patente_empty"]=true; valid=false;}
    if(!this.usuario.patente.match(/[A-Z]{2}[1-9][0-9]{3}|[BCDFGHJKLPRSTVWXYZ]{4}[1-9][0-9]/)){
      this.formErrors["patente_invalid"]=true; valid=false;}
    return valid;
  }

  validarContraA(){
    let valid=true;
    this.formErrors["passA_empty"]=false;
    this.formErrors["passA_short"]=false;
    this.formErrors["passA_long"]=false;
    this.formErrors["passA_number"]=false;
    this.formErrors["passA_upper"]=false;
    this.formErrors["passA_special"]=false;
    if(this.newPassA.trim()==""){ 
      this.formErrors["passA_empty"]=true; valid=false;}
    if(this.newPassA.trim().length<8){ 
      this.formErrors["passA_short"]=true; valid=false;}
    if(this.newPassA.trim().length>40){ 
      this.formErrors["passA_long"]=true; valid=false;}
    if(!this.newPassA.match(/[0-9]/)){ 
      this.formErrors["passA_number"]=true; valid=false;}
    if(!this.newPassA.match(/[A-Z]/)){ 
      this.formErrors["passA_upper"]=true; valid=false;}
    if(!this.newPassA.match(/[!#$%&=+]/)){ 
      this.formErrors["passA_special"]=true; valid=false;}
    return valid;
  }

  validarContraB(){
    let valid=true;
    this.formErrors["passB_empty"]=false;
    this.formErrors["passB_match"]=false;
    if(this.newPassB.trim()==""){ 
      this.formErrors["passB_empty"]=true; valid=false;}
    if(this.newPassA.trim()!=this.newPassB.trim()){ 
      this.formErrors["passB_match"]=true; valid=false;}
    return valid;
  }

  eliminarCuenta(){
    console.log("!:eliminarCuenta()");
    this.alertaEliminar();
    //se pide confirmar. de confirmar, se elimina la cuenta de la db y se redigire a inicio.
  }

  editarImagenPerfil(){
    console.log("!:editarImagenPerfil()");
    //se abrela camara o la galeria, y permite subir una imagen. si se actualizan los datos,
    //se reemplaza la imagen en la db
  }
}
