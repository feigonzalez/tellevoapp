"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1466],{1466:(J,u,n)=>{n.r(u),n.d(u,{ViajePasajeroPageModule:()=>h});var j=n(6814),m=n(95),s=n(3614),v=n(9351),p=n(5861),a=n(9468),f=n(118),g=n(4704);const V=[{path:"",component:(()=>{var e;class i{constructor(o,c,P,Z){this.location=o,this.router=c,this.activatedRoute=P,this.db=Z,this.viewType="",this.activatedRoute.queryParams.subscribe(z=>{var d,r,t;null!==(d=this.router.getCurrentNavigation())&&void 0!==d&&d.extras.state&&(this.ruta=null===(r=this.router.getCurrentNavigation())||void 0===r||null===(r=r.extras.state)||void 0===r?void 0:r.ruta,this.viewType=null===(t=this.router.getCurrentNavigation())||void 0===t||null===(t=t.extras)||void 0===t||null===(t=t.state)||void 0===t?void 0:t.viewType)})}ngOnInit(){}cancelarViaje(){var o=this;return(0,p.Z)(function*(){console.log("!:cancelarViaje()");let c=localStorage.getItem("uID");c&&(yield o.db.cancelarViaje(o.ruta.id_ruta,c)),o.location.back()})()}}return(e=i).\u0275fac=function(o){return new(o||e)(a.Y36(j.Ye),a.Y36(v.F0),a.Y36(v.gz),a.Y36(f.J))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-viaje-pasajero"]],decls:7,vars:2,consts:[[3,"translucent"],["color","#1e1e1e"],[3,"fullscreen"],["viewType","view"],["slot","fixed","vertical","bottom","horizontal","end"],["size","large","color","danger",3,"click"],["name","close-sharp"]],template:function(o,c){1&o&&(a.TgZ(0,"ion-header",0),a._UZ(1,"ion-toolbar",1),a.qZA(),a.TgZ(2,"ion-content",2),a._UZ(3,"app-map",3),a.TgZ(4,"ion-fab",4)(5,"ion-fab-button",5),a.NdJ("click",function(){return c.cancelarViaje()}),a._UZ(6,"ion-icon",6),a.qZA()()()),2&o&&(a.Q6J("translucent",!0),a.xp6(2),a.Q6J("fullscreen",!0))},dependencies:[s.W2,s.IJ,s.W4,s.Gu,s.gu,s.sr,g.G]}),i})()}];let y=(()=>{var e;class i{}return(e=i).\u0275fac=function(o){return new(o||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[v.Bz.forChild(V),v.Bz]}),i})();var T=n(9464);let h=(()=>{var e;class i{}return(e=i).\u0275fac=function(o){return new(o||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[j.ez,m.u5,s.Pc,T.K,y]}),i})()}}]);