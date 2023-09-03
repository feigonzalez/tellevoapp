import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BuzonPasajeroPage } from './buzon-pasajero.page';

describe('BuzonPasajeroPage', () => {
  let component: BuzonPasajeroPage;
  let fixture: ComponentFixture<BuzonPasajeroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuzonPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
