import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.page.html',
  styleUrls: ['./perfil-conductor.page.scss'],
})
export class PerfilConductorPage implements OnInit {
  usuario: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
    private db: BdserviceService
  ) {}

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.loadUsuario();
      }
    });
  }

  async loadUsuario() {
    let uID = localStorage.getItem("uID");
    if (uID) this.usuario = await this.db.leerUsuarioPorID(uID);
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
      buttons: [
        {
          icon: "close",
          role: "cancel",
        },
      ],
    });
    await toast.present();
  }

  guardarCambios() {
    this.db.updateUsuario(this.usuario).then((message) => {
      this.showToast(message, "success");
    }).catch((error) => {
      console.error('Error al insertar datos:', error);
      let errorMessage = "Error al guardar cambios: ";
      if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Detalles específicos del error no disponibles.";
      }
      this.showToast(errorMessage, "danger");
    });
  }
}
