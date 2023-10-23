import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.page.html',
  styleUrls: ['./editar-ruta.page.scss'],
})
export class EditarRutaPage implements OnInit {

  ruta? : any;
  viewType : string = "";
  salidaHora : number = 0;
  salidaMinuto : number = 0;
  formErrors : any = {};

  constructor(private location:Location,private router: Router, private activatedRoute: ActivatedRoute,
      private alertController: AlertController,private toastController: ToastController, private db: BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras?.state?.['ruta']
        this.viewType=this.router.getCurrentNavigation()?.extras?.state?.['viewType']
        console.log("SM2:["+this.salidaMinuto+"]")
      }
    })
    console.log("@EDI:["+this.viewType+"]")
  }

  async showToast(text:string,type:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000,
      position: 'bottom',
      color: type,
      buttons:[{
        icon:"close",
        role:"cancel"
      }]
    });
    await toast.present();
  }

  async alertaEliminar() {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar esta ruta?',
      subHeader:'Esto no se puede deshacer',
      buttons: [{
          text:'Cancelar',
          role:"cancel",
        },{
          text:'Confirmar',
          role:"confirm",
          cssClass:"color-danger",
          handler:()=>{
            this.location.back();
            this.location.back();
          }
        }
      ],
    });
    await alert.present();
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.salidaHora=this.ruta.hora_salida.substring(0,this.ruta.hora_salida.indexOf(":"));
    this.salidaMinuto=this.ruta.hora_salida.substring(this.ruta.hora_salida.indexOf(":")+1);
  }

  actualizarRuta(){
    console.log("!:actualizarRuta()");
    //guarda los datos de la ruta en la db
    this.formErrors={};
    let valid:boolean=true;
    valid=valid&&this.validarTarifa();
    valid=valid&&this.validarHora();
    valid=valid&&this.validarMinuto();
    if(valid){
      //actualizar datos en la db
      //recalcular tiempo estimado
      this.ruta.hora_salida=this.salidaHora.toString().padStart(2,'0')+":"+this.salidaMinuto.toString().padStart(2,'0');
      this.db.actualizarRuta(this.ruta.id_ruta, this.ruta.tiempo_estimado, this.ruta.origen, this.ruta.destino, this.ruta.tarifa, this.ruta.hora_salida, this.ruta.id_usuario)
      this.showToast("Ruta actualizada","success");
      //actualiza la lista de rutas para la vista de inicio-conductor
      let uID=localStorage.getItem("uID");
      if(uID) this.db.leerRutasPorUsuario(uID)
      let ne:any={state:{
        ruta:this.ruta,
        viewType:"view"
      }}
      ne.state.ruta.horaSalida=String(this.salidaHora).padStart(2,"0")+":"+String(this.salidaMinuto).padStart(2,"0");
      this.router.navigate(['/ver-ruta'],ne)
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

  eliminarRuta(){
    console.log("!:eliminarRuta()");
    this.alertaEliminar();
  }

}
