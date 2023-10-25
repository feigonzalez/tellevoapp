import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-ver-ruta',
  templateUrl: './ver-ruta.page.html',
  styleUrls: ['./ver-ruta.page.scss'],
})
export class VerRutaPage implements OnInit {

  ruta? : any;
  viewType : string="";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private db: BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.ruta=this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.viewType=this.router.getCurrentNavigation()?.extras?.state?.['viewType']
        if(this.viewType=="new") this.editarRuta("new")
      }
    })
  }

  async ngOnInit() {
  }

  async ngAfterContentInit(){
  }

  editarRuta(viewType?:string){
    console.log("!:editarRuta()");
    let ne:any={state:{
      ruta:this.ruta,
      viewType:viewType?viewType:"edit",
    }}
    this.router.navigate(['/editar-ruta'],ne)
  }

  administrarViaje(){
    console.log("!:administrarViaje()");
    let ne:any={state:{
      ruta:this.ruta
    }}
    this.router.navigate(['/administrar-viaje'],ne)
  }
}
