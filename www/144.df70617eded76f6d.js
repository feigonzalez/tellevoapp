"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[144],{144:(M,p,c)=>{c.r(p),c.d(p,{InicioPasajeroPageModule:()=>j});var d=c(6814),l=c(95),i=c(3614),g=c(9351),h=c(5861),e=c(9468),m=c(1125),f=c(118);function P(o,r){if(1&o&&(e.TgZ(0,"ion-card")(1,"ion-card-header"),e._uU(2),e.qZA(),e.TgZ(3,"ion-card-content"),e._uU(4),e.qZA()()),2&o){const a=e.oxw();e.xp6(2),e.hij(" ",a.weatherData.name," "),e.xp6(2),e.hij(" Temperatura: ",a.weatherData.main.temp,"\xb0K ")}}function b(o,r){if(1&o){const a=e.EpF();e.TgZ(0,"ion-item",21),e.NdJ("click",function(){const s=e.CHM(a).$implicit,u=e.oxw();return e.KtG(u.verRuta(s.id_ruta))}),e.TgZ(1,"ion-label",22)(2,"div"),e._uU(3),e.qZA(),e.TgZ(4,"div"),e._uU(5),e.qZA()(),e.TgZ(6,"ion-label",23),e._uU(7),e.qZA()()}if(2&o){const a=r.$implicit;e.xp6(3),e.Oqu(a.origen),e.xp6(2),e.hij("\u2192 ",a.destino,""),e.xp6(2),e.Oqu(a.hora_salida)}}const v=function(){return["/perfil-pasajero"]},_=function(){return["/buzon-pasajero"]},I=[{path:"",component:(()=>{var o;class r{constructor(n,t,s,u,C){this.router=n,this.fb=t,this.toastController=s,this.weatherService=u,this.db=C,this.rutas={},this.usuario={},this.city="Santiago",this.apiKey="ffe31d51024efac03faf1902e771d2b4",this.apiUrl="https://api.openweathermap.org/data/2.5/weather",this.imagen=null,this.contrasenaActual="",this.nuevaContrasena="",this.confirmarNuevaContrasena="",this.usuario.imagen=null}ngOnInit(){this.db.dbState().subscribe(n=>{n&&(this.db.fetchRutas().subscribe(t=>{this.rutas=t}),this.loadUsuario(),this.loadRutas())})}getWeather(n){this.weatherService.getWeather(n).subscribe(t=>{this.weatherData=t,console.log(this.weatherData)})}loadUsuario(){var n=this;return(0,h.Z)(function*(){let t=localStorage.getItem("uID");t&&(n.usuario=yield n.db.leerUsuarioPorID(t))})()}loadRutas(){var n=this;return(0,h.Z)(function*(){n.db.leerRutas()})()}verRuta(n){var t=this;return(0,h.Z)(function*(){console.log("!:verRutaPasajero("+n+")");let s=yield t.db.leerRutaPorId(n),u={state:{ruta:s,conductor:yield t.db.leerUsuarioPorID(s.id_usuario),viewType:"view"}};t.router.navigate(["/ver-ruta-pasajero"],u)})()}salirCuenta(){localStorage.removeItem("loggedIn"),localStorage.removeItem("uRole"),localStorage.removeItem("uID"),this.router.navigate(["/"])}}return(o=r).\u0275fac=function(n){return new(n||o)(e.Y36(g.F0),e.Y36(l.qu),e.Y36(i.yF),e.Y36(m.F),e.Y36(f.J))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-inicio-pasajero"]],decls:30,vars:11,consts:[[3,"translucent"],["color","#1e1e1e"],["slot","start"],[1,"round-icon",3,"click"],["name","power"],["lines","none","detail","false",1,"item-background-color",3,"routerLink"],[1,"round-icon"],[1,"userIcon"],[3,"src"],["slot","end"],[1,"round-icon",3,"routerLink"],["name","chatbubbles-sharp"],["padding","",1,"background",3,"fullscreen"],["position","floating"],[3,"ngModel","ngModelChange"],[2,"text-align","center"],["expand","block","size","large","expand","full",2,"display","inline-block","margin","1rem",3,"click"],[4,"ngIf"],[1,"ion-text-center",2,"color","#1e1e1e"],["lines","full"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[2,"--padding-start","1rem","overflow","scroll","white-space","nowrap"],[1,"ion-text-right",2,"max-width","70px"]],template:function(n,t){1&n&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2)(3,"ion-button",3),e.NdJ("click",function(){return t.salirCuenta()}),e._UZ(4,"ion-icon",4),e.qZA()(),e.TgZ(5,"ion-item",5)(6,"ion-label"),e._uU(7),e.qZA(),e.TgZ(8,"ion-button",6)(9,"ion-thumbnail",7),e._UZ(10,"img",8),e.qZA()()(),e.TgZ(11,"ion-buttons",9)(12,"ion-button",10),e._UZ(13,"ion-icon",11),e.qZA()()()(),e.TgZ(14,"ion-content",12)(15,"ion-item")(16,"ion-label",13),e._uU(17,"Ciudad"),e.qZA(),e.TgZ(18,"ion-input",14),e.NdJ("ngModelChange",function(u){return t.city=u}),e.qZA()(),e.TgZ(19,"div",15)(20,"ion-button",16),e.NdJ("click",function(){return t.getWeather(t.city)}),e._uU(21,"Obtener Clima"),e.qZA()(),e.YNc(22,P,5,2,"ion-card",17),e.TgZ(23,"ion-card")(24,"ion-card-header")(25,"ion-card-title",18),e._uU(26,"Rutas"),e.qZA()(),e.TgZ(27,"ion-card-content")(28,"ion-list",19),e.YNc(29,b,8,3,"ion-item",20),e.qZA()()()()),2&n&&(e.Q6J("translucent",!0),e.xp6(5),e.Q6J("routerLink",e.DdM(9,v)),e.xp6(2),e.Oqu(t.usuario.nombre),e.xp6(3),e.s9C("src",t.usuario.imagen,e.LSH),e.xp6(2),e.Q6J("routerLink",e.DdM(10,_)),e.xp6(2),e.Q6J("fullscreen",!0),e.xp6(4),e.Q6J("ngModel",t.city),e.xp6(4),e.Q6J("ngIf",t.weatherData),e.xp6(7),e.Q6J("ngForOf",t.rutas))},dependencies:[d.sg,d.O5,l.JJ,l.On,i.YG,i.Sm,i.PM,i.FN,i.Zi,i.Dq,i.W2,i.Gu,i.gu,i.pK,i.Ie,i.Q$,i.q_,i.Bs,i.sr,i.j9,i.YI,g.rH],styles:["ion-thumbnail.round[_ngcontent-%COMP%]{border-radius:50%;overflow:clip}ion-button[_ngcontent-%COMP%]   .userIcon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:auto;max-width:-moz-fit-content;max-width:fit-content}ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:nth-child(2n){--background:#EEEEEE}ion-content.background[_ngcontent-%COMP%]{--background: url(/assets/fondo.jpg) 0 0/100% 100% no-repeat}ion-toolbar[_ngcontent-%COMP%]{color:#1e1e1e;background-color:#1e1e1e}ion-item[_ngcontent-%COMP%]{color:#1e1e1e;background-color:#1e1e1e}.item-background-color[_ngcontent-%COMP%]{--ion-item-background:#1e1e1e;color:#fff;text-align:right}ion-button[_ngcontent-%COMP%]{border-radius:10px;background-color:#1e1e1e;color:#fff;width:80%;height:50px}ion-content.background[_ngcontent-%COMP%]{--background: url(/assets/fondo.jpg) 0 0/100% 100% no-repeat}"]}),r})()}];let Z=(()=>{var o;class r{}return(o=r).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[g.Bz.forChild(I),g.Bz]}),r})(),j=(()=>{var o;class r{}return(o=r).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.ez,l.u5,i.Pc,Z]}),r})()}}]);