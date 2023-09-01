import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras?.state?.['ruta']
        this.viewType=this.router.getCurrentNavigation()?.extras?.state?.['viewType']
        console.log("SM2:["+this.salidaMinuto+"]")
      }
    })
    console.log("@EDI:["+this.viewType+"]")
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
    let ne:any={state:{
      ruta:this.ruta
    }}
    ne.state.ruta.horaSalida=this.salidaHora+":"+this.salidaMinuto;
    this.router.navigate(['/ver-ruta'],ne)
  }

}
