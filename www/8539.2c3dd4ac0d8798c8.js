"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8539],{8539:(S,d,u)=>{u.r(d),u.d(d,{PerfilConductorPageModule:()=>z});var f=u(6814),l=u(95),a=u(3614),_=u(9351),p=u(5861),e=u(9468),m=u(118),g=u(1125);function h(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function v(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"El campo tiene que tener un largo mayor a 3"),e.qZA())}function P(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function Z(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Ingrese un n\xfamero de tel\xe9fono v\xe1lido"),e.qZA())}function C(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function T(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Contrase\xf1a incorrecta"),e.qZA())}function b(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function A(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"La contrase\xf1a tiene que ser mayor a 6 caracteres"),e.qZA())}function E(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Debe contener al menos una may\xfascula"),e.qZA())}function U(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Debe contener al menos una min\xfascula"),e.qZA())}function N(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Debe contener al menos un n\xfamero"),e.qZA())}function M(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Debe contener al menos un car\xe1cter especial"),e.qZA())}function y(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function q(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Las contrase\xf1as no coinciden"),e.qZA())}function J(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function w(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Patente inv\xe1lida"),e.qZA())}function Q(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function I(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Este campo es obligatorio"),e.qZA())}function F(i,t){1&i&&(e.TgZ(0,"div",21),e._uU(1,"Debe ser mayor a 0"),e.qZA())}const Y=[{path:"",component:(()=>{var i;class t{constructor(r,o,n,s){this.navCtrl=r,this.fb=o,this.db=n,this.weatherService=s,this.city="Santiago",this.apiKey="ffe31d51024efac03faf1902e771d2b4",this.apiUrl="https://api.openweathermap.org/data/2.5/weather",this.usuario={},this.vehiculo={},this.imagen=null,this.passActual="",this.passNueva="",this.passNuevaConfirm="",this.formErrors={},this.usuario.imagen=null}ngOnInit(){this.db.dbState().subscribe(r=>{r&&this.loadUsuarioYVehiculo()})}getWeather(r){this.weatherService.getWeather(r).subscribe(o=>{this.weatherData=o,console.log(this.weatherData)})}loadUsuarioYVehiculo(){var r=this;return(0,p.Z)(function*(){let o=localStorage.getItem("uID");o&&(r.usuario=yield r.db.leerUsuarioPorID(o),r.vehiculo=yield r.db.leerVehiculoPorUsuario(o))})()}initForm(){return this.fb.group({nombre:[""],correo:[""],numero_cel:[""],telefono:[""],patente:[""]})}onFileSelected(r){const o=r.target.files[0];o&&(this.usuario.imagen=URL.createObjectURL(o))}validarNombre(){let r=!0;return this.formErrors.nombre_empty=!1,this.formErrors.nombre_short=!1,null===this.usuario.nombre||""==this.usuario.nombre.trim()?(this.formErrors.has_empty_fields=!0,this.formErrors.nombre_empty=!0,r=!1):this.usuario.nombre.length<3&&(this.formErrors.nombre_short=!0,r=!1),r}validarTelefono(){let r=!0;return this.formErrors.telefono_empty=!1,this.formErrors.telefono_invalid=!1,null===this.usuario.numero_cel||""==this.usuario.numero_cel.trim()?(this.formErrors.has_empty_fields=!0,this.formErrors.telefono_empty=!0,r=!1):this.usuario.numero_cel.match(/^\+?\d{8,}$/)||(this.formErrors.telefono_invalid=!0),r}validarPassActual(){let r=!0;return this.formErrors.passMain_empty=!1,this.formErrors.passMain_wrong=!1,(null===this.passActual||""==this.passActual.trim())&&(this.formErrors.passMain_empty=!0,r=!1),r}validarPassActualCorrecta(){let r=!0;return this.formErrors.passMain_wrong=!1,this.usuario.password!=this.passActual&&(this.formErrors.passMain_wrong=!0,r=!1),r}validarPassNueva(){let r=!0;return this.formErrors.password_empty=!1,this.formErrors.password_short=!1,this.formErrors.password_needUppercase=!1,this.formErrors.password_needLowercase=!1,this.formErrors.password_needNumber=!1,this.formErrors.password_needSpecial=!1,null===this.passNueva||""==this.passNueva.trim()?(this.formErrors.has_empty_fields=!0,this.formErrors.password_empty=!0,r=!1):(this.passNueva.length<6&&(this.formErrors.password_short=!0,r=!1),this.passNueva.match(/.*[A-Z].*/)||(this.formErrors.password_needUppercase=!0,r=!1),this.passNueva.match(/.*[a-z].*/)||(this.formErrors.password_needLowercase=!0,r=!1),this.passNueva.match(/.*\d.*/)||(this.formErrors.password_needNumber=!0,r=!1),this.passNueva.match(/.*[!$%&?@*].*/)||(this.formErrors.password_needSpecial=!0,r=!1)),r}validarPassConfirm(){let r=!0;return this.formErrors.pass2_empty=!1,this.formErrors.pass2_noMatch=!1,null===this.passNuevaConfirm||""==this.passNuevaConfirm.trim()?(this.formErrors.has_empty_fields=!0,this.formErrors.pass2_empty=!0,r=!1):this.passNuevaConfirm!=this.passNueva&&(this.formErrors.pass2_noMatch=!0,r=!1),r}validarPatente(){let r=!0;return this.formErrors.patente_empty=!1,this.formErrors.patente_invalid=!1,null===this.vehiculo.patente||""==this.vehiculo.patente.trim()?(this.formErrors.has_empty_fields=!0,this.formErrors.patente_empty=!0,r=!1):(!this.vehiculo.patente.toUpperCase().match(/[A-Z]{2}[0-9]{4}|[BCDFGHJKLMNPRSTWXYZ]{4}[0-9]{2}/)||6!=this.vehiculo.patente.length)&&(this.formErrors.patente_invalid=!0,r=!1),r}validarColor(){let r=!0;return this.formErrors.color_empty=!1,(null===this.vehiculo.color||""==this.vehiculo.color.trim())&&(this.formErrors.has_empty_fields=!0,this.formErrors.color_empty=!0,r=!1),r}validarAsientos(){let r=!0;return this.formErrors.asientos_empty=!1,this.formErrors.asientos_low=!1,null==this.vehiculo.n_asientos?(this.formErrors.has_empty_fields=!0,this.formErrors.asientos_empty=!0,r=!1):this.vehiculo.n_asientos<1&&(this.formErrors.asientos_low=!0,r=!1),r}actualizarDatos(){this.formErrors={};let r=!0;r=this.validarNombre()&&r,r=this.validarTelefono()&&r,r&&(this.db.actualizarUsuarioDatos(this.usuario.id_usuario,this.usuario.nombre,this.usuario.numero_cel,this.usuario.imagen),this.db.showToast("Datos actualizados","success"),this.navCtrl.navigateBack("/inicio-conductor",{state:{updateUser:!0}}))}actualizarPass(){this.formErrors={};let r=!0;r=this.validarPassActual()&&r,r=this.validarPassActualCorrecta()&&r,r=this.validarPassNueva()&&r,r=this.validarPassConfirm()&&r,r&&(this.db.actualizarUsuarioPass(this.usuario.id_usuario,this.passNueva),this.db.showToast("Contrase\xf1a actualizada","success"),this.navCtrl.navigateBack("/inicio-conductor"))}actualizarVehiculo(){this.formErrors={};let r=!0;r=this.validarPatente()&&r,r=this.validarColor()&&r,r=this.validarAsientos()&&r,r&&(this.db.actualizarVehiculo(this.vehiculo.id_vehiculo,this.vehiculo.patente,this.vehiculo.color,this.vehiculo.n_asientos,this.usuario.id_usuario),this.db.showToast("Veh\xedculo actualizado","success"),this.navCtrl.navigateBack("/inicio-conductor"))}}return(i=t).\u0275fac=function(r){return new(r||i)(e.Y36(a.SH),e.Y36(l.qu),e.Y36(m.J),e.Y36(g.F))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-perfil-conductor"]],decls:116,vars:34,consts:[[3,"translucent"],["color","#1e1e1e"],["slot","start"],["defaultHref","/inicio-conductor","text","Volver",2,"color","white"],[1,"background",3,"fullscreen"],[1,"ion-text-center"],["id","perfil-imagen"],[3,"src"],["position","stacked"],["type","file","accept","image/*",3,"ngModel","change","ngModelChange"],["name","person-outline",1,"input-icon"],["type","text",3,"ngModel","ngModelChange","input"],["class","input-error",4,"ngIf"],["name","call-outline",1,"input-icon"],[2,"text-align","center"],["color","grey",3,"click"],["name","key-outline",1,"input-icon"],["type","password",3,"ngModel","ngModelChange","input"],["lines","none"],["name","car-outline",1,"input-icon"],["type","number",3,"ngModel","ngModelChange","input"],[1,"input-error"]],template:function(r,o){1&r&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),e._UZ(3,"ion-back-button",3),e.qZA()()(),e.TgZ(4,"ion-content",4)(5,"ion-card")(6,"ion-card-header")(7,"ion-card-title",5)(8,"ion-thumbnail",6),e._UZ(9,"img",7),e.qZA(),e.TgZ(10,"ion-label"),e._uU(11),e.qZA(),e._UZ(12,"br"),e.TgZ(13,"ion-label"),e._uU(14),e.qZA(),e._UZ(15,"br"),e.TgZ(16,"ion-label"),e._uU(17),e.qZA()()(),e.TgZ(18,"ion-card-content")(19,"ion-list")(20,"ion-item")(21,"ion-label",8),e._uU(22,"Imagen de Perfil"),e.qZA(),e.TgZ(23,"input",9),e.NdJ("change",function(s){return o.onFileSelected(s)})("ngModelChange",function(s){return o.usuario.imagen=s}),e.qZA()(),e.TgZ(24,"ion-item")(25,"ion-label",8),e._UZ(26,"ion-icon",10),e._uU(27," Nombre "),e.qZA(),e.TgZ(28,"ion-input",11),e.NdJ("ngModelChange",function(s){return o.usuario.nombre=s})("input",function(){return o.validarNombre()}),e.qZA()(),e.YNc(29,h,2,0,"div",12),e.YNc(30,v,2,0,"div",12),e.TgZ(31,"ion-item")(32,"ion-label",8),e._UZ(33,"ion-icon",13),e._uU(34," N\xfamero de Tel\xe9fono "),e.qZA(),e.TgZ(35,"ion-input",11),e.NdJ("ngModelChange",function(s){return o.usuario.numero_cel=s})("input",function(){return o.validarTelefono()}),e.qZA(),e.YNc(36,P,2,0,"div",12),e.YNc(37,Z,2,0,"div",12),e.qZA()(),e.TgZ(38,"div",14)(39,"ion-button",15),e.NdJ("click",function(){return o.actualizarDatos()}),e._uU(40,"Actualizar perfil"),e.qZA()()()(),e.TgZ(41,"ion-card")(42,"ion-card-header")(43,"ion-card-title"),e._uU(44,"Contrase\xf1a"),e.qZA()(),e.TgZ(45,"ion-card-content")(46,"ion-list")(47,"ion-item")(48,"ion-label",8),e._UZ(49,"ion-icon",16),e._uU(50," Contrase\xf1a Actual "),e.qZA(),e.TgZ(51,"ion-input",17),e.NdJ("ngModelChange",function(s){return o.passActual=s})("input",function(){return o.validarPassActual()}),e.qZA()(),e.YNc(52,C,2,0,"div",12),e.YNc(53,T,2,0,"div",12),e.TgZ(54,"ion-item")(55,"ion-label",8),e._UZ(56,"ion-icon",16),e._uU(57," Nueva Contrase\xf1a "),e.qZA(),e.TgZ(58,"ion-input",17),e.NdJ("ngModelChange",function(s){return o.passNueva=s})("input",function(){return o.validarPassNueva()}),e.qZA()(),e.YNc(59,b,2,0,"div",12),e.YNc(60,A,2,0,"div",12),e.YNc(61,E,2,0,"div",12),e.YNc(62,U,2,0,"div",12),e.YNc(63,N,2,0,"div",12),e.YNc(64,M,2,0,"div",12),e.TgZ(65,"ion-item",18)(66,"small"),e._uU(67," La contrase\xf1a debe cumplir con los siguientes requisitos de seguridad: "),e.TgZ(68,"ul")(69,"li"),e._uU(70,"Debe tener una longitud mayor a 6"),e.qZA(),e.TgZ(71,"li"),e._uU(72,"Debe contener al menos una letra may\xfascula"),e.qZA(),e.TgZ(73,"li"),e._uU(74,"Debe contener al menos una letra min\xfascula"),e.qZA(),e.TgZ(75,"li"),e._uU(76,'Debe contener al menos un caracter especial ("!", "$", "%", "&", "?", "@", o "*")'),e.qZA()()()(),e.TgZ(77,"ion-item")(78,"ion-label",8),e._UZ(79,"ion-icon",16),e._uU(80," Confirmar Nueva Contrase\xf1a "),e.qZA(),e.TgZ(81,"ion-input",17),e.NdJ("ngModelChange",function(s){return o.passNuevaConfirm=s})("input",function(){return o.validarPassConfirm()}),e.qZA()(),e.YNc(82,y,2,0,"div",12),e.YNc(83,q,2,0,"div",12),e.qZA(),e.TgZ(84,"div",14)(85,"ion-button",15),e.NdJ("click",function(){return o.actualizarPass()}),e._uU(86,"Cambiar Contrase\xf1a"),e.qZA()()()(),e.TgZ(87,"ion-card")(88,"ion-card-header")(89,"ion-card-title"),e._uU(90,"Agregar Veh\xedculo"),e.qZA()(),e.TgZ(91,"ion-card-content")(92,"ion-list")(93,"ion-item")(94,"ion-label",8),e._UZ(95,"ion-icon",19),e._uU(96," Patente "),e.qZA(),e.TgZ(97,"ion-input",11),e.NdJ("ngModelChange",function(s){return o.vehiculo.patente=s})("input",function(){return o.validarPatente()}),e.qZA()(),e.YNc(98,J,2,0,"div",12),e.YNc(99,w,2,0,"div",12),e.TgZ(100,"ion-item")(101,"ion-label",8),e._UZ(102,"ion-icon",19),e._uU(103," Color "),e.qZA(),e.TgZ(104,"ion-input",11),e.NdJ("ngModelChange",function(s){return o.vehiculo.color=s})("input",function(){return o.validarColor()}),e.qZA()(),e.YNc(105,Q,2,0,"div",12),e.TgZ(106,"ion-item")(107,"ion-label",8),e._UZ(108,"ion-icon",19),e._uU(109," N\xfamero de Asientos "),e.qZA(),e.TgZ(110,"ion-input",20),e.NdJ("ngModelChange",function(s){return o.vehiculo.n_asientos=s})("input",function(){return o.validarAsientos()}),e.qZA()(),e.YNc(111,I,2,0,"div",12),e.YNc(112,F,2,0,"div",12),e.qZA(),e.TgZ(113,"div",14)(114,"ion-button",15),e.NdJ("click",function(){return o.actualizarVehiculo()}),e._uU(115,"Actualizar Veh\xedculo"),e.qZA()()()()()),2&r&&(e.Q6J("translucent",!0),e.xp6(4),e.Q6J("fullscreen",!0),e.xp6(5),e.Q6J("src",o.usuario.imagen,e.LSH),e.xp6(2),e.Oqu(o.usuario.nombre),e.xp6(3),e.Oqu(o.usuario.correo),e.xp6(3),e.Oqu(o.usuario.numero_cel),e.xp6(6),e.Q6J("ngModel",o.usuario.imagen),e.xp6(5),e.Q6J("ngModel",o.usuario.nombre),e.xp6(1),e.Q6J("ngIf",o.formErrors.nombre_empty),e.xp6(1),e.Q6J("ngIf",o.formErrors.nombre_short),e.xp6(5),e.Q6J("ngModel",o.usuario.numero_cel),e.xp6(1),e.Q6J("ngIf",o.formErrors.telefono_empty),e.xp6(1),e.Q6J("ngIf",o.formErrors.telefono_invalid),e.xp6(14),e.Q6J("ngModel",o.passActual),e.xp6(1),e.Q6J("ngIf",o.formErrors.passMain_empty),e.xp6(1),e.Q6J("ngIf",o.formErrors.passMain_wrong),e.xp6(5),e.Q6J("ngModel",o.passNueva),e.xp6(1),e.Q6J("ngIf",o.formErrors.password_empty),e.xp6(1),e.Q6J("ngIf",o.formErrors.password_short),e.xp6(1),e.Q6J("ngIf",o.formErrors.password_needUppercase),e.xp6(1),e.Q6J("ngIf",o.formErrors.password_needLowercase),e.xp6(1),e.Q6J("ngIf",o.formErrors.password_needNumber),e.xp6(1),e.Q6J("ngIf",o.formErrors.password_needSpecial),e.xp6(17),e.Q6J("ngModel",o.passNuevaConfirm),e.xp6(1),e.Q6J("ngIf",o.formErrors.pass2_empty),e.xp6(1),e.Q6J("ngIf",o.formErrors.pass2_noMatch),e.xp6(14),e.Q6J("ngModel",o.vehiculo.patente),e.xp6(1),e.Q6J("ngIf",o.formErrors.patente_empty),e.xp6(1),e.Q6J("ngIf",o.formErrors.patente_invalid),e.xp6(5),e.Q6J("ngModel",o.vehiculo.color),e.xp6(1),e.Q6J("ngIf",o.formErrors.color_empty),e.xp6(5),e.Q6J("ngModel",o.vehiculo.n_asientos),e.xp6(1),e.Q6J("ngIf",o.formErrors.asientos_empty),e.xp6(1),e.Q6J("ngIf",o.formErrors.asientos_low))},dependencies:[f.O5,l.Fj,l.JJ,l.On,a.oU,a.YG,a.Sm,a.PM,a.FN,a.Zi,a.Dq,a.W2,a.Gu,a.gu,a.pK,a.Ie,a.Q$,a.q_,a.Bs,a.sr,a.as,a.j9,a.cs],styles:["#perfil-imagen[_ngcontent-%COMP%]{margin:auto;--size:140px;border-radius:50%;overflow:clip}ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--padding-start:0px}ion-thumbnail.round[_ngcontent-%COMP%]{border-radius:50%;overflow:clip}.userIcon[_ngcontent-%COMP%]{--size:40px;margin-left:16px}ion-item[_ngcontent-%COMP%]{color:#1e1e1e;background-color:#1e1e1e}ion-button[_ngcontent-%COMP%]{border-radius:10px;background-color:#1e1e1e;color:#fff;width:80%;height:50px}"]}),t})()}];let D=(()=>{var i;class t{}return(i=t).\u0275fac=function(r){return new(r||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[_.Bz.forChild(Y),_.Bz]}),t})(),z=(()=>{var i;class t{}return(i=t).\u0275fac=function(r){return new(r||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[f.ez,l.u5,a.Pc,l.UX,D]}),t})()}}]);