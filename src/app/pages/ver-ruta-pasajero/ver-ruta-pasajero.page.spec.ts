import { ComponentFixture, TestBed, async } from '@angular/core/testing';


import { VerRutaPasajeroPage } from './ver-ruta-pasajero.page';

describe('VerRutaPasajeroPage', () => {
  let component: VerRutaPasajeroPage;
  let fixture: ComponentFixture<VerRutaPasajeroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerRutaPasajeroPage], 
    }).compileComponents();

    fixture = TestBed.createComponent(VerRutaPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
