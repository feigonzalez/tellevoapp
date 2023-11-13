import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPasajeroPage } from './inicio-pasajero.page'; // Cambio de nombre aquí
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('InicioPasajeroPage', () => { // Cambio de nombre aquí
  let component: InicioPasajeroPage; // Cambio de nombre aquí
  let fixture: ComponentFixture<InicioPasajeroPage>; // Cambio de nombre aquí

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler,SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(InicioPasajeroPage); // Cambio de nombre aquí
    component = fixture.componentInstance; // Cambio de nombre aquí
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
