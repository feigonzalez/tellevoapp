import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MensajePasajeroPage } from './mensaje-pasajero.page';

describe('MensajeConductorPage', () => {
  let component: MensajePasajeroPage;
  let fixture: ComponentFixture<MensajePasajeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MensajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
