import { ComponentFixture, TestBed} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AdministrarViajePage } from './administrar-viaje.page';

describe('AdministrarViajePage', () => {
  let component: AdministrarViajePage;
  let fixture: ComponentFixture<AdministrarViajePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[SQLite,ActivatedRoute]
    }).compileComponents();
    fixture = TestBed.createComponent(AdministrarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
