import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilConductorPage } from './perfil-conductor.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PerfilConductorPage', () => {
  let component: PerfilConductorPage;
  let fixture: ComponentFixture<PerfilConductorPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[ SQLite, HttpClient, HttpHandler ]
    }).compileComponents();
    fixture = TestBed.createComponent(PerfilConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
