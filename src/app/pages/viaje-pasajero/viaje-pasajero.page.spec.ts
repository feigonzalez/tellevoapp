import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajePasajeroPage } from './viaje-pasajero.page';

describe('ViajeConductorPage', () => {
  let component: ViajePasajeroPage;
  let fixture: ComponentFixture<ViajePasajeroPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ViajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
