import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
@Component({
  selector: 'app-perfil-pasajero', 
  templateUrl: './perfil-pasajero.page.html', 
  styleUrls: ['./perfil-pasajero.page.scss'], 
})
export class PerfilPasajeroPage implements OnInit { 
  usuario: any = {};
  imagen: string | null = null;
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarNuevaContrasena: string = '';

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

  cambiarContrasena() {
    // Validar que la contraseña actual sea correcta
    if (!this.validarContrasenaActual()) {
      this.showToast('La contraseña actual es incorrecta', 'danger');
      return;
    }

    // Validar que la nueva contraseña y la confirmación coincidan
    if (this.nuevaContrasena !== this.confirmarNuevaContrasena) {
      this.showToast('Las contraseñas nuevas no coinciden', 'danger');
      return;
    }

    // Validar que la nueva contraseña cumple con tus requisitos de seguridad
    if (!this.validarNuevaContrasena()) {
      this.showToast('La nueva contraseña no cumple con los requisitos de seguridad', 'danger');
      return;
    }

    // Actualizar la contraseña en la base de datos
    this.db.actualizarContrasena(this.usuario.id_usuario, this.nuevaContrasena)
      .then(() => {
        this.showToast('Contraseña actualizada exitosamente', 'success');
        // Limpiar campos de contraseña
        this.contrasenaActual = '';
        this.nuevaContrasena = '';
        this.confirmarNuevaContrasena = '';
      })
      .catch(error => {
        this.showToast('Error al actualizar la contraseña: ' + error.message, 'danger');
      });
  }

  async validarContrasenaActual(): Promise<boolean> {
    const contrasenaAlmacenada = await this.obtenerContrasenaAlmacenada(this.usuario.id_usuario);
    return this.contrasenaActual === contrasenaAlmacenada;
  }

  async obtenerContrasenaAlmacenada(idUsuario: number): Promise<string> {
    try {
      const usuario = await this.db.leerUsuarioPorID(idUsuario.toString());
      if (usuario) {
        return usuario.password;
      }
      return '';
    } catch (error) {
      // Maneja errores aquí
      console.error('Error al obtener contraseña almacenada:', error);
      return '';
    }
  }

  validarNuevaContrasena(): boolean {
    // Añade tus criterios de validación aquí
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.nuevaContrasena);
  }

  guardarCambios1() {
    // Validaciones de contraseña actual y nueva contraseña
    if (!this.validarContrasenaActual()) {
      this.showToast("La contraseña actual es incorrecta", "danger");
      return;
    }

    if (!this.validarNuevaContrasena()) {
      this.showToast("La nueva contraseña no cumple con los requisitos de seguridad", "danger");
      return;
    }

    // Cambiar la contraseña en la base de datos
    this.db.actualizarContrasena(this.usuario.id_usuario, this.nuevaContrasena)
      .then(() => {
        this.showToast("Contraseña cambiada exitosamente", "success");
      })
      .catch((error) => {
        this.showToast("Error al cambiar la contraseña: " + error.message, "danger");
      });
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
