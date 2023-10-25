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
  imagen: string | null = null;

constructor(
  private router: Router,
  private fb: FormBuilder,
  private toastController: ToastController,
  private db: BdserviceService
) {
  this.usuario.imagen = null; // Inicializa la propiedad imagen en null
}


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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.usuario.imagen = URL.createObjectURL(file); // Almacena la ruta de la imagen en el usuario
    }
  }
  

  guardarCambios() {
    this.db.updateUsuario(this.usuario).then((message) => {
      // Guarda la imagen en la base de datos
      if (this.usuario.imagen) {
        this.db.updateImagenUsuario(this.usuario.id_usuario, this.usuario.imagen)
          .then(() => {
            this.showToast("Usuario actualizado exitosamente", "success");
          })
          .catch((error) => {
            this.showToast("Error al guardar la imagen de perfil: " + error.message, "danger");
          });
      } else {
        this.showToast(message, "success");
      }
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
