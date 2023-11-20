import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { VerRutaPasajeroPage } from './ver-ruta-pasajero.page';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('VerRutaPasajeroPage', () => {
  let component: VerRutaPasajeroPage;
  let fixture: ComponentFixture<VerRutaPasajeroPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, RouterModule],
      providers:[SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(VerRutaPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
