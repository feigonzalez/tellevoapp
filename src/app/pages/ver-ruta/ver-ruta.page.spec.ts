import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { VerRutaPage } from './ver-ruta.page';

describe('VerRutaPage', () => {
  let component: VerRutaPage;
  let fixture: ComponentFixture<VerRutaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
