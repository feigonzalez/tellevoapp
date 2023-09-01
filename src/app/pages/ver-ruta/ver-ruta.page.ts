import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-ruta',
  templateUrl: './ver-ruta.page.html',
  styleUrls: ['./ver-ruta.page.scss'],
})
export class VerRutaPage implements OnInit {

  ruta? : any;
  viewType : string="";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.viewType=this.router.getCurrentNavigation()?.extras?.state?.['viewType']
        if(this.viewType=="new") this.editarRuta("new")
      }
    })
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
  }

  editarRuta(viewType?:string){
    console.log("!:editarRuta()");
    let ne:any={state:{
      ruta:this.ruta,
      viewType:viewType?viewType:"edit",
    }}
    this.router.navigate(['/editar-ruta'],ne)
  }

  comenzarViaje(){
    console.log("!:comenzarViaje()");
    //se comunica a los pasajeros suscritos al viaje que éste ha comenzado.
    //redirige a "viajeConductor"
  }
}
