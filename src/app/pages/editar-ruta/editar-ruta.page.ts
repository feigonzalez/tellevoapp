import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Ruta } from 'src/app/services/ruta';

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.page.html',
  styleUrls: ['./editar-ruta.page.scss'],
})
export class EditarRutaPage implements OnInit {

  ruta? : any;
  newRuta:boolean=false;
  viewType : string = "";
  salidaHora : number = 0;
  salidaMinuto : number = 0;
  formErrors : any = {};

  constructor(private navCtrl:NavController,private router: Router, private activatedRoute: ActivatedRoute,
      private alertController: AlertController, private db: BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras?.state?.['ruta']
        this.viewType=this.router.getCurrentNavigation()?.extras?.state?.['viewType']
        if(this.ruta.id_ruta==-1){
          this.newRuta=true;
        }
      } else {
        this.ruta=new Ruta();
      }
    })
    console.log("@EDI:["+this.viewType+"]")
  }

  async alertaEliminar(){
    const alert = await this.alertController.create({
      header: this.newRuta?'¿Cancelar creación de ruta?':'¿Desea eliminar esta ruta?',
      subHeader:this.newRuta?'':'Esto no se puede deshacer',
      buttons: [{
          text:'Volver',
          role:"cancel",
        },{
          text:'Aceptar',
          role:"confirm",
          cssClass:"color-danger",
          handler:()=>{
            if(!this.newRuta){
              this.db.eliminarRuta(this.ruta.id_ruta);
              //actualiza la lista de rutas para la vista de inicio-conductor
              let uID=localStorage.getItem("uID");
              if(uID) this.db.leerRutasPorUsuario(uID)
              this.db.showToast("Ruta eliminada","success");
            }
            this.navCtrl.navigateBack('/inicio-conductor')
          }
        }
      ],
    });
    await alert.present();
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    if(this.ruta && this.ruta.hora_salida){
      this.salidaHora=this.ruta.hora_salida.substring(0,this.ruta.hora_salida.indexOf(":"));
      this.salidaMinuto=this.ruta.hora_salida.substring(this.ruta.hora_salida.indexOf(":")+1);
    }
  }

  actualizarRuta(){
    console.log("!:actualizarRuta()");
    //guarda los datos de la ruta en la db
    this.formErrors={};
    let valid:boolean=true
    valid=this.validarTarifa()&&valid;
    valid=this.validarHora()&&valid;
    valid=this.validarMinuto()&&valid;
    valid=this.validarOrigen()&&valid;
    valid=this.validarDestino()&&valid;
    if(valid){
      this.ruta.hora_salida=this.salidaHora.toString().padStart(2,'0')+":"+this.salidaMinuto.toString().padStart(2,'0');
      //recalcular tiempo estimado

      //si el id de ruta es -1, es una ruta nueva que debe crearse en la base de datos
      if(this.ruta.id_ruta==-1){
        this.db.crearRuta(0, this.ruta.origen, this.ruta.destino, this.ruta.tarifa, this.ruta.hora_salida, this.ruta.id_usuario);
        this.db.showToast("Ruta creada","success");
      } else {
        //actualizar datos en la db
        this.db.actualizarRuta(this.ruta.id_ruta, this.ruta.tiempo_estimado, this.ruta.origen, this.ruta.destino, this.ruta.tarifa, this.ruta.hora_salida, this.ruta.id_usuario)
        this.db.showToast("Ruta actualizada","success");
      }
      //actualiza la lista de rutas para la vista de inicio-conductor
      let uID=localStorage.getItem("uID");
      if(uID) this.db.leerRutasPorUsuario(uID)

      let ne:any={state:{
        ruta:this.ruta,
        viewType:"view"
      }}
      this.navCtrl.navigateBack('/ver-ruta',ne)
    }
  }

  validarTarifa(){
    let valid=true;
    this.formErrors["tarifa_low"]=false;
    this.formErrors["tarifa_nan"]=false;
    if(isNaN(Number(this.ruta.tarifa)) || this.ruta.tarifa===null){
      this.formErrors["tarifa_nan"]=true; valid=false;}
    if(this.ruta.tarifa<=0){
      this.formErrors["tarifa_low"]=true; valid=false;}
    return valid;
  }

  validarHora(){
    let valid=true;
    this.formErrors["hora_range"]=false;
    this.formErrors["hora_nan"]=false;
    if(isNaN(Number(this.salidaHora)) || this.salidaHora===null){
      this.formErrors["hora_nan"]=true; valid=false;}
    if(this.salidaHora<0 || this.salidaHora>23){
      this.formErrors["hora_range"]=true; valid=false;}
    return valid;
  }

  validarMinuto(){
    let valid=true;
    this.formErrors["minuto_range"]=false;
    this.formErrors["minuto_nan"]=false;
    if(isNaN(Number(this.salidaMinuto)) || this.salidaMinuto===null){
      this.formErrors["minuto_nan"]=true; valid=false;}
    if(this.salidaMinuto<0 || this.salidaMinuto>59){
      this.formErrors["minuto_range"]=true; valid=false;}
    return valid;
  }

  validarOrigen(){
    let valid=true;
    this.formErrors["origen_empty"]=false;
    this.formErrors["origen_notExists"]=false;
    if(this.ruta && this.ruta.origen.trim()==""){
      this.formErrors["origen_empty"]=true; valid=false;}
    //falta validar que el origen sea una dirección válida
    return valid;
  }

  validarDestino(){
    let valid=true;
    this.formErrors["destino_empty"]=false;
    this.formErrors["destino_notExists"]=false;
    if(this.ruta.destino.trim()==""){
      this.formErrors["destino_empty"]=true; valid=false;}
    //falta validar que el destino sea una dirección válida
    return valid;
  }

  eliminarRuta(){
    console.log("!:eliminarRuta()");
    this.alertaEliminar();
  }

}
