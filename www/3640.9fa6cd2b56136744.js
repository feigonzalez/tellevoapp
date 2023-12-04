"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3640],{3640:(A,m,i)=>{i.r(m),i.d(m,{VerRutaPasajeroPageModule:()=>V});var h=i(6814),f=i(95),n=i(3614),p=i(9351),v=i(5861),P=i(816);class Z{constructor(){this.id_usuario="",this.nombre="",this.correo="",this.password="",this.numero_cel="",this.imagen="",this.id_rol=""}}var a=i(9468),b=i(118),y=i(4704);const j=[{path:"",component:(()=>{var o;class r{constructor(e,t,d){this.router=e,this.activatedRoute=t,this.db=d,this.viewType="",this.asResv=0,this.asDisp=0,this.btnMssg="Solicitar Pasaje",this.requested=!1,this.checkRequested(),this.activatedRoute.queryParams.subscribe(U=>{var g,u,c,s;null!==(g=this.router.getCurrentNavigation())&&void 0!==g&&g.extras.state?(this.ruta=null===(u=this.router.getCurrentNavigation())||void 0===u||null===(u=u.extras.state)||void 0===u?void 0:u.ruta,this.conductor=null===(c=this.router.getCurrentNavigation())||void 0===c||null===(c=c.extras.state)||void 0===c?void 0:c.conductor,this.viewType=null===(s=this.router.getCurrentNavigation())||void 0===s||null===(s=s.extras)||void 0===s||null===(s=s.state)||void 0===s?void 0:s.viewType):(this.ruta||(this.ruta=new P.N),this.conductor||(this.conductor=new Z))})}ngOnInit(){var e=this;return(0,v.Z)(function*(){e.db.dbState().subscribe(t=>{t&&(e.readAsientosReservados(),e.checkRequested())})})()}readAsientosReservados(){var e=this;return(0,v.Z)(function*(){e.asResv=yield e.db.contarViajesPorRutaYEstado(e.ruta.id_ruta,"aceptado");let t=yield e.db.leerVehiculoPorUsuario(e.conductor.id_usuario);e.asDisp=t.n_asientos})()}checkRequested(){var e=this;return(0,v.Z)(function*(){let t=localStorage.getItem("uID");t&&(e.requested=yield e.db.leerViajeSolicitado(e.ruta.id_ruta,t)),e.requested&&(e.btnMssg="Ver Solicitud")})()}solicitarViaje(){var e=this;return(0,v.Z)(function*(){console.log("!:solicitarViaje()"),yield e.checkRequested();let t=localStorage.getItem("uID");t&&!e.requested&&(e.db.crearViaje(e.ruta.tarifa,e.db.getCurrentDatestring(),"solicitado",e.ruta.id_ruta,parseInt(t)),e.requested=!0,e.btnMssg="Ver Solicitud"),e.router.navigate(["/viaje-pasajero"],{state:{ruta:e.ruta,viewType:e.viewType}})})()}abrirChat(e){this.router.navigate(["/mensaje-pasajero"],{state:{id_pareja:e}})}}return(o=r).\u0275fac=function(e){return new(e||o)(a.Y36(p.F0),a.Y36(p.gz),a.Y36(b.J))},o.\u0275cmp=a.Xpm({type:o,selectors:[["app-ver-ruta-pasajero"]],decls:59,vars:11,consts:[[3,"translucent"],["color","#1e1e1e"],["slot","start"],["defaultHref","/inicio-conductor","text","Volver"],[3,"fullscreen"],[3,"viewType"],["expand","block","size","large",2,"margin","1rem",3,"click"],["lines","none"],[1,"display-label"],[1,"display-value-text"],["slot","end"],[1,"round-icon",3,"click"],["name","chatbubbles-sharp"],[1,"display-labels"],["lines","none",1,"ion-text-center"],[1,"display-values"]],template:function(e,t){1&e&&(a.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),a._UZ(3,"ion-back-button",3),a.qZA()()(),a.TgZ(4,"ion-content",4),a._UZ(5,"app-map",5),a.qZA(),a.TgZ(6,"ion-footer")(7,"ion-button",6),a.NdJ("click",function(){return t.solicitarViaje()}),a._uU(8),a.qZA(),a.TgZ(9,"ion-grid")(10,"ion-row")(11,"ion-col")(12,"ion-item",7)(13,"span",8),a._uU(14,"Asientos disponibles"),a.qZA(),a.TgZ(15,"span",9),a._uU(16),a.qZA()()()(),a.TgZ(17,"ion-row")(18,"ion-col")(19,"ion-item",7)(20,"span",8),a._uU(21,"Conductor"),a.qZA(),a.TgZ(22,"span",9),a._uU(23),a.qZA(),a.TgZ(24,"ion-buttons",10)(25,"ion-button",11),a.NdJ("click",function(){return t.abrirChat(t.conductor.id_usuario)}),a._UZ(26,"ion-icon",12),a.qZA()()()()(),a.TgZ(27,"ion-row")(28,"ion-col")(29,"ion-item",7)(30,"span",8),a._uU(31,"Salida"),a.qZA(),a.TgZ(32,"span",9),a._uU(33),a.qZA()()()(),a.TgZ(34,"ion-row")(35,"ion-col")(36,"ion-item",7)(37,"span",8),a._uU(38,"Destino"),a.qZA(),a.TgZ(39,"span",9),a._uU(40),a.qZA()()()(),a.TgZ(41,"ion-row",13)(42,"ion-col")(43,"ion-item",14)(44,"span"),a._uU(45,"Tarifa"),a.qZA()()(),a.TgZ(46,"ion-col")(47,"ion-item",7)(48,"span"),a._uU(49,"Hora de Salida"),a.qZA()()()(),a.TgZ(50,"ion-row",15)(51,"ion-col")(52,"ion-item",7)(53,"span"),a._uU(54),a.qZA()()(),a.TgZ(55,"ion-col")(56,"ion-item",7)(57,"span"),a._uU(58),a.qZA()()()()()()),2&e&&(a.Q6J("translucent",!0),a.xp6(4),a.Q6J("fullscreen",!0),a.xp6(1),a.Q6J("viewType",t.viewType),a.xp6(3),a.Oqu(t.btnMssg),a.xp6(8),a.AsE("",t.asResv,"/",t.asDisp,""),a.xp6(7),a.Oqu(t.conductor.nombre),a.xp6(10),a.Oqu(t.ruta.origen),a.xp6(7),a.Oqu(t.ruta.destino),a.xp6(14),a.hij("$",t.ruta.tarifa,""),a.xp6(4),a.Oqu(t.ruta.hora_salida))},dependencies:[n.oU,n.YG,n.Sm,n.wI,n.W2,n.fr,n.jY,n.Gu,n.gu,n.Ie,n.Nd,n.sr,n.cs,y.G],styles:["ion-button.round-icon[_ngcontent-%COMP%]{--border-radius:50%;height:40px;width:40px;font-size:1rem}.display-labels[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;font-size:1rem;color:gray;padding:.2rem;text-align:center;width:100%}.display-label[_ngcontent-%COMP%]{display:inline-block;font-size:1rem;color:gray;min-width:100px;max-width:100px}.display-value-text[_ngcontent-%COMP%]{display:inline-block;overflow:auto}.display-values[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;font-size:2rem;padding:.2rem;text-align:center;width:100%}"]}),r})()}];let R=(()=>{var o;class r{}return(o=r).\u0275fac=function(e){return new(e||o)},o.\u0275mod=a.oAB({type:o}),o.\u0275inj=a.cJS({imports:[p.Bz.forChild(j),p.Bz]}),r})();var T=i(9464);let V=(()=>{var o;class r{}return(o=r).\u0275fac=function(e){return new(e||o)},o.\u0275mod=a.oAB({type:o}),o.\u0275inj=a.cJS({imports:[h.ez,f.u5,n.Pc,R,T.K]}),r})()}}]);