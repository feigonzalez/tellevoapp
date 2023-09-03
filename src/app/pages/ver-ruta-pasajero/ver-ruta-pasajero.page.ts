import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-ruta-pasajero', // Cambia el selector del componente
  templateUrl: './ver-ruta-pasajero.page.html', // Actualiza la ruta del archivo HTML
  styleUrls: ['./ver-ruta-pasajero.page.scss'], // Actualiza la ruta del archivo de estilos
})
export class VerRutaPasajeroPage implements OnInit {

  ruta?: any;
  viewType: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.ruta = this.router.getCurrentNavigation()?.extras.state?.['ruta']
        this.viewType = this.router.getCurrentNavigation()?.extras?.state?.['viewType']
        if (this.viewType == "new") this.editarRuta("new")
      }
    })
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  editarRuta(viewType?: string) {
    console.log("!:editarRuta()");
    let ne: any = {
      state: {
        ruta: this.ruta,
        viewType: viewType ? viewType : "edit",
      }
    }
    this.router.navigate(['/editar-ruta-pasajero'], ne); 
  }

  comenzarViaje() {
    console.log("!:comenzarViaje()");
    let ne: any = {
      state: {
        ruta: this.ruta,
        viewType: this.viewType
      }
    }
    this.router.navigate(['/viaje-pasajero'], ne); 
  }
}
