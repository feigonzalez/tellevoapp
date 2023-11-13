import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPasajeroPage } from './perfil-pasajero.page'; // Cambio de nombre aquí
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PerfilPasajeroPage', () => { // Cambio de nombre aquí
  let component: PerfilPasajeroPage; // Cambio de nombre aquí
  let fixture: ComponentFixture<PerfilPasajeroPage>; // Cambio de nombre aquí

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[ SQLite ]
    }).compileComponents();
    fixture = TestBed.createComponent(PerfilPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
