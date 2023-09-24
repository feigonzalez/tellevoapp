import { Injectable } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Usuario } from './usuario';
import { Vehiculo } from './vehiculo';
import { Viaje } from './viaje';
import { Calificacion } from './calificacion';
import { DetalleViaje } from './detalle-viaje';
import { Mensaje } from './mensaje';


@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database!:SQLiteObject;

  tablaRoles = new BehaviorSubject([]);
  tablaUsuarios = new BehaviorSubject([]);
  tablaVehiculos = new BehaviorSubject([]);
  tablaViajes = new BehaviorSubject([]);
  tablaCalificaciones = new BehaviorSubject([]);
  tablaDetalleViajes = new BehaviorSubject([]);
  tablaMensajes = new BehaviorSubject([]);

  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);

  tablaRolesStmt="CREATE TABLE IF NOT EXISTS roles (id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(25) NOT NULL);";
  tablaUsuariosStmt="CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, numero_cel VARCHAR(25) NOT NULL, id_rol INTEGER NOT NULL, FOREIGN KEY(id_rol) REFERENCES roles(id_rol));";
  tablaVehiculosStmt="CREATE TABLE IF NOT EXISTS vehiculos (id_vehiculo INTEGER PRIMARY KEY AUTOINCREMENT, patente VARCHAR(10) NOT NULL, color VARCHAR(25) NOT NULL, n_asientos INTEGER NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario));";
  tablaViajesStmt="CREATE TABLE IF NOT EXISTS viajes(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, tiempo_estimado INTEGER NOT NULL, destino VARCHAR(100) NOT NULL, tarifa INTEGER NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario))";
  tablaCalificacionesStmt="CREATE TABLE IF NOT EXISTS calificaciones (id_calificacion INTEGER PRIMARY KEY AUTOINCREMENT, calificacion FLOAT NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario));";
  tablaDetalleViajesStmt="CREATE TABLE IF NOT EXISTS detalle_viajes (id_viaje INTEGER NOT NULL, f_viaje DATE NOT NULL, FOREIGN KEY(id_viaje) REFERENCES viajes(id_viaje));";
  tablaMensajesStmt="CREATE TABLE IF NOT EXISTS mensajes (id_mensaje INTEGER PRIMARY KEY AUTOINCREMENT, id_remitente INTEGER NOT NULL, id_destinatario INTEGER NOT NULL, fecha TIMESTAMP, texto VARCHAR(1000) NOT NULL);";

  poblarRolesStmts=[
    "INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'Conductor');",
    "INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (2, 'Pasajero');"
  ];
  poblarUsuariosStmts=[
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, id_rol) VALUES (1, 'Juan Carlos Bodoque', 'jbodoque@aplaplac.com', 'pass', '+56900000001', 1)",
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, id_rol) VALUES (2, 'Patana Trufillo', 'ptrufillo@aplaplac.com', 'pass', '+56900000002', 2)",
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, id_rol) VALUES (3, 'Tulio Triviño', 'ttrivino@aplaplac.com', 'pass', '+56900000003', 2)",
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, id_rol) VALUES (4, 'Patana Trufillo', 'ptrufillo@aplaplac.com', 'pass', '+56900000004', 2)",
    "INSERT OR IGNORE INTO usuarios (id_usuario, nombre, correo, password, numero_cel, id_rol) VALUES (5, 'Freddy Turbina', 'fturbina@aplaplac.com', 'pass', '+56900000005', 1)",
  ];
  
  constructor(private sqlite:SQLite, private platform: Platform,private alertController:AlertController) { 
    this.crearDB();
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  dbState(){ return this.isDBReady.asObservable(); }

  fetchRoles(): Observable<Rol[]>{ return this.tablaRoles.asObservable(); }
  fetchUsuarios(): Observable<Usuario[]>{ return this.tablaUsuarios.asObservable(); }
  fetchVehiculos(): Observable<Vehiculo[]>{ return this.tablaVehiculos.asObservable(); }
  fetchViajes(): Observable<Viaje[]>{ return this.tablaViajes.asObservable(); }
  fetchCalificaciones(): Observable<Calificacion[]>{ return this.tablaCalificaciones.asObservable(); }
  fetchDetalleViajes(): Observable<DetalleViaje[]>{ return this.tablaDetalleViajes.asObservable(); }
  fetchMensajes(): Observable<Mensaje[]>{ return this.tablaDetalleViajes.asObservable(); }

  crearDB(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name:"bdtellevo.db",
        location:"default"
      }).then((db: SQLiteObject)=>{
        this.database = db;
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert("ERROR al crear DB: "+ (e as Error).message);
      })
    })
  }

  async crearTablas(){
    try{
      await this.database.executeSql(this.tablaRolesStmt,[]);
      await this.database.executeSql(this.tablaUsuariosStmt,[]);
      await this.database.executeSql(this.tablaVehiculosStmt,[]);
      await this.database.executeSql(this.tablaViajesStmt,[]);
      await this.database.executeSql(this.tablaCalificacionesStmt,[]);
      await this.database.executeSql(this.tablaDetalleViajesStmt,[]);
      await this.database.executeSql(this.tablaMensajesStmt,[]);
      for(var stmt of this.poblarRolesStmts){
        await this.database.executeSql(stmt,[]);
      }
      for(var stmt of this.poblarUsuariosStmts){
        await this.database.executeSql(stmt,[]);
      }
      this.isDBReady.next(true)
    } catch(e){
      this.presentAlert("ERROR al crear tablas: "+ (e as Error).message);
    }
  }

//BD: Roles

  leerRoles(){
    return this.database.executeSql("SELECT * FROM roles",[]).then(res=>{
      let items:Rol[] = [];
      if(res.rows.length>0){
        for(var i=0;i<res.rows.length;i++){
          let item=res.rows.item(i);
          items.push({
            id_rol: item.id,
            nombre_rol: item.nombre_rol
          });
        }
      }
      this.tablaRoles.next(items as any)
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Roles: " + (e as Error).message);
    })
  }

//BD: Usuarios

  leerUsuarios(){
    return this.database.executeSql("SELECT * FROM usuarios",[]).then(res=>{
      let items:Usuario[] = [];
      if(res.rows.length>0){
        for(var i=0;i<res.rows.length;i++){
          let item=res.rows.item(i);
          items.push({
            id_usuario:item.id_usuario,
            nombre:item.nombre,
            correo: item.correo,
            password: item.pass,
            numero_cel:item.numero_cel,
            id_rol: item.id
          });
        }
      }
      this.tablaUsuarios.next(items as any)
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Usuarios: " + (e as Error).message);
    })
  }
  
  leerUsuarioPorId(id:number){
    return this.database.executeSql("SELECT * FROM usuarios WHERE id_usuario = ?",[id]).then(res=>{
      if(res.rows.length==1){
        return res.rows.item(0);
      }
      return null;
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Usuario (ID:"+id+"): " + (e as Error).message);
      return null;
    })
  }
  
  leerUsuarioPorCorreo(correo:string){
    return this.database.executeSql("SELECT * FROM usuarios WHERE LOWER(correo) = ?",[correo]).then(res=>{
      if(res.rows.length==1){
        return res.rows.item(0);
      }
      return null;
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Usuario (Correo:"+correo+"): " + (e as Error).message);
      return null;
    })
  }

  crearUsuario(nombre:string, correo:string, pass:string, telefono:string, id_rol:number){
    return this.database.executeSql("INSERT INTO usuarios (nombre, correo, password, numero_cel, id_rol) VALUES (?, ?, ?, ?, ?);",[nombre, correo, pass, telefono, id_rol]).then((res)=>{
      this.leerUsuarios();
    }).catch((e)=>{
      this.presentAlert("ERROR al crear nuevo Usuario: "+ (e as Error).message);
    })
  }

  eliminarUsuario(id:number){
    return this.database.executeSql("DELETE FROM usuarios WHERE id_usuario = ?;",[id]).then((res)=>{
      this.leerUsuarios();
    }).catch((e)=>{
      this.presentAlert("ERROR al eliminar Usuario (ID:"+id+"): "+ (e as Error).message);
    })
  }

  actualizarUsuario(id:number, nombre:string, correo:string, pass:string, numero_cel:string){
    return this.database.executeSql("UPDATE usuarios SET nombre = ?, correo = ?, password = ?, numero_cel = ? WHERE id_usuario = ?;",[nombre, correo, pass, numero_cel, id]).then((res)=>{
      this.leerUsuarios();
    }).catch((e)=>{
      this.presentAlert("ERROR al actualizar Usuario (ID:"+id+"): "+ (e as Error).message);
    })
  }

// BD: Mensajes

  leerMensajes(){
    return this.database.executeSql("SELECT * FROM mensajes",[]).then(res=>{
      let items:Mensaje[] = [];
      if(res.rows.length>0){
        for(var i=0;i<res.rows.length;i++){
          let item=res.rows.item(i);
          items.push({
            id_mensaje: item.id_mensaje,
            id_remitente:item.id_remitente,
            id_destinatario:item.id_destinatario,
            fecha: item.fecha,
            texto: item.texto
          });
        }
      }
      this.tablaMensajes.next(items as any)
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Mensajes: " + (e as Error).message);
    })
  }
  
  leerConversacion(user1:number,user2:number){
    return this.database.executeSql("SELECT * FROM mensajes WHERE (id_destinatario = ? AND id_remitente = ?) OR (id_destinatario = ? AND id_remitente = ?)",[user1, user2, user2, user1]).then(res=>{
      let items:Mensaje[] = [];
      if(res.rows.length>0){
        for(var i=0;i<res.rows.length;i++){
          let item=res.rows.item(i);
          items.push({
            id_mensaje: item.id_mensaje,
            id_remitente:item.id_remitente,
            id_destinatario:item.id_destinatario,
            fecha: item.fecha,
            texto: item.texto
          });
        }
      }
      this.tablaMensajes.next(items as any)
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Mensajes: " + (e as Error).message);
    })
  }

  crearMensaje(id_remitente:number, id_destinatario:number, texto:string){
    return this.database.executeSql("INSERT INTO mensajes (id_remitente, id_destinatario, fecha, texto) VALUES (?, ?, time('now'), ?)",[id_remitente, id_destinatario, texto]).then((res)=>{
      this.leerMensajes();
    }).catch((e)=>{
      this.presentAlert("ERROR al crear nuevo Mensaje: "+ (e as Error).message);
    })
  }

  eliminarMensaje(id:number){
    return this.database.executeSql("DELETE FROM mensajes WHERE id_mensaje = ?;",[id]).then((res)=>{
      this.leerMensajes();
    }).catch((e)=>{
      this.presentAlert("ERROR al eliminar Mensaje (ID:"+id+"): "+ (e as Error).message);
    })
  }

//BD: Vehiculos

  leerVehiculos(){
    return this.database.executeSql("SELECT * FROM vehiculos",[]).then(res=>{
      let items:Vehiculo[] = [];
      if(res.rows.length>0){
        for(var i=0;i<res.rows.length;i++){
          let item=res.rows.item(i);
          items.push({
            id_vehiculo: item.id_vehiculo,
            patente:item.patente,
            color: item.color,
            n_asientos: item.n_asientos,
            id_usuario: item.id_usuario
          });
        }
      }
      this.tablaVehiculos.next(items as any)
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Vehiculos: " + (e as Error).message);
    })
  }

  crearVehiculo(patente:string, color:string, n_asientos:number, id_usuario:number){
    return this.database.executeSql("INSERT INTO vehiculos (patente, color, n_asientos, id_usuario) VALUES (?, ?, ?, ?);",[patente, color, n_asientos, id_usuario]).then((res)=>{
      this.leerVehiculos();
    }).catch((e)=>{
      this.presentAlert("ERROR al crear nuevo Vehiculo: "+ (e as Error).message);
    })
  }

  eliminarVehiculo(id:number){
    return this.database.executeSql("DELETE FROM vehiculos WHERE id_vehiculo = ?;",[id]).then((res)=>{
      this.leerVehiculos();
    }).catch((e)=>{
      this.presentAlert("ERROR al eliminar Vehiculos (ID:"+id+"): "+ (e as Error).message);
    })
  }

  actualizarVehiculo(id:number, patente:string, color:string, n_asientos:number, id_usuario:number){
    return this.database.executeSql("UPDATE vehiculos SET patente = ?, color = ?, n_asientos = ?, id_usuario = ? WHERE id_vehiculo = ?;",[patente, color, n_asientos, id_usuario, id]).then((res)=>{
      this.leerUsuarios();
    }).catch((e)=>{
      this.presentAlert("ERROR al actualizar Vehiculo (ID:"+id+"): "+ (e as Error).message);
    })
  }

  //BD: Viajes
  
  leerViajes(){
    return this.database.executeSql("SELECT * FROM viajes",[]).then(res=>{
      let items:Viaje[] = [];
      if(res.rows.length>0){
        for(var i=0;i<res.rows.length;i++){
          let item=res.rows.item(i);
          items.push({
            id_viaje:item.id_viaje,
            tiempo_estimado:item.tiempo_estimado,
            destino:item.destino,
            tarifa:item.tarifa,
            id_usuario:item.id_usuario
          });
        }
      }
      this.tablaViajes.next(items as any)
    }).catch(e=>{
      this.presentAlert("ERROR al obtener Viajes: " + (e as Error).message);
    })
  }
  
  crearViaje(tiempo_estimado:number, destino:string, tarifa:number, id_usuario:number){
    return this.database.executeSql("INSERT INTO viajes (tiempo_estimado, destino, tarifa, id_usuario) VALUES (?, ?, ?, ?);",[tiempo_estimado, destino, tarifa, id_usuario]).then((res)=>{
      this.leerViajes();
    }).catch((e)=>{
      this.presentAlert("ERROR al crear nuevo Viaje: "+ (e as Error).message);
    })
  }
  
  eliminarViaje(id:number){
    return this.database.executeSql("DELETE FROM viajes WHERE id_viaje = ?;",[id]).then((res)=>{
      this.leerViajes();
    }).catch((e)=>{
      this.presentAlert("ERROR al eliminar Viaje (ID:"+id+"): "+ (e as Error).message);
    })
  }
  
  actualizarViaje(id:number, tiempo_estimado:number, destino:string, tarifa:number, id_usuario:number){
    return this.database.executeSql("UPDATE vehiculos SET tiempo_estimado = ?, destino = ?, tarifa = ?, id_usuario = ? WHERE id_viaje = ?;",[tiempo_estimado, destino, tarifa, id_usuario, id]).then((res)=>{
      this.leerViajes();
    }).catch((e)=>{
      this.presentAlert("ERROR al actualizar Viaje (ID:"+id+"): "+ (e as Error).message);
    })
  }

//BD: Calificaciones

leerCalificaciones(){
  return this.database.executeSql("SELECT * FROM calificaciones",[]).then(res=>{
    let items:Calificacion[] = [];
    if(res.rows.length>0){
      for(var i=0;i<res.rows.length;i++){
        let item=res.rows.item(i);
        items.push({
          id_calificacion:item.id_calificacion,
          calificacion:item.calificacion,
          id_usuario:item.id_usuario
        });
      }
    }
    this.tablaCalificaciones.next(items as any)
  }).catch(e=>{
    this.presentAlert("ERROR al obtener Calificaciones: " + (e as Error).message);
  })
}

crearCalificacion(calificacion:number, id_usuario:number){
  return this.database.executeSql("INSERT INTO calificaciones (calificacion, id_usuario) VALUES (?, ?);",[calificacion, id_usuario]).then((res)=>{
    this.leerCalificaciones();
  }).catch((e)=>{
    this.presentAlert("ERROR al crear nueva Calificacion: "+ (e as Error).message);
  })
}

eliminarCalificacion(id:number){
  return this.database.executeSql("DELETE FROM calificaciones WHERE id_calificacion = ?;",[id]).then((res)=>{
    this.leerCalificaciones();
  }).catch((e)=>{
    this.presentAlert("ERROR al eliminar Calificacion (ID:"+id+"): "+ (e as Error).message);
  })
}

//BD: Detalle Viajes

leerDetalleViajes(){
  return this.database.executeSql("SELECT * FROM detalleViajes",[]).then(res=>{
    let items:DetalleViaje[] = [];
    if(res.rows.length>0){
      for(var i=0;i<res.rows.length;i++){
        let item=res.rows.item(i);
        items.push({
          id_viaje:item.id_viaje,
          f_viaje:item.f_viaje
        });
      }
    }
    this.tablaDetalleViajes.next(items as any)
  }).catch(e=>{
    this.presentAlert("ERROR al obtener Detalle de Viajes: " + (e as Error).message);
  })
}

crearDetalleViaje(id_viaje:string){
  return this.database.executeSql("INSERT INTO detalleViajes (id_viaje, f_viaje) VALUES (?, date('now'));",[id_viaje]).then((res)=>{
    this.leerDetalleViajes();
  }).catch((e)=>{
    this.presentAlert("ERROR al crear nuevo Detalle de Viaje: "+ (e as Error).message);
  })
}

}

