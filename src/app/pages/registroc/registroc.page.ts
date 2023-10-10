import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registroc',
  templateUrl: './registroc.page.html',
  styleUrls: ['./registroc.page.scss'],
})
export class RegistrocPage implements OnInit {
    user: string ="";
    clave: string = "";
    nroFono: number = 0;
    correo: string = "";
    contactForm!: FormGroup;
    form: FormGroup = new FormGroup({})

    constructor(public menuCtrl: MenuController, public navCtrl: NavController, public toastController: ToastController,
      public alertController: AlertController, readonly fb: FormBuilder, private _snackBar: MatSnackBar,public photoService: PhotoService) { }
   
     ngOnInit(): void {
       this.contactForm = this.initForm();
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
         pass: ['', [Validators.required, Validators.minLength(6)]],
         pass2: ['', [Validators.required, Validators.minLength(6)]],
         telefono: ['', [Validators.required, Validators.minLength(8)]],
         email: ['', [Validators.required, Validators.email]],
       });
     }
     
   }
   
   
   
   