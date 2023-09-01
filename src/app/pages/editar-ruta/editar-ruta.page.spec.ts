import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRutaPage } from './editar-ruta.page';

describe('EditarRutaPage', () => {
  let component: EditarRutaPage;
  let fixture: ComponentFixture<EditarRutaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
