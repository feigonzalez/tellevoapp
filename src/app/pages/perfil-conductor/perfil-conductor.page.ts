import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
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
  imagen: string | null = null;
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarNuevaContrasena: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
    private db: BdserviceService,
    private weatherService: WeatherService,
    // No necesitas HttpClient aquí ya que está en el servicio WeatherService
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

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
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
    window.location.reload();
    this.db.updateUsuario(this.usuario).then(() => {
      if (this.usuario.imagen) {
        this.db.updateImagenUsuario(this.usuario.id_usuario, this.usuario.imagen)
          .then(() => {
            this.showToast("Usuario actualizado exitosamente", "success");
          })
          .catch((error) => {
            this.showToast("Error al guardar la imagen de perfil: " + error.message, "danger");
          });
      } else {
        this.showToast("Usuario actualizado exitosamente", "success");
      }

      // Agregar vehículo
      this.db.crearVehiculo(this.usuario.patente, this.usuario.color, this.usuario.n_asientos, this.usuario.id_usuario)
        .then(() => {
          this.showToast("Vehículo agregado exitosamente", "success");
        })
        .catch((error) => {
          this.showToast("Error al agregar vehículo: " + error.message, "danger");
        });
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
