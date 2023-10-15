import { Component, OnInit, Input } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  mapUrl:string="";
  @Input() viewType:string="";

  constructor(private db:BdserviceService) {
  }

  ngOnInit() {}

  async ngAfterContentInit(){
    console.log("@MAP:["+this.viewType+"]")
    switch(this.viewType){
      case "view":
        this.mapUrl = "assets/map_route.png";
        break;
      case "edit":
        this.mapUrl = "assets/map_route_edit.png";
        break;
      case "new":
        this.mapUrl = "assets/map.png";
        break;
      default:
        this.mapUrl = "assets/map.png";
        break;
    }
    Geolocation.getCurrentPosition().then(pos=>{
      this.db.presentAlert(pos.coords.latitude+" "+pos.coords.longitude);
    });
  }

}
