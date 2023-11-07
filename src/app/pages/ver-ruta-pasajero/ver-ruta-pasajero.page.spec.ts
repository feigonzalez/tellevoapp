import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { VerRutaPasajeroPage } from './ver-ruta-pasajero.page';

describe('VerRutaPasajeroPage', () => {
  let component: VerRutaPasajeroPage;
  let fixture: ComponentFixture<VerRutaPasajeroPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[ActivatedRoute]
    }).compileComponents();

    fixture = TestBed.createComponent(VerRutaPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
