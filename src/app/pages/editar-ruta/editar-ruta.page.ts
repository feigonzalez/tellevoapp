import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

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
      private alertController: AlertController,private toastController: ToastController) {
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
    this.salidaHora=this.ruta.horaSalida.substring(0,this.ruta.horaSalida.indexOf(":"));
    this.salidaMinuto=this.ruta.horaSalida.substring(this.ruta.horaSalida.indexOf(":")+1);
  }

  actualizarRuta(){
    console.log("!:actualizarRuta()");
    //guarda los datos de la ruta en la db
    this.formErrors={};
    let valid:boolean=true;
    valid=valid&&this.validarTarifa();
    valid=valid&&this.validarHora();
    valid=valid&&this.validarMinuto();
    if(this.ruta.nombre.trim()==""){
      this.showToast("Nombre de la Ruta no puede estar vacío","danger");
    } else {
      if(valid){
        //actualizar datos en la db
        this.showToast("Ruta actualizada","success");
        let ne:any={state:{
          ruta:this.ruta,
          viewType:"view"
        }}
        ne.state.ruta.horaSalida=this.salidaHora+":"+this.salidaMinuto;
        this.router.navigate(['/ver-ruta'],ne)
      }
    }
  }

  validarTarifa(){
    let valid=true;
    this.formErrors["tarifa_low"]=false;
    if(this.ruta.tarifa<=0){
      this.formErrors["tarifa_low"]=true; valid=false;}
    return valid;
  }

  validarHora(){
    let valid=true;
    this.formErrors["hora_range"]=false;
    if(this.salidaHora<0 || this.salidaHora>23){
      this.formErrors["hora_range"]=true; valid=false;}
    return valid;
  }

  validarMinuto(){
    let valid=true;
    this.formErrors["minuto_range"]=false;
    if(this.salidaMinuto<0 || this.salidaMinuto>59){
      this.formErrors["minuto_range"]=true; valid=false;}
    return valid;
  }

  eliminarRuta(){
    console.log("!:eliminarRuta()");
    this.alertaEliminar();
  }

}
