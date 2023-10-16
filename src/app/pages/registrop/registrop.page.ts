import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';


@Component({
  selector: 'app-registrop',
  templateUrl: './registrop.page.html',
  styleUrls: ['./registrop.page.scss'],
})
export class RegistropPage implements OnInit {
  

  nombre: string = "";
  pass: string = "";
  pass2:string= "";
  telefono: string = "";
  correo: string = "";
  imagen: string = "";

  id_rol: number = 0;


    contactForm!: FormGroup;
    form: FormGroup = new FormGroup({})

    constructor(public menuCtrl: MenuController, public navCtrl: NavController, public toastController: ToastController,
      public alertController: AlertController, readonly fb: FormBuilder, private _snackBar: MatSnackBar,public photoService: PhotoService,public BdserviceService: BdserviceService) { }
   
     ngOnInit(): void {
       this.contactForm = this.initForm();
     }
     crearUsuario(nombre: string, correo: string, pass: string, telefono: string, id_rol: number, imagen: string) {
      this.BdserviceService.crearUsuario(nombre, correo, pass, telefono, id_rol, imagen);
      }
   
     ionViewWillEnter() {
       this.menuCtrl.enable(false, 'first');
     }
   
     onSubmit():void{
       console.log('Form ->');
     }
   
     openSnackBar(message: string, action: string) {
       this._snackBar.open(message, action, {duration: 3000});
     }

     addPhotoToGallery() {
      this.photoService.addNewToGallery();
    }
    
   
     initForm(): FormGroup{
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
       });
     }
     
   }