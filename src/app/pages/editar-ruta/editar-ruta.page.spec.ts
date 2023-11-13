import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EditarRutaPage } from './editar-ruta.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditarRutaPage', () => {
  let component: EditarRutaPage;
  let fixture: ComponentFixture<EditarRutaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, RouterModule],
      providers:[SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
