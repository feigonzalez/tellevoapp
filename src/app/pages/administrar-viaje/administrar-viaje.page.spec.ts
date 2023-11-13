import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AdministrarViajePage } from './administrar-viaje.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdministrarViajePage', () => {
  let component: AdministrarViajePage;
  let fixture: ComponentFixture<AdministrarViajePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, RouterModule],
      providers:[SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(AdministrarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
