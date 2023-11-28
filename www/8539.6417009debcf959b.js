"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8539],{8539:(T,h,s)=>{s.r(h),s.d(h,{PerfilConductorPageModule:()=>Z});var m=s(6814),l=s(95),t=s(3614),d=s(9351),g=s(5861),e=s(9468),p=s(118),f=s(1125);const C=function(){return["/"]},_=[{path:"",component:(()=>{var i;class u{constructor(o,n,r,a,P){this.router=o,this.fb=n,this.toastController=r,this.db=a,this.weatherService=P,this.city="Santiago",this.apiKey="ffe31d51024efac03faf1902e771d2b4",this.apiUrl="https://api.openweathermap.org/data/2.5/weather",this.usuario={},this.imagen=null,this.contrasenaActual="",this.nuevaContrasena="",this.confirmarNuevaContrasena="",this.usuario.imagen=null}ngOnInit(){this.db.dbState().subscribe(o=>{o&&this.loadUsuario()})}getWeather(o){this.weatherService.getWeather(o).subscribe(n=>{this.weatherData=n,console.log(this.weatherData)})}loadUsuario(){var o=this;return(0,g.Z)(function*(){let n=localStorage.getItem("uID");n&&(o.usuario=yield o.db.leerUsuarioPorID(n))})()}initForm(){return this.fb.group({nombre:[""],correo:[""],numero_cel:[""],telefono:[""],patente:[""]})}showToast(o,n){var r=this;return(0,g.Z)(function*(){yield(yield r.toastController.create({message:o,duration:5e3,position:"bottom",color:n,buttons:[{icon:"close",role:"cancel"}]})).present()})()}onFileSelected(o){const n=o.target.files[0];n&&(this.usuario.imagen=URL.createObjectURL(n))}cambiarContrasena(){this.validarContrasenaActual()?this.nuevaContrasena===this.confirmarNuevaContrasena?this.validarNuevaContrasena()?this.db.actualizarContrasena(this.usuario.id_usuario,this.nuevaContrasena).then(()=>{this.showToast("Contrase\xf1a actualizada exitosamente","success"),this.contrasenaActual="",this.nuevaContrasena="",this.confirmarNuevaContrasena=""}).catch(o=>{this.showToast("Error al actualizar la contrase\xf1a: "+o.message,"danger")}):this.showToast("La nueva contrase\xf1a no cumple con los requisitos de seguridad","danger"):this.showToast("Las contrase\xf1as nuevas no coinciden","danger"):this.showToast("La contrase\xf1a actual es incorrecta","danger")}validarContrasenaActual(){var o=this;return(0,g.Z)(function*(){const n=yield o.obtenerContrasenaAlmacenada(o.usuario.id_usuario);return o.contrasenaActual===n})()}obtenerContrasenaAlmacenada(o){var n=this;return(0,g.Z)(function*(){try{const r=yield n.db.leerUsuarioPorID(o.toString());return r?r.password:""}catch(r){return console.error("Error al obtener contrase\xf1a almacenada:",r),""}})()}validarNuevaContrasena(){return/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.nuevaContrasena)}guardarCambios1(){this.validarContrasenaActual()?this.validarNuevaContrasena()?this.db.actualizarContrasena(this.usuario.id_usuario,this.nuevaContrasena).then(()=>{this.showToast("Contrase\xf1a cambiada exitosamente","success")}).catch(o=>{this.showToast("Error al cambiar la contrase\xf1a: "+o.message,"danger")}):this.showToast("La nueva contrase\xf1a no cumple con los requisitos de seguridad","danger"):this.showToast("La contrase\xf1a actual es incorrecta","danger")}guardarCambios(){window.location.reload(),this.db.updateUsuario(this.usuario).then(()=>{this.usuario.imagen?this.db.updateImagenUsuario(this.usuario.id_usuario,this.usuario.imagen).then(()=>{this.showToast("Usuario actualizado exitosamente","success")}).catch(o=>{this.showToast("Error al guardar la imagen de perfil: "+o.message,"danger")}):this.showToast("Usuario actualizado exitosamente","success"),this.db.crearVehiculo(this.usuario.patente,this.usuario.color,this.usuario.n_asientos,this.usuario.id_usuario).then(()=>{this.showToast("Veh\xedculo agregado exitosamente","success")}).catch(o=>{this.showToast("Error al agregar veh\xedculo: "+o.message,"danger")})}).catch(o=>{console.error("Error al insertar datos:",o);let n="Error al guardar cambios: ";n+=o.message?o.message:"Detalles espec\xedficos del error no disponibles.",this.showToast(n,"danger")})}}return(i=u).\u0275fac=function(o){return new(o||i)(e.Y36(d.F0),e.Y36(l.qu),e.Y36(t.yF),e.Y36(p.J),e.Y36(f.F))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-perfil-conductor"]],decls:77,vars:17,consts:[[3,"translucent"],["color","#1e1e1e"],["slot","start"],["defaultHref","/inicio-conductor","text","Volver",2,"color","white"],[1,"background",3,"fullscreen"],[1,"ion-text-center"],["id","perfil-imagen"],[3,"src"],["position","stacked"],["type","file","accept","image/*",3,"ngModel","change","ngModelChange"],["type","text",3,"ngModel","ngModelChange"],["type","email",3,"ngModel","ngModelChange"],["type","tel",3,"ngModel","ngModelChange"],[2,"text-align","center"],["color","grey",3,"click"],["type","password",3,"ngModel","ngModelChange"],["color","grey",3,"routerLink","click"],["type","number",3,"ngModel","ngModelChange"]],template:function(o,n){1&o&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),e._UZ(3,"ion-back-button",3),e.qZA()()(),e.TgZ(4,"ion-content",4)(5,"ion-card")(6,"ion-card-header")(7,"ion-card-title",5)(8,"ion-thumbnail",6),e._UZ(9,"img",7),e.qZA(),e.TgZ(10,"ion-label"),e._uU(11),e.qZA(),e._UZ(12,"br"),e.TgZ(13,"ion-label"),e._uU(14),e.qZA(),e._UZ(15,"br"),e.TgZ(16,"ion-label"),e._uU(17),e.qZA()()(),e.TgZ(18,"ion-card-content")(19,"ion-list")(20,"ion-item")(21,"ion-label",8),e._uU(22,"Imagen de Perfil"),e.qZA(),e.TgZ(23,"input",9),e.NdJ("change",function(a){return n.onFileSelected(a)})("ngModelChange",function(a){return n.usuario.imagen=a}),e.qZA()(),e.TgZ(24,"ion-item")(25,"ion-label",8),e._uU(26,"Nombre"),e.qZA(),e.TgZ(27,"ion-input",10),e.NdJ("ngModelChange",function(a){return n.usuario.nombre=a}),e.qZA()(),e.TgZ(28,"ion-item")(29,"ion-label",8),e._uU(30,"Correo"),e.qZA(),e.TgZ(31,"ion-input",11),e.NdJ("ngModelChange",function(a){return n.usuario.correo=a}),e.qZA()(),e.TgZ(32,"ion-item")(33,"ion-label",8),e._uU(34,"N\xfamero de Celular"),e.qZA(),e.TgZ(35,"ion-input",12),e.NdJ("ngModelChange",function(a){return n.usuario.numero_cel=a}),e.qZA()()(),e.TgZ(36,"div",13)(37,"ion-button",14),e.NdJ("click",function(){return n.guardarCambios()}),e._uU(38,"Actualizar perfil"),e.qZA()()()(),e.TgZ(39,"ion-card")(40,"ion-card-header")(41,"ion-card-title"),e._uU(42,"Contrase\xf1a"),e.qZA()(),e.TgZ(43,"ion-card-content")(44,"ion-list")(45,"ion-item")(46,"ion-label",8),e._uU(47,"Nueva Contrase\xf1a"),e.qZA(),e.TgZ(48,"ion-input",15),e.NdJ("ngModelChange",function(a){return n.nuevaContrasena=a}),e.qZA()(),e.TgZ(49,"ion-item")(50,"ion-label",8),e._uU(51,"Confirmar Nueva Contrase\xf1a"),e.qZA(),e.TgZ(52,"ion-input",15),e.NdJ("ngModelChange",function(a){return n.confirmarNuevaContrasena=a}),e.qZA()()(),e.TgZ(53,"div",13)(54,"ion-button",16),e.NdJ("click",function(){return n.guardarCambios1()}),e._uU(55,"Cambiar Contrase\xf1a"),e.qZA()()()(),e.TgZ(56,"ion-card")(57,"ion-card-header")(58,"ion-card-title"),e._uU(59,"Agregar Veh\xedculo"),e.qZA()(),e.TgZ(60,"ion-card-content")(61,"ion-list")(62,"ion-item")(63,"ion-label",8),e._uU(64,"Patente"),e.qZA(),e.TgZ(65,"ion-input",10),e.NdJ("ngModelChange",function(a){return n.usuario.patente=a}),e.qZA()(),e.TgZ(66,"ion-item")(67,"ion-label",8),e._uU(68,"Color"),e.qZA(),e.TgZ(69,"ion-input",10),e.NdJ("ngModelChange",function(a){return n.usuario.color=a}),e.qZA()(),e.TgZ(70,"ion-item")(71,"ion-label",8),e._uU(72,"N\xfamero de Asientos"),e.qZA(),e.TgZ(73,"ion-input",17),e.NdJ("ngModelChange",function(a){return n.usuario.n_asientos=a}),e.qZA()()(),e.TgZ(74,"div",13)(75,"ion-button",14),e.NdJ("click",function(){return n.guardarCambios()}),e._uU(76,"Agregar Veh\xedculo"),e.qZA()()()()()),2&o&&(e.Q6J("translucent",!0),e.xp6(4),e.Q6J("fullscreen",!0),e.xp6(5),e.Q6J("src",n.usuario.imagen,e.LSH),e.xp6(2),e.Oqu(n.usuario.nombre),e.xp6(3),e.Oqu(n.usuario.correo),e.xp6(3),e.Oqu(n.usuario.numero_cel),e.xp6(6),e.Q6J("ngModel",n.usuario.imagen),e.xp6(4),e.Q6J("ngModel",n.usuario.nombre),e.xp6(4),e.Q6J("ngModel",n.usuario.correo),e.xp6(4),e.Q6J("ngModel",n.usuario.numero_cel),e.xp6(13),e.Q6J("ngModel",n.nuevaContrasena),e.xp6(4),e.Q6J("ngModel",n.confirmarNuevaContrasena),e.xp6(2),e.Q6J("routerLink",e.DdM(16,C)),e.xp6(11),e.Q6J("ngModel",n.usuario.patente),e.xp6(4),e.Q6J("ngModel",n.usuario.color),e.xp6(4),e.Q6J("ngModel",n.usuario.n_asientos))},dependencies:[l.Fj,l.JJ,l.On,t.oU,t.YG,t.Sm,t.PM,t.FN,t.Zi,t.Dq,t.W2,t.Gu,t.pK,t.Ie,t.Q$,t.q_,t.Bs,t.sr,t.as,t.j9,t.cs,t.YI,d.rH],styles:["#perfil-imagen[_ngcontent-%COMP%]{margin:auto;--size:140px;border-radius:50%;overflow:clip}ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--padding-start:0px}ion-thumbnail.round[_ngcontent-%COMP%]{border-radius:50%;overflow:clip}.userIcon[_ngcontent-%COMP%]{--size:40px;margin-left:16px}ion-item[_ngcontent-%COMP%]{color:#1e1e1e;background-color:#1e1e1e}ion-button[_ngcontent-%COMP%]{border-radius:10px;background-color:#1e1e1e;color:#fff;width:80%;height:50px}"]}),u})()}];let b=(()=>{var i;class u{}return(i=u).\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[d.Bz.forChild(_),d.Bz]}),u})(),Z=(()=>{var i;class u{}return(i=u).\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[m.ez,l.u5,t.Pc,l.UX,b]}),u})()}}]);