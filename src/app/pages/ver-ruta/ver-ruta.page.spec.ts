import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { VerRutaPage } from './ver-ruta.page';

describe('VerRutaPage', () => {
  let component: VerRutaPage;
  let fixture: ComponentFixture<VerRutaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[ActivatedRoute]
    }).compileComponents();
    fixture = TestBed.createComponent(VerRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
