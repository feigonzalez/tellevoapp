import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Ruta } from 'src/app/services/ruta';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-ver-ruta-pasajero', // Cambia el selector del componente
  templateUrl: './ver-ruta-pasajero.page.html', // Actualiza la ruta del archivo HTML
  styleUrls: ['./ver-ruta-pasajero.page.scss'], // Actualiza la ruta del archivo de estilos
})
export class VerRutaPasajeroPage implements OnInit {

  conductor!:Usuario;
  ruta?: any;
  viewType: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private db:BdserviceService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.ruta = this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.conductor = this.router.getCurrentNavigation()?.extras.state?.['conductor']
        this.viewType = this.router.getCurrentNavigation()?.extras?.state?.['viewType']
      } else {
        this.ruta= new Ruta();
        this.conductor= new Usuario();
      }
    })
  }

  async ngOnInit() {
  }

  async ngAfterContentInit() {
  }

  solicitarViaje() {
    console.log("!:solicitarViaje()");
    //insert new VIAJE, with values ID_VIAJE:AUTO, TARIFA:RUTA.TARIFA, FECHA:NOW(), ESTADO:'solicitado', ID_RUTA:RUTA.ID_RUTA, ID_PASAJERO:UID
    let uID=localStorage.getItem("uID");
    if(uID) this.db.crearViaje(this.ruta.tarifa, this.db.getCurrentDatestring(), 'solicitado', this.ruta.id_ruta, parseInt(uID))
    let ne: any = {
      state: {
        ruta: this.ruta,
        viewType: this.viewType
      }
    }
    this.router.navigate(['/viaje-pasajero'], ne); 
  }

  abrirChat(uID:string){
    let ne={state:{
      id_pareja:uID
    }}
    this.router.navigate(['/mensaje-pasajero'],ne)
  }
}
