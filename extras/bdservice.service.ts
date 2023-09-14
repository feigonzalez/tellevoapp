import { Injectable } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticia } from './noticia';


@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database!:SQLiteObject;

  tablaNoticia = new BehaviorSubject([]);

  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);

  createTableStmt="CREATE TABLE IF NOT EXISTS noticia (id INTEGER PRIMARY KEY AUOINCREMENT, titulo VARCHAR(100) NOT NUL, texto VARCHAR(300) NOT NULL);";
  populateTableStmt="INSERT OR IGNORE INTO noticia (id, titulo, texto) VALUES (1,'Soy un titulo','Soy un texto largo de noticia');";
  
  constructor(private sqlite:SQLite, private platform: Platform,private alertController:AlertController) { 
    this.crearDB();
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  dbState(){
    return this.isDBReady.asObservable();

  }

  fetchNoticias(): Observable<Noticia[]>{
    return this.tablaNoticia.asObservable();
  }

  crearDB(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name:"bdnoticia.db",
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
      await this.database.executeSql(this.createTableStmt,[]);
      await this.database.executeSql(this.populateTableStmt,[]);
      this.isDBReady.next(true)
      //se ejecuta buscar() aquí para probarla
      this.buscar()
    } catch(e){
      this.presentAlert("ERROR al crear tablas: "+ e);
    }
  }

  buscar(){
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
      this.presentAlert("ERROR al buscar en 'noticias': "+ e);
    })
  }

  agregar(titulo:any, texto:any){
    return this.database.executeSql("INSERT INTO noticia (titulo, texto) VALUES (?, ?);",[titulo, texto]).then((res)=>{
      this.buscar();
    }).catch((e)=>{
      this.presentAlert("ERROR al insertar en 'noticias': "+ e);
    })
  }

  eliminar(id:any){
    return this.database.executeSql("DELETE FROM noticia WHERE id = ?;",[id]).then((res)=>{
      this.buscar();
    }).catch((e)=>{
      this.presentAlert("ERROR al eliminar desde 'noticias': "+ e);
    })
  }

  modificar(id:any, titulo:any, texto:any){
    return this.database.executeSql("UPDATE noticia SET titulo = ?, texto = ? WHERE id = ?;",[titulo, texto, id]).then((res)=>{
      this.buscar();
    }).catch((e)=>{
      this.presentAlert("ERROR al modificar 'noticias': "+ e);
    })
  }
}

