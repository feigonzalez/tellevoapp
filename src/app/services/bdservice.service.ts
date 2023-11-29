import { Injectable } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, reduce } from 'rxjs';
import { Rol } from './rol';
import { Usuario } from './usuario';
import { Vehiculo } from './vehiculo';
import { Viaje } from './viaje';
import { Calificacion } from './calificacion';
import { Mensaje } from './mensaje';
import { Ruta } from './ruta';


@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database!: SQLiteObject;

  tablaRoles = new BehaviorSubject([]);
  tablaUsuarios = new BehaviorSubject([]);
  tablaVehiculos = new BehaviorSubject([]);
  tablaRutas = new BehaviorSubject([]);
  tablaViajes = new BehaviorSubject([]);
  tablaCalificaciones = new BehaviorSubject([]);
  tablaDetalleViajes = new BehaviorSubject([]);
  tablaMensajes = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  tablaRolesStmt = "CREATE TABLE IF NOT EXISTS roles (id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(25) NOT NULL);";
  tablaUsuariosStmt = "CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, numero_cel VARCHAR(25) NOT NULL, imagen VARCHAR(50) NOT NULL, id_rol INTEGER NOT NULL, FOREIGN KEY(id_rol) REFERENCES roles(id_rol));";
  tablaVehiculosStmt = "CREATE TABLE IF NOT EXISTS vehiculos (id_vehiculo INTEGER PRIMARY KEY AUTOINCREMENT, patente VARCHAR(10) NOT NULL, color VARCHAR(25) NOT NULL, n_asientos INTEGER NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario));";
  tablaRutasStmt = "CREATE TABLE IF NOT EXISTS rutas(id_ruta INTEGER PRIMARY KEY AUTOINCREMENT, tiempo_estimado INTEGER NOT NULL, origen VARCHAR(100), destino VARCHAR(100) NOT NULL, tarifa INTEGER NOT NULL, hora_salida VARCHAR(8) NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario))";
  tablaViajesStmt = "CREATE TABLE IF NOT EXISTS viajes(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, tarifa INTEGER NOT NULL, fecha TIMESTAMP NOT NULL, estado VARCHAR(16) NOT NULL, id_ruta INTEGER NOT NULL, id_pasajero INTEGER NOT NULL, FOREIGN KEY(id_ruta) REFERENCES rutas(id_ruta), FOREIGN KEY(id_pasajero) REFERENCES usuarios(id_pasajero))";
  tablaCalificacionesStmt = "CREATE TABLE IF NOT EXISTS calificaciones (id_calificacion INTEGER PRIMARY KEY AUTOINCREMENT, calificacion FLOAT NOT NULL, id_viaje INTEGER NOT NULL, FOREIGN KEY (id_viaje) REFERENCES viajes(id_viaje));";
  tablaMensajesStmt = "CREATE TABLE IF NOT EXISTS mensajes (id_mensaje INTEGER PRIMARY KEY AUTOINCREMENT, id_remitente INTEGER NOT NULL, id_destinatario INTEGER NOT NULL, fecha TIMESTAMP, texto VARCHAR(1000) NOT NULL);";

  poblarRolesStmts = [
    "INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'Conductor');",
    "INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (2, 'Pasajero');"
  ];
  poblarUsuariosStmts = [
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, imagen, id_rol) VALUES (1, 'Juan Carlos Bodoque', 'jbodoque@aplaplac.com', 'pass', '+56900000001', 'user_bodoque.jpg', 1)",
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, imagen, id_rol) VALUES (2, 'Patana Trufillo', 'ptrufillo@aplaplac.com', 'pass', '+56900000002', 'user_patana.jpg', 2)",
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, imagen, id_rol) VALUES (3, 'Tulio Triviño', 'ttrivino@aplaplac.com', 'pass', '+56900000003', 'user_tulio.jpg', 2)",
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, imagen, id_rol) VALUES (4, 'Freddy Turbina', 'fturbina@aplaplac.com', 'pass', '+56900000004', 'user_freddy.jpg', 1)"
  ];
  poblarVehiculosStmts = [
    "INSERT OR IGNORE INTO vehiculos (id_vehiculo, patente, color, n_asientos, id_usuario) VALUES (1, 'JB1234', 'rojo', 3, 1)",
    "INSERT OR IGNORE INTO vehiculos (id_vehiculo, patente, color, n_asientos, id_usuario) VALUES (2, 'FT1234', 'naranjo', 1, 4)",
  ];
  poblarRutasStmts = [
    "INSERT OR IGNORE INTO rutas (id_ruta, tiempo_estimado, origen, destino, tarifa, hora_salida, id_usuario) VALUES (1, 0, 'Calle Nueva 1660, Huechuraba', 'Pedro Fontova 6426, Huechuraba', 800, '14:30', 1)",
    "INSERT OR IGNORE INTO rutas (id_ruta, tiempo_estimado, origen, destino, tarifa, hora_salida, id_usuario) VALUES (2, 0, 'Calle Nueva 1660, Huechuraba', 'Rigoberto Jara 0278, Quilicura', 2000, '16:30', 1)",
    "INSERT OR IGNORE INTO rutas (id_ruta, tiempo_estimado, origen, destino, tarifa, hora_salida, id_usuario) VALUES (3, 0, 'Antonio Varas 666, Providencia', 'Clemente Fabres 1025, Providencia', 3500, '17:00', 4)"
  ];
  poblarViajesStmts = [
    "INSERT OR IGNORE INTO viajes (id_viaje, tarifa, fecha, estado, id_ruta, id_pasajero) VALUES (1, 800, '2023-09-20 16:44:21', 'solicitado', 1, 2)",
    "INSERT OR IGNORE INTO viajes (id_viaje, tarifa, fecha, estado, id_ruta, id_pasajero) VALUES (2, 800, '2023-09-20 19:34:51', 'solicitado', 1, 2)",
    "INSERT OR IGNORE INTO viajes (id_viaje, tarifa, fecha, estado, id_ruta, id_pasajero) VALUES (3, 2000, '2023-10-17 17:21:11', 'solicitado', 2, 3)",
  ]
  poblarCalificacionesStmts = [
    "INSERT OR IGNORE INTO calificaciones (id_calificacion, calificacion, id_viaje) VALUES (1, 3, 1)",
    "INSERT OR IGNORE INTO calificaciones (id_calificacion, calificacion, id_viaje) VALUES (2, 4, 1)",
    "INSERT OR IGNORE INTO calificaciones (id_calificacion, calificacion, id_viaje) VALUES (3, 3, 1)",
    "INSERT OR IGNORE INTO calificaciones (id_calificacion, calificacion, id_viaje) VALUES (4, 5, 2)",
    "INSERT OR IGNORE INTO calificaciones (id_calificacion, calificacion, id_viaje) VALUES (5, 2, 2)",
    "INSERT OR IGNORE INTO calificaciones (id_calificacion, calificacion, id_viaje) VALUES (6, 4, 3)"
  ];
  poblarMensajesStmts = [
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (1, 2, 1, '2023-09-20 16:34:11', 'oye tio, donde estás?')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (2, 1, 2, '2023-09-20 16:34:36', 'Estoy en el estacionamiento del canal')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (3, 2, 1, '2023-09-20 16:34:42', 'ah ya, voy para allá')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (4, 3, 1, '2023-09-13 17:13:02', 'Juan Carlos, necesito que vayas a dejarme')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (5, 1, 3, '2023-09-13 17:13:13', 'Pero Tulio, ¿qué le pasó a tu auto?')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (6, 3, 1, '2023-09-13 17:13:25', 'Un idiota me chocó ayer saliendo del canal')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (7, 3, 1, '2023-09-13 17:13:29', 'Tenía un auto igual al tuyo')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (8, 1, 3, '2023-09-13 17:13:38', 'Ah, así que eras tú')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (9, 3, 1, '2023-09-13 17:13:44', '¿Qué significa eso?')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (10, 1, 3, '2023-09-13 17:14:06', 'Eh... Nada, Tulio')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (11, 1, 3, '2023-09-13 17:14:12', 'Lo siento, pero no te voy a poder llevar')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (12, 3, 4, '2023-09-13 17:15:53', 'Freddy, necesito que vayas a dejarme.')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (13, 4, 3, '2023-09-13 17:16:35', 'Por supuesto, donde estas?')",
    "INSERT OR IGNORE INTO mensajes (id_mensaje, id_remitente, id_destinatario, fecha, texto) VALUES (14, 3, 4, '2023-09-13 17:16:43', 'En la entrada principal')"
  ];

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private toastController: ToastController) {
    this.crearDB();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
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

  getCurrentDatestring() {
    let d = new Date();
    return d.getFullYear() + "-" + d.getMonth().toString().padStart(2, '0') + "-" + d.getDate().toString().padStart(2, '0') + " " + d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0') + ":" + d.getSeconds().toString().padStart(2, '0');
  }

  dbState() { return this.isDBReady.asObservable(); }

  fetchRoles(): Observable<Rol[]> { return this.tablaRoles.asObservable(); }
  fetchUsuarios(): Observable<Usuario[]> { return this.tablaUsuarios.asObservable(); }
  fetchVehiculos(): Observable<Vehiculo[]> { return this.tablaVehiculos.asObservable(); }
  fetchRutas(): Observable<Ruta[]> { return this.tablaRutas.asObservable(); }
  fetchViajes(): Observable<Viaje[]> { return this.tablaViajes.asObservable(); }
  fetchCalificaciones(): Observable<Calificacion[]> { return this.tablaCalificaciones.asObservable(); }
  fetchMensajes(): Observable<Mensaje[]> { return this.tablaMensajes.asObservable(); }

  crearDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: "bdtellevo.db",
        location: "default"
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => {
        this.presentAlert("ERROR al crear DB: " + (e as Error).message);
      })
    })
  }

  async crearTablas() {
    let status: string = "INIT";
    try {
      await this.database.executeSql(this.tablaRolesStmt, []);          status = "MADE roles";
      await this.database.executeSql(this.tablaUsuariosStmt, []);       status = "MADE usuarios";
      await this.database.executeSql(this.tablaVehiculosStmt, []);      status = "MAKE vehiculos";
      await this.database.executeSql(this.tablaRutasStmt, []);          status = "MAKE rutas";
      await this.database.executeSql(this.tablaViajesStmt, []);         status = "MAKE viajes";
      await this.database.executeSql(this.tablaCalificacionesStmt, []); status = "MAKE calificaciones";
      await this.database.executeSql(this.tablaMensajesStmt, []);       status = "MAKE mensajes";
      for (var stmt of this.poblarRolesStmts) { await this.database.executeSql(stmt, []); }          status = "FILL roles";
      for (var stmt of this.poblarUsuariosStmts) { await this.database.executeSql(stmt, []); }       status = "FILL usuarios";
      for (var stmt of this.poblarVehiculosStmts) { await this.database.executeSql(stmt, []); }      status = "FILL vehiculos";
      for (var stmt of this.poblarRutasStmts) { await this.database.executeSql(stmt, []); }          status = "FILL viajes";
      for (var stmt of this.poblarViajesStmts) { await this.database.executeSql(stmt, []); }         status = "FILL calificaciones";
      for (var stmt of this.poblarCalificacionesStmts) { await this.database.executeSql(stmt, []); } status = "FILL mensajes";
      for (var stmt of this.poblarMensajesStmts) { await this.database.executeSql(stmt, []); }       status = "DONE";
      this.isDBReady.next(true)
    } catch (e) {
      this.presentAlert("[@" + status + "] ERROR al crear tablas: " + (e as Error).message);
    }
  }

  //BD: Roles

  leerRoles() {
    return this.database.executeSql("SELECT * FROM roles", []).then(res => {
      let items: Rol[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_rol: item.id_rol,
            nombre_rol: item.nombre_rol
          });
        }
      }
      this.tablaRoles.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Roles: " + (e as Error).message);
    })
  }

  //BD: Usuarios

  leerUsuarios() {
    return this.database.executeSql("SELECT * FROM usuarios", []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_usuario: item.id_usuario,
            nombre: item.nombre,
            correo: item.correo,
            password: item.password,
            imagen: item.imagen,
            numero_cel: item.numero_cel,
            id_rol: item.id_rol
          });
        }
      }
      this.tablaUsuarios.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Usuarios: " + (e as Error).message);
    })
  }

  leerUsuarioPorID(uID: string) {
    return this.database.executeSql("SELECT * FROM usuarios WHERE id_usuario = ?", [uID]).then(res => {
      if (res.rows.length == 1) {
        return res.rows.item(0);
      }
      return null;
    }).catch(e => {
      this.presentAlert("ERROR al obtener Usuario (ID:" + uID + "): " + (e as Error).message);
      return null;
    })
  }

  leerUsuarioPorCorreo(correo: string) {
    return this.database.executeSql("SELECT * FROM usuarios WHERE LOWER(correo) = ?", [correo]).then(res => {
      if (res.rows.length == 1) {
        return res.rows.item(0);
      }
      return null;
    }).catch(e => {
      this.presentAlert("ERROR al obtener Usuario (Correo:" + correo + "): " + (e as Error).message);
      return null;
    })
  }

  existeUsuarioPorCorreo(correo: string) {
    return this.database.executeSql("SELECT * FROM usuarios WHERE LOWER(correo) = ?", [correo]).then(res => {
      return res.rows.length == 1;
    }).catch(e => {
      this.presentAlert("ERROR al verificar Usuario (Correo:" + correo + "): " + (e as Error).message);
      return null;
    })
  }

  crearUsuario(nombre: string, correo: string, pass: string, telefono: string, id_rol: number, imagen: string) {
    return this.database.executeSql("INSERT INTO usuarios (nombre, correo, password, numero_cel, id_rol, imagen) VALUES (?, ?, ?, ?, ?, ?);", [nombre, correo, pass, telefono, id_rol, imagen]).then((res) => {
      this.leerUsuarios();
      return res.insertId;
    }).catch((e) => {
      this.presentAlert("ERROR al crear nuevo Usuario: " + (e as Error).message);
      return -1;
    })
  }

  eliminarUsuario(id: number) {
    return this.database.executeSql("DELETE FROM usuarios WHERE id_usuario = ?;", [id]).then((res) => {
      this.leerUsuarios();
    }).catch((e) => {
      this.presentAlert("ERROR al eliminar Usuario (ID:" + id + "): " + (e as Error).message);
    })
  }

  actualizarUsuario(id: number, nombre: string, correo: string, pass: string, numero_cel: string) {
    return this.database.executeSql("UPDATE usuarios SET nombre = ?, correo = ?, password = ?, numero_cel = ? WHERE id_usuario = ?;", [nombre, correo, pass, numero_cel, id]).then((res) => {
      this.leerUsuarios();
    }).catch((e) => {
      this.presentAlert("ERROR al actualizar Usuario (ID:" + id + "): " + (e as Error).message);
    })
  }

  actualizarUsuarioDatos(id:number, nombre:string, numero_cel:string, imagen:string){
    return this.database.executeSql("UPDATE usuarios SET nombre = ?, numero_cel = ?, imagen = ? WHERE id_usuario = ?;", [nombre, numero_cel, imagen, id]).then((res) => {
      this.leerUsuarios();
    }).catch((e) => {
      this.presentAlert("ERROR al actualizar datos de Usuario (ID:" + id + "): " + (e as Error).message);
    })
  }

  actualizarUsuarioPass(id:number, password:string){
    return this.database.executeSql("UPDATE usuarios SET password = ? WHERE id_usuario = ?;", [password, id]).then((res) => {
      this.leerUsuarios();
    }).catch((e) => {
      this.presentAlert("ERROR al actualizar password de Usuario (ID:" + id + "): " + (e as Error).message);
    })
  }

  // otra vez tratando de cambiar la wea de edición sin exito, round 5 
  updateUsuario(usuario: any) {
    return this.sqlite.create({
      name: 'bdtellevo.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      return db.executeSql(
        'UPDATE usuarios SET nombre = ?, correo = ?, numero_cel = ? WHERE id_usuario = ?',
        [usuario.nombre, usuario.correo, usuario.numero_cel, usuario.id_usuario]
      );
    }).then((data) => {
      if (data.rowsAffected > 0) {
        return "Usuario actualizado exitosamente";
      } else {
        throw new Error("No se pudo actualizar el usuario");
      }
    }).catch(error => {
      console.error('Error al actualizar datos:', error);
      throw new Error("Error al actualizar el usuario: " + error.message);
    });
  }
  // IMAGEN CAMBIAR IMAGEN

  updateImagenUsuario(idUsuario: number, imagen: string) {
    return this.sqlite.create({
      name: 'bdtellevo.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      return db.executeSql(
        'UPDATE usuarios SET imagen = ? WHERE id_usuario = ?',
        [imagen, idUsuario]
      );
    }).then((data) => {
      if (data.rowsAffected > 0) {
        return "Imagen de perfil actualizada exitosamente";
      } else {
        throw new Error("No se pudo actualizar la imagen de perfil");
      }
    }).catch(error => {
      console.error('Error al actualizar imagen de perfil:', error);
      throw new Error("Error al actualizar la imagen de perfil: " + error.message);
    });
  }
  // 
  actualizarContrasena(idUsuario: number, nuevaContrasena: string) {
    return this.sqlite.create({
      name: 'bdtellevo.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      return db.executeSql(
        'UPDATE usuarios SET password = ? WHERE id_usuario = ?',
        [nuevaContrasena, idUsuario]
      );
    }).then((data) => {
      if (data.rowsAffected > 0) {
        return "Contraseña actualizada exitosamente";
      } else {
        throw new Error("No se pudo actualizar la contraseña");
      }
    }).catch(error => {
      console.error('Error al actualizar la contraseña:', error);
      throw new Error("Error al actualizar la contraseña: " + error.message);
    });
  }
  // BD: Mensajes

  guardarMensaje(id_remitente: number, id_destinatario: number, texto: string) {
    const fecha = this.getCurrentDatestring();
    this.database.executeSql("INSERT INTO mensajes (id_remitente, id_destinatario, fecha, texto) VALUES (?, ?, ?, ?);", [id_remitente, id_destinatario, fecha, texto])
      .then((res) => {
        this.leerMensajes(); // Llama a la función para actualizar la lista de mensajes
      })
      .catch((e) => {
        this.presentAlert("ERROR al crear nuevo Mensaje: " + (e as Error).message);
      });
  }

  leerMensajes() {
    return this.database.executeSql("SELECT * FROM mensajes", []).then(res => {
      let items: Mensaje[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_mensaje: item.id_mensaje,
            id_remitente: item.id_remitente,
            id_destinatario: item.id_destinatario,
            fecha: item.fecha,
            texto: item.texto
          });
        }
      }
      this.tablaMensajes.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Mensajes: " + (e as Error).message);
    })
  }

  leerConversacion(user1: string, user2: string) {
    return this.database.executeSql("SELECT * FROM mensajes WHERE (id_destinatario = ? AND id_remitente = ?) OR (id_destinatario = ? AND id_remitente = ?)", [user1, user2, user2, user1]).then(res => {
      let items: Mensaje[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_mensaje: item.id_mensaje,
            id_remitente: item.id_remitente,
            id_destinatario: item.id_destinatario,
            fecha: item.fecha,
            texto: item.texto
          });
        }
      }
      this.tablaMensajes.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Mensajes: " + (e as Error).message);
    })
  }

  /*
  Retorna una lista de objetos con la siguiente estructura:
    pairCode: la suma de las ids de cada usuario de la conversación. Como en la página el id del usuario
      que la ve es constante, este valor se usa para diferenciar conversaciones con diferentes parejas.
    texto: el ultimo mensaje enviado en la conversacion
    id_pareja: id del usuario con quien se tiene la conversacion.
    nom_pareja: nombre del usuario con quien se tiene la conversacion.
    img_pareja: imagen de perfil del usuario con quien se tiene la conversacion.
  */
  async leerConversacionesPorUsuario(uID: string) {
    return await this.database.executeSql("SELECT id_remitente, fecha, texto, (id_remitente + id_destinatario) AS pairCode, (id_remitente + id_destinatario - ?) AS id_pareja, usuarios.nombre, usuarios.imagen FROM mensajes JOIN usuarios ON id_pareja = id_usuario WHERE id_remitente = ? OR id_destinatario = ? GROUP BY pairCode ORDER BY fecha ASC;", [uID, uID, uID]).then(r => {
      let res: any = [];
      if (r.rows.length > 0) {
        for (var i = 0; i < r.rows.length; i++) {
          let item = r.rows.item(i);
          res.push({
            pairCode: item.pairCode,
            texto: item.texto,
            id_pareja: item.pairCode - parseInt(uID),
            nom_pareja: item.nombre,
            img_pareja: item.imagen
          })
        }
        return res;
      } else {
        return null;
      }
    }).catch(e => {
      this.presentAlert("ERROR en leerConversacionesPorUsuario (ID:" + uID + "):" + (e as Error).message);
      return null;
    })
  }

  crearMensaje(id_remitente: number, id_destinatario: number, texto: string) {
    return this.database.executeSql("INSERT INTO mensajes (id_remitente, id_destinatario, fecha, texto) VALUES (?, ?, time('now'), ?)", [id_remitente, id_destinatario, texto]).then((res) => {
      this.leerMensajes();
    }).catch((e) => {
      this.presentAlert("ERROR al crear nuevo Mensaje: " + (e as Error).message);
    })
  }

  eliminarMensaje(id: number) {
    return this.database.executeSql("DELETE FROM mensajes WHERE id_mensaje = ?;", [id]).then((res) => {
      this.leerMensajes();
    }).catch((e) => {
      this.presentAlert("ERROR al eliminar Mensaje (ID:" + id + "): " + (e as Error).message);
    })
  }

  //BD: Vehiculos

  leerVehiculos() {
    return this.database.executeSql("SELECT * FROM vehiculos", []).then(res => {
      let items: Vehiculo[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_vehiculo: item.id_vehiculo,
            patente: item.patente,
            color: item.color,
            n_asientos: item.n_asientos,
            id_usuario: item.id_usuario
          });
        }
      }
      this.tablaVehiculos.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Vehiculos: " + (e as Error).message);
    })
  }

  leerVehiculoPorUsuario(uID: string) {
    return this.database.executeSql("SELECT * FROM vehiculos WHERE id_usuario = ?", [uID]).then(res => {
      if (res.rows.length == 1) {
        return res.rows.item(0);
      }
      return null;
    }).catch(e => {
      this.presentAlert("ERROR al obtener Vehiculo de Usuario (ID:" + uID + "): " + (e as Error).message);
      return null;
    })
  }





  crearVehiculo(patente: string, color: string, n_asientos: number, id_usuario: number) {
    return this.database.executeSql("INSERT INTO vehiculos (patente, color, n_asientos, id_usuario) VALUES (?, ?, ?, ?);", [patente, color, n_asientos, id_usuario]).then((res) => {
      this.leerVehiculos();
      return res.insertId;
    }).catch((e) => {
      this.presentAlert("ERROR al crear nuevo Vehiculo: " + (e as Error).message);
    })
  }




  eliminarVehiculo(id: number) {
    return this.database.executeSql("DELETE FROM vehiculos WHERE id_vehiculo = ?;", [id]).then((res) => {
      this.leerVehiculos();
    }).catch((e) => {
      this.presentAlert("ERROR al eliminar Vehiculos (ID:" + id + "): " + (e as Error).message);
    })
  }

  actualizarVehiculo(id: number, patente: string, color: string, n_asientos: number, id_usuario: number) {
    return this.database.executeSql("UPDATE vehiculos SET patente = ?, color = ?, n_asientos = ?, id_usuario = ? WHERE id_vehiculo = ?;", [patente, color, n_asientos, id_usuario, id]).then((res) => {
      this.leerUsuarios();
    }).catch((e) => {
      this.presentAlert("ERROR al actualizar Vehiculo (ID:" + id + "): " + (e as Error).message);
    })
  }


  //BD: Rutas
  // Las RUTAS son las definiciones de las rutas disponibles, ofrecidas por cada conductor,
  // a diferencia de los VIAJES, que son cada uno de los viajes realizados. Cada VIAJE
  // tiene asociado una RUTA, pero cada RUTA puede corresponder a varios VIAJES

  leerRutas() {
    return this.database.executeSql("SELECT * FROM rutas", []).then(res => {
      let items: Ruta[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_ruta: item.id_ruta,
            tiempo_estimado: item.tiempo_estimado,
            origen: item.origen,
            destino: item.destino,
            tarifa: item.tarifa,
            hora_salida: item.hora_salida,
            id_usuario: item.id_usuario
          });
        }
      }
      this.tablaRutas.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Rutas: " + (e as Error).message);
    })
  }

  leerRutaPorId(id: string) {
    return this.database.executeSql("SELECT * FROM rutas WHERE id_ruta = ?", [id]).then(res => {
      if (res.rows.length == 1) {
        return res.rows.item(0);
      }
      return null;
    }).catch(e => {
      this.presentAlert("ERROR al obtener Ruta (ID:" + id + "): " + (e as Error).message);
      return null;
    })
  }

  leerRutasPorUsuario(uID: string) {
    return this.database.executeSql("SELECT * FROM rutas WHERE id_usuario = ?", [uID]).then(res => {
      let items: Ruta[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_ruta: item.id_ruta,
            tiempo_estimado: item.tiempo_estimado,
            origen: item.origen,
            destino: item.destino,
            tarifa: item.tarifa,
            hora_salida: item.hora_salida,
            id_usuario: item.id_usuario
          });
        }
      }
      this.tablaRutas.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Rutas de Usuario (uID:" + uID + "): " + (e as Error).message);
    })
  }

  crearRuta(tiempo_estimado: number, origen: string, destino: string, tarifa: number, hora_salida: string, id_usuario: number) {
    return this.database.executeSql("INSERT INTO rutas (tiempo_estimado, origen, destino, tarifa, hora_salida, id_usuario) VALUES (0, ?, ?, ?, ?, ?)", [origen, destino, tarifa, hora_salida, id_usuario]).then((res) => {

    }).catch((e) => {
      this.presentAlert("ERROR al crear nueva Ruta: " + (e as Error).message);
    })
  }

  eliminarRuta(id: number) {
    return this.database.executeSql("DELETE FROM rutas WHERE id_ruta = ?;", [id]).then((res) => {
    }).catch((e) => {
      this.presentAlert("ERROR al eliminar Ruta (ID:" + id + "): " + (e as Error).message);
    })
  }

  actualizarRuta(id: number, tiempo_estimado: number, origen: string, destino: string, tarifa: number, hora_salida: string, id_usuario: number) {
    return this.database.executeSql("UPDATE rutas SET tiempo_estimado = ?, origen=?, destino = ?, tarifa = ?, hora_salida = ?, id_usuario = ? WHERE id_ruta = ?;", [tiempo_estimado, origen, destino, tarifa, hora_salida, id_usuario, id]).then((res) => {
    }).catch((e) => {
      this.presentAlert("ERROR al actualizar Ruta (ID:" + id + "): " + (e as Error).message);
    })
  }

  //BD: Viajes
  // Las RUTAS son las definiciones de las rutas disponibles, ofrecidas por cada conductor,
  // a diferencia de los VIAJES, que son cada uno de los viajes realizados. Cada VIAJE
  // tiene asociado una RUTA, pero cada RUTA puede corresponder a varios VIAJES

  leerViajes() {
    return this.database.executeSql("SELECT * FROM viajes", []).then(res => {
      let items: Viaje[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_viaje: item.id_viaje,
            fecha: item.fecha,
            tarifa: item.tarifa,
            estado: item.estado,
            id_ruta: item.id_ruta,
            id_pasajero: item.id_pasajero
          });
        }
      }
      this.tablaViajes.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Viajes: " + (e as Error).message);
    })
  }

  leerViajesPorRutaYEstado(rID: string, estado: string) {
    return this.database.executeSql("SELECT * FROM viajes WHERE id_ruta = ? AND estado = ?", [rID, estado]).then(res => {
      let items: Viaje[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_viaje: item.id_viaje,
            fecha: item.fecha,
            tarifa: item.tarifa,
            estado: item.estado,
            id_ruta: item.id_ruta,
            id_pasajero: item.id_pasajero
          });
        }
      }
      this.tablaViajes.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Viajes de Ruta (" + rID + ") y Estado (" + estado + "): " + (e as Error).message);
    })
  }

  contarViajesPorRutaYEstado(rID: string, estado: string) {
    return this.database.executeSql("SELECT COUNT(id_viaje) AS count FROM viajes WHERE id_ruta = ? AND estado = ?", [rID, estado]).then(res => {
      if (res.rows.length == 1) {
        return res.rows.item(0).count;
      }
      return 0;
    }).catch(e => {
      this.presentAlert("ERROR al contar Viajes de Ruta (" + rID + ") y Estado (" + estado + "): " + (e as Error).message);
    })
  }

  crearViaje(tarifa: number, fecha: string, estado: string, id_ruta: string, id_pasajero: number) {
    return this.database.executeSql("INSERT INTO viajes (tarifa, fecha, estado, id_ruta, id_pasajero) VALUES (?, ?, ?, ?, ?);", [tarifa, fecha, estado, id_ruta, id_pasajero]).then((res) => {
    }).catch((e) => {
      this.presentAlert("ERROR al crear nuevo Viaje: " + (e as Error).message);
    })
  }

  actualizarViaje(id_viaje: number, tarifa: number, fecha: string, estado: string, id_ruta: number, id_pasajero: number) {
    return this.database.executeSql("UPDATE viajes SET tarifa = ?, fecha = ?, estado = ?, id_ruta = ?, id_pasajero = ? WHERE id_viaje = ?;", [tarifa, fecha, estado, id_ruta, id_pasajero, id_viaje]).then((res) => {
    }).catch((e) => {
      this.presentAlert("ERROR al actualizar Viaje (id " + id_viaje + "): " + (e as Error).message);
    })
  }

  actualizarViajesPorTermino(id_ruta: number) {
    return this.database.executeSql("UPDATE viajes SET estado = 'completado' WHERE id_ruta = ? AND estado = 'comenzado';", [id_ruta]).then((res) => {
    }).catch((e) => {
      this.presentAlert("ERROR al Terminar Viajes por Ruta (rID " + id_ruta + "): " + (e as Error).message);
    })
  }

  actualizarViajesPorInicio(id_ruta: number) {
    this.actualizarViajesAceptadosPorInicio(id_ruta);
    this.actualizarViajesRechazadosPorInicio(id_ruta);
  }

  actualizarViajesAceptadosPorInicio(id_ruta: number) {
    return this.database.executeSql("UPDATE viajes SET estado = 'comenzado' WHERE id_ruta = ? AND estado = 'aceptado';", [id_ruta]).then((res) => {
    }).catch((e) => {
      this.presentAlert("ERROR al Iniciar Viajes por Ruta (rID " + id_ruta + "): " + (e as Error).message);
    })
  }

  actualizarViajesRechazadosPorInicio(id_ruta: number) {
    return this.database.executeSql("UPDATE viajes SET estado = 'rechazado' WHERE id_ruta = ? AND estado = 'solicitado';", [id_ruta]).then((res) => {
    }).catch((e) => {
      this.presentAlert("ERROR al Rechazar Viajes por Ruta (rID " + id_ruta + "): " + (e as Error).message);
    })
  }

  //BD: Calificaciones

  leerCalificaciones() {
    return this.database.executeSql("SELECT * FROM calificaciones", []).then(res => {
      let items: Calificacion[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let item = res.rows.item(i);
          items.push({
            id_calificacion: item.id_calificacion,
            calificacion: item.calificacion,
            id_viaje: item.id_viaje
          });
        }
      }
      this.tablaCalificaciones.next(items as any)
    }).catch(e => {
      this.presentAlert("ERROR al obtener Calificaciones: " + (e as Error).message);
    })
  }

  crearCalificacion(calificacion: number, id_viaje: number) {
    return this.database.executeSql("INSERT INTO calificaciones (calificacion, id_viaje) VALUES (?, ?);", [calificacion, id_viaje]).then((res) => {
      this.leerCalificaciones();
    }).catch((e) => {
      this.presentAlert("ERROR al crear nueva Calificacion: " + (e as Error).message);
    })
  }

  eliminarCalificacion(id: number) {
    return this.database.executeSql("DELETE FROM calificaciones WHERE id_calificacion = ?;", [id]).then((res) => {
      this.leerCalificaciones();
    }).catch((e) => {
      this.presentAlert("ERROR al eliminar Calificacion (ID:" + id + "): " + (e as Error).message);
    })
  }

}

