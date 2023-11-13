import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VerRutaPage } from './ver-ruta.page';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CurrencyPipe } from '@angular/common';

describe('VerRutaPage', () => {
  let component: VerRutaPage;
  let fixture: ComponentFixture<VerRutaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, RouterModule, CurrencyPipe],
      providers:[ SQLite ]
    }).compileComponents();
    fixture = TestBed.createComponent(VerRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
