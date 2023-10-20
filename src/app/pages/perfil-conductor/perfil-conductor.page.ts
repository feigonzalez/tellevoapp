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

  actualizarDatos() {
    this.formErrors = {};
    let valid: boolean = true;
    valid = valid && this.validarNombre();
    valid = valid && this.validarApellido();
    valid = valid && this.validarPatente();
    if (valid) {
      /*this.dataService.actualizarDatos({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        patente: this.usuario.patente
      }).subscribe(
        (response:any) => {
          this.showToast('Datos actualizados', 'success');
        },
        (error:any) => {
          // Manejar errores
        }
      );*/
    }
  }

  actualizarContrasena() {
    this.formErrors = {};
    let valid: boolean = true;
    valid = valid && this.validarContraA();
    valid = valid && this.validarContraB();
    if (valid) {
      /*this.dataService.actualizarContrasena(this.newPassA).subscribe(
        (response:any) => {
          this.showToast('Contraseña actualizada', 'success');
        },
        (error:any) => {
          // Manejar errores
        }
      );*/
    }
  }

  validarNombre() {
    let valid = true;
    this.formErrors["nombre_empty"] = false;
    if (this.usuario.nombre.trim() == "") {
      this.formErrors["nombre_empty"] = true;
      valid = false;
    }
    return valid;
  }

  validarApellido() {
    let valid = true;
    this.formErrors["apellido_empty"] = false;
    if (this.usuario.apellido.trim() == "") {
      this.formErrors["apellido_empty"] = true;
      valid = false;
    }
    return valid;
  }

  validarPatente() {
    let valid = true;
    this.formErrors["patente_empty"] = false;
    this.formErrors["patente_invalid"] = false;
    if (this.usuario.patente.trim() == "") {
      this.formErrors["patente_empty"] = true;
      valid = false;
    }
    if (!this.usuario.patente.match(/[A-Z]{2}[1-9][0-9]{3}|[BCDFGHJKLPRSTVWXYZ]{4}[1-9][0-9]/)) {
      this.formErrors["patente_invalid"] = true;
      valid = false;
    }
    return valid;
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
