"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6260],{6260:(P,d,a)=>{a.r(d),a.d(d,{HomePageModule:()=>C});var m=a(6814),r=a(3614),c=a(95),l=a(9351),p=a(5861),e=a(9468),h=a(118);function f(t,s){if(1&t&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Oqu(i.errorMessage)}}const M=function(){return["/registroc"]},b=[{path:"",component:(()=>{var t;class s{constructor(o,n){this.navCtrl=o,this.db=n,this.username="",this.password="",this.showErrorMessage=!1,this.errorMessage="",this.usuarios=[],localStorage.getItem("loggedIn")&&("conductor"==localStorage.getItem("uRole")?this.navCtrl.navigateForward("/inicio-conductor"):"pasajero"==localStorage.getItem("uRole")?this.navCtrl.navigateForward("/inicio-pasajero"):this.db.presentAlert("Illegal state: Bad uRole"))}ngOnInit(){this.db.dbState().subscribe(o=>{o&&this.db.fetchRoles().subscribe(n=>{this.usuarios=n})})}login(){var o=this;return(0,p.Z)(function*(){if("bdreport"==o.username.trim()&&"bdreport"==o.password.trim())return void o.navCtrl.navigateForward("/bdreport");if(o.showErrorMessage=!1,""==o.username.trim())return o.errorMessage="Ingrese su correo",void(o.showErrorMessage=!0);if(""==o.password.trim())return o.errorMessage="Ingrese su contrase\xf1a",void(o.showErrorMessage=!0);let n=o.username.trim().toLowerCase(),g=yield o.db.leerUsuarioPorCorreo(n);if(null===g)return o.errorMessage="Usuario no existe",void(o.showErrorMessage=!0);o.password.trim()==g.password?(localStorage.setItem("loggedIn","true"),localStorage.setItem("uID",g.id_usuario),"1"==g.id_rol?(o.navCtrl.navigateForward("/inicio-conductor"),localStorage.setItem("uRole","conductor")):(o.navCtrl.navigateForward("/inicio-pasajero"),localStorage.setItem("uRole","pasajero"))):(o.errorMessage="Contrase\xf1a incorrecta",o.showErrorMessage=!0)})()}}return(t=s).\u0275fac=function(o){return new(o||t)(e.Y36(r.SH),e.Y36(h.J))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-home"]],decls:30,vars:5,consts:[["color","#1e1e1e"],["slot","start"],[2,"color","white"],["padding","",1,"background"],["src","assets/pepe.png"],[2,"top","2 rem"],[2,"text-align","center"],[2,"margin-left","auto","margin-right","auto","font-size","50px","font-weight","bold","color","white"],[2,"top","2rem"],["type","text","placeholder","Usuario",3,"ngModel","ngModelChange"],["border-radius","10"],["type","password","type","password","placeholder","Contrase\xf1a",3,"ngModel","ngModelChange"],["class","error-message",4,"ngIf"],[3,"click"],["color","grey",3,"routerLink"],[2,"bottom","-1rem"],[2,"margin-left","auto","margin-right","auto","font-size","10px","color","white"],[1,"error-message"]],template:function(o,n){1&o&&(e.TgZ(0,"ion-header")(1,"ion-toolbar",0),e._UZ(2,"ion-buttons",1),e.TgZ(3,"ion-title",2),e._uU(4,"Inicio de sesi\xf3n"),e.qZA()()(),e.TgZ(5,"ion-content",3),e._UZ(6,"ion-img",4),e.TgZ(7,"ion-card-content",5)(8,"div",6)(9,"ion-text",7),e._uU(10,"Te LLevo."),e.qZA()()(),e.TgZ(11,"ion-card-content",8)(12,"ion-item")(13,"ion-input",9),e.NdJ("ngModelChange",function(u){return n.username=u}),e.qZA()(),e._UZ(14,"br"),e.TgZ(15,"ion-item",10)(16,"ion-input",11),e.NdJ("ngModelChange",function(u){return n.password=u}),e.qZA()(),e._UZ(17,"br"),e.YNc(18,f,2,1,"div",12),e._UZ(19,"br"),e.TgZ(20,"div",6)(21,"ion-button",13),e.NdJ("click",function(){return n.login()}),e._uU(22,"Iniciar sesi\xf3n"),e.qZA()(),e.TgZ(23,"div",6)(24,"ion-button",14),e._uU(25,"Registrarse"),e.qZA()()(),e.TgZ(26,"ion-card-content",15)(27,"div",6)(28,"ion-text",16),e._uU(29,"Te LLevo. Marca(no) Registrada 2023-2023"),e.qZA()()()()),2&o&&(e.xp6(13),e.Q6J("ngModel",n.username),e.xp6(3),e.Q6J("ngModel",n.password),e.xp6(2),e.Q6J("ngIf",n.showErrorMessage),e.xp6(6),e.Q6J("routerLink",e.DdM(4,M)))},dependencies:[m.O5,c.JJ,c.On,r.YG,r.Sm,r.FN,r.W2,r.Gu,r.Xz,r.pK,r.Ie,r.yW,r.wd,r.sr,r.j9,r.YI,l.rH],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}div[_ngcontent-%COMP%]{text-align:center}ion-button[_ngcontent-%COMP%]{border-radius:10px;background-color:#1e1e1e;color:#fff;width:80%;height:50px}ion-content.background[_ngcontent-%COMP%]{--background: url(fondo.b64b15d7ead4a074.jpg) 0 0/100% 100% no-repeat}ion-item[_ngcontent-%COMP%]{border-radius:10px}ion-card-content[_ngcontent-%COMP%]{border-radius:4px}ion-header[_ngcontent-%COMP%]{background-color:#1e1e1e;color:#1e1e1e}ion-toolbar[_ngcontent-%COMP%]{color:#1e1e1e;background-color:#1e1e1e}.error-message[_ngcontent-%COMP%]{background-color:#fff;color:red;text-align:center;margin-top:10px;border-radius:4px;font-size:20px;font-weight:700}"]}),s})()}];let v=(()=>{var t;class s{}return(t=s).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.Bz.forChild(b),l.Bz]}),s})(),C=(()=>{var t;class s{}return(t=s).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[m.ez,c.u5,r.Pc,v]}),s})()}}]);