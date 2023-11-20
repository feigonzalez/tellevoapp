import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ViajePasajeroPage } from './viaje-pasajero.page';

describe('ViajeConductorPage', () => {
  let component: ViajePasajeroPage;
  let fixture: ComponentFixture<ViajePasajeroPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[ RouterTestingModule, RouterModule ],
      providers:[ SQLite ]
    }).compileComponents();
    fixture = TestBed.createComponent(ViajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
