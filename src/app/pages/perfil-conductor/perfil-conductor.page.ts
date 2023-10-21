import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.page.html',
  styleUrls: ['./perfil-conductor.page.scss'],
})
export class PerfilConductorPage implements OnInit {
  
  usuario : any={}




 //  id: number = Math.floor(Math.random() * 100) + 1;
  nombre: string = "";
  correo: string = "";
  numero_cel: string = "";


  newPassA: string = "";
  newPassB: string = "";
  formDatos!: FormGroup;
  formErrors: any = {};


  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private db:BdserviceService,
    public BdserviceService: BdserviceService
//    private dataService: DataService
  ) {}

  ngOnInit() {
    this.formDatos = this.initForm();
    this.db.dbState().subscribe(res=>{
      if(res){
        this.loadUsuario();
      }
    })
  }
  async loadUsuario(){
    let uID=localStorage.getItem("uID");
    if(uID) this.usuario=await this.db.leerUsuarioPorID(uID);
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

  async showToast(text: string, type: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000,
      position: 'bottom',
      color: type,
      buttons: [{
        icon: "close",
        role: "cancel"
      }]
    });
    await toast.present();
  }

  async alertaEliminar() {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar esta cuenta?',
      subHeader: 'Esto no se puede deshacer',
      buttons: [{
        text: 'Cancelar',
        role: "cancel",
      }, {
        text: 'Confirmar',
        role: "confirm",
        cssClass: "color-danger",
        handler: () => {
          this.router.navigate(["/"]);
        }
      },
      ],
    });
    await alert.present();
  }
  




  actualizarUsuario2( nombre: string, correo: string, numero_cel: string) {
    console.log("Nuevo nombre:", nombre);
    console.log("Nuevo correo:", correo);
    console.log("Nuevo número de celular:", numero_cel);
  
    this.BdserviceService.actualizarUsuario2( nombre, correo, numero_cel);
  }
 



  validarContraA() {
    let valid = true;
    this.formErrors["passA_empty"] = false;
    this.formErrors["passA_short"] = false;
    this.formErrors["passA_long"] = false;
    this.formErrors["passA_number"] = false;
    this.formErrors["passA_upper"] = false;
    this.formErrors["passA_special"] = false;
    if (this.newPassA.trim() == "") {
      this.formErrors["passA_empty"] = true;
      valid = false;
    }
    if (this.newPassA.trim().length < 8) {
      this.formErrors["passA_short"] = true;
      valid = false;
    }
    if (this.newPassA.trim().length > 40) {
      this.formErrors["passA_long"] = true;
      valid = false;
    }
    if (!this.newPassA.match(/[0-9]/)) {
      this.formErrors["passA_number"] = true;
      valid = false;
    }
    if (!this.newPassA.match(/[A-Z]/)) {
      this.formErrors["passA_upper"] = true;
      valid = false;
    }
    if (!this.newPassA.match(/[!#$%&=+]/)) {
      this.formErrors["passA_special"] = true;
      valid = false;
    }
    return valid;
  }

  validarContraB() {
    let valid = true;
    this.formErrors["passB_empty"] = false;
    this.formErrors["passB_match"] = false;
    if (this.newPassB.trim() == "") {
      this.formErrors["passB_empty"] = true;
      valid = false;
    }
    if (this.newPassA.trim() != this.newPassB.trim()) {
      this.formErrors["passB_match"] = true;
      valid = false;
    }
    return valid;
  }

  eliminarCuenta() {
    /*
    this.dataService.eliminarCuenta().subscribe(
      () => {
        this.alertaEliminar();
        this.router.navigate(["/"]);
      },
      (error:any) => {
        console.error("Error al eliminar la cuenta:", error);
        this.showToast("Error al eliminar la cuenta", "danger");
      }
    );*/
  }

  editarImagenPerfil() {
    // Abre la cámara o la galería y permite subir una imagen.
  }
}
