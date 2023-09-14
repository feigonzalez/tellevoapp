import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  arregloNoticias: any = [
    {
      id: '',
      titulo: '',
      texto: ''
    }

  ]

  constructor(private db: BdserviceService, private router:Router ){ }

  ngOnInit() {
    this.db.dbState().subscribe((res)=>{
      if(res){
        this.db.fetchNoticias().subscribe((items)=>{
          this.arregloNoticias = items;
        })
      }
    })

  }

  modificar(x:any){
    let navExtras:NavigationExtras={
      state:{
        idEnviado: x.id,
        tituloEnviado: x.titulo,
        textoEnviado: x.texto
      }
    }
    this.router.navigate(['/modificar'],navExtras)
  }

  eliminar(x:any){
    this.db.eliminar(x.id);
    this.db.presentAlert("Noticia Eliminada");
  }
  
}
