import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuzonPasajeroPage } from './buzon-pasajero.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('BuzonPasajeroPage', () => {
  let component: BuzonPasajeroPage;
  let fixture: ComponentFixture<BuzonPasajeroPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(BuzonPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
