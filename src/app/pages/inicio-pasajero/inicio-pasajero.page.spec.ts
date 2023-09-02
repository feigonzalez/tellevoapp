import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { InicioPasajeroPage } from './inicio-pasajero.page';

describe('InicioPasajeroPage', () => {
  let component: InicioPasajeroPage;
  let fixture: ComponentFixture<InicioPasajeroPage>;

  beforeEach(async(function (): void {
    fixture = TestBed.createComponent(InicioPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
