import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPasajeroPage } from './perfil-pasajero.page';

describe('PerfilPasajeroPage', () => {
  let component: PerfilPasajeroPage;
  let fixture: ComponentFixture<PerfilPasajeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerfilPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
