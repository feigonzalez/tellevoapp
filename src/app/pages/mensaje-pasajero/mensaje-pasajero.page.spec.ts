import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { MensajePasajeroPage } from './mensaje-pasajero.page';

describe('MensajeConductorPage', () => {
  let component: MensajePasajeroPage;
  let fixture: ComponentFixture<MensajePasajeroPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[ RouterTestingModule ],
      providers:[ SQLite ]
    }).compileComponents();
    fixture = TestBed.createComponent(MensajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
