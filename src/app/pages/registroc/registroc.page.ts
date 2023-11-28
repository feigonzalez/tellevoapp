import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';


@Component({
  selector: 'app-registroc',
  templateUrl: './registroc.page.html',
  styleUrls: ['./registroc.page.scss'],
})



export class RegistrocPage implements OnInit {

  nombre: string = "";
  pass: string = "";
  pass2: string = "";
  telefono: string = "";
  correo: string = "";
  formErrors:any = {};
  registering=false;
  imagen: string = '';

  lastPicture:string='';

  patente:string='';
  color:string='';
  asientos!:number;

  id_rol: number = 0;


  contactForm!: FormGroup;
  form: FormGroup = new FormGroup({})

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public toastController: ToastController,
    public alertController: AlertController, readonly fb: FormBuilder, private _snackBar: MatSnackBar, public photoService: PhotoService,
    public BdserviceService: BdserviceService, private router: Router) { }

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }
  async crearUsuario(nombre: string, correo: string, pass: string, telefono: string, id_rol: number, imagen: string) {
    this.registering=true;
    this.formErrors={};
    let valid:boolean=true
    valid=this.validarImagen()&&valid;
    valid=this.validarNombre()&&valid;
    valid=this.validarPass1()&&valid;
    valid=this.validarPass2()&&valid;
    valid=this.validarTelefono()&&valid;
    valid=this.validarCorreo()&&valid;
    valid=this.validarRol(false)&&valid;
    if(this.id_rol==1){
      valid=this.validarPatente()&&valid;
      valid=this.validarColor()&&valid;
      valid=this.validarAsientos()&&valid;
    }
    if(valid){
      let newUID:number = await this.BdserviceService.crearUsuario(nombre, correo, pass, telefono, id_rol, imagen);
      if(newUID!=-1){
        let newVID = await this.BdserviceService.crearVehiculo(this.patente, this.color, this.asientos, newUID);
        if(newVID!=-1){
          localStorage.setItem("loggedIn","true");
          localStorage.setItem("uID",newUID.toString());
          this.router.navigate(['/inicio-conductor'])
        }
      } else {
        this.registering=false;
      }
    } else {
      this.registering=false;
    }
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'first');
  }

  onSubmit(): void {
    console.log('Form ->');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.lastPicture=this.photoService.photos[this.photoService.photos.length-1].webviewPath
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Verifica si el archivo es una imagen
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imagen = reader.result as string; // Indica a TypeScript que es una cadena base64
        };
      } else {
        // Manejar el caso en que el archivo no sea una imagen
        this.imagen = '';
      }
    }
  }



  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],


      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          // Validador para al menos una mayúscula
          Validators.pattern(/(?=.*[A-Z])/),
          // Validador para al menos una minúscula
          Validators.pattern(/(?=.*[a-z])/),
          // Validador para al menos un número
          Validators.pattern(/(?=.*\d)/),
          // Validador para al menos un carácter especial
          Validators.pattern(/(?=.*[@$!%*?&])/)
        ]
      ],



      pass2: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      id_rol: ['',[]],
      patente: ['',[]],
      color: ['',[]],
      asientos: ['',[]],
    });
  }

  validarImagen(){

  /*
    Esta funcion debe validar que, o se haya subido una imagen válida con el selector de archivos,
    o que se haya tomado una foto con la cámara. El error "imagen_empty" debería usarse sólo si ninguna
    de estas validaciones es correcta.
  */
    let valid=true;
    this.formErrors["imagen_empty"]=false;
    if(this.imagen === null || this.imagen.trim()==""){
      if(this.photoService.photos.length!=1)
      this.formErrors["imagen_empty"]=true; valid=false;}
    return valid;
  }

  validarNombre(){
    let valid=true;
    this.formErrors["nombre_empty"]=false;
    this.formErrors["nombre_short"]=false;
    if(this.nombre===null || this.nombre.trim()==""){
      this.formErrors["nombre_empty"]=true; valid=false;}
    else if(this.nombre.length<3){
      this.formErrors["nombre_short"]=true; valid=false;}
    return valid;
  }
  
  validarPass1(){
    let valid=true;
    this.formErrors["password_empty"]=false;
    this.formErrors["password_short"]=false;
    this.formErrors["password_needUppercase"]=false;
    this.formErrors["password_needLowercase"]=false;
    this.formErrors["password_needNumber"]=false;
    this.formErrors["password_needSpecial"]=false;
    if(this.pass===null || this.pass.trim()==""){
      this.formErrors["password_empty"]=true; valid=false;}
    else{
      if(this.pass.length<6){
        this.formErrors["password_short"]=true; valid=false;}
      if(!this.pass.match(/.*[A-Z].*/)){
        this.formErrors["password_needUppercase"]=true; valid=false;}
      if(!this.pass.match(/.*[a-z].*/)){
        this.formErrors["password_needLowercase"]=true; valid=false;}
      if(!this.pass.match(/.*\d.*/)){
        this.formErrors["password_needNumber"]=true; valid=false;}
      if(!this.pass.match(/.*[!$%&?@*].*/)){
        this.formErrors["password_needSpecial"]=true; valid=false;}
    }
    return valid;
  }

  validarPass2(){
    let valid=true;
    this.formErrors["pass2_empty"]=false;
    this.formErrors["pass2_noMatch"]=false;
    if(this.pass2===null || this.pass2.trim()==""){
      this.formErrors["pass2_empty"]=true; valid=false;}
    else if(this.pass2!=this.pass){
      this.formErrors["pass2_noMatch"]=true; valid=false;}
    return valid;
  }

  validarTelefono(){
    let valid=true;
    this.formErrors["telefono_empty"]=false;
    this.formErrors["telefono_short"]=false;
    if(this.telefono===null || this.telefono.trim()==""){
      this.formErrors["telefono_empty"]=true; valid=false;}
    else if(this.telefono.toString().length<8){
      this.formErrors["telefono_short"]=true; valid=false;}
    return valid;
  }

  validarCorreo(){
    let valid=true;
    this.formErrors["correo_empty"]=false;
    this.formErrors["correo_invalid"]=false;
    if(this.correo===null || this.correo.trim()==""){
      this.formErrors["correo_empty"]=true; valid=false;}
    else if(!this.correo.match(/[^@]+@[^@]+/)){
      this.formErrors["correo_invalid"]=true; valid=false;}
    return valid;
  }

  validarRol(fromInput:boolean){
    let valid=true;
    this.formErrors["rol_empty"]=false;
    if(fromInput) return true;
    if(this.id_rol==0){
      this.formErrors["rol_empty"]=true; valid=false;}
    return valid;
  }

  validarPatente(){
    let valid=true;
    this.formErrors["patente_empty"]=false;
    this.formErrors["patente_invalid"]=false;
    if(this.patente === null || this.patente.trim()==""){
      this.formErrors["patente_empty"]=true; valid=false;}
    else if(!this.patente.toUpperCase().match(/[A-Z]{2}[0-9]{4}|[BCDFGHJKLMNPRSTWXYZ]{4}[0-9]{2}/) || this.patente.length!=6){
      this.formErrors["patente_invalid"]=true; valid=false;}
    return valid;
  }

  validarColor(){
    let valid=true;
    this.formErrors["color_empty"]=false;
    if(this.color === null || this.color.trim()==""){
      this.formErrors["color_empty"]=true; valid=false;}
    return valid;
  }

  validarAsientos(){
    let valid=true;
    this.formErrors["asientos_empty"]=false;
    this.formErrors["asientos_low"]=false;
    if(this.asientos === null || this.asientos === undefined){
      this.formErrors["asientos_empty"]=true; valid=false;}
    else if(this.asientos<1){
      this.formErrors["asientos_low"]=true; valid=false;}
    return valid;
  }

}



