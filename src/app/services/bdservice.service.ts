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

  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);

  tablaRolesStmt="CREATE TABLE IF NOT EXISTS roles (id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(25));";
  tablaUsuariosStmt="CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, numero_cel VARCHAR(25) NOT NULL, id_rol INTEGER NOT NULL, FOREIGN KEY(id_rol) REFERENCES roles(id_rol));";
  tablaVehiculosStmt="CREATE TABLE IF NOT EXISTS vehiculos (patente VARCHAR(10) PRIMARY KEY, color VARCHAR(25) NOT NULL, n_asientos INTEGER NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario));";
  tablaViajesStmt="CREATE TABLE IF NOT EXISTS viajes(id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, tiempo_estimado INTEGER NOT NULL, destino VARCHAR(100) NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario))";
  tablaCalificacionesStmt="CREATE TABLE IF NOT EXISTS calificaciones (id_calificacion INTEGER PRIMARY KEY AUTOINCREMENT, calificacion FLOAT NOT NULL, id_usuario INTEGER NOT NULL, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario));";
  tablaDetalleViajesStmt="CREATE TABLE IF NOT EXISTS detalle_viajes (id_viaje INTEGER NOT NULL, f_viaje DATE NOT NULL, FOREIGN KEY(id_viaje) REFERENCES viajes(id_viaje));";
  
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

  crearDB(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name:"bdtellevo.db",
        location:"default"
      }).then((db: SQLiteObject)=>{
        this.database = db;
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert("ERROR al crear DB: "+ e);
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
      //await this.database.executeSql(this.populateTableStmt,[]);
      this.isDBReady.next(true)
    } catch(e){
      this.presentAlert("ERROR al crear tablas: "+ (e as Error).message);
    }
  }

  /*buscar(){
    return this.database.executeSql("SELECT * FROM noticia;",[]).then((res)=>{
      let items: Noticia[] = [];
      if(res.rows.length > 0){
        for(var i=0 ; i<res.rows.length ; i++){
          items.push({
            id: res.rows.item(i).id,
            titulo: res.rows.item(i).titulo,
            texto: res.rows.item(i).texto
          });
        }
      }
      this.tablaNoticia.next(items as any);
    }).catch((e)=>{
      this.presentAlert("ERROR al buscar en 'noticias': "+ (e as Error).message);
    })
  }

  agregar(titulo:any, texto:any){
    return this.database.executeSql("INSERT INTO noticia (titulo, texto) VALUES (?, ?);",[titulo, texto]).then((res)=>{
      this.buscar();
    }).catch((e)=>{
      this.presentAlert("ERROR al insertar en 'noticias': "+ (e as Error).message);
    })
  }

  eliminar(id:any){
    return this.database.executeSql("DELETE FROM noticia WHERE id = ?;",[id]).then((res)=>{
      this.buscar();
    }).catch((e)=>{
      this.presentAlert("ERROR al eliminar desde 'noticias': "+ (e as Error).message);
    })
  }

  modificar(id:any, titulo:any, texto:any){
    return this.database.executeSql("UPDATE noticia SET titulo = ?, texto = ? WHERE id = ?;",[titulo, texto, id]).then((res)=>{
      this.buscar();
    }).catch((e)=>{
      this.presentAlert("ERROR al modificar 'noticias': "+ (e as Error).message);
    })
  }*/
}

