import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  mapUrl:string="";
  @Input() viewType:string="";

  constructor() {
  }

  ngOnInit() {}

  ngAfterContentInit(){
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
  }

}
