import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { InicioConductorPage } from './inicio-conductor.page';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('InicioConductorPage', () => {
  let component: InicioConductorPage;
  let fixture: ComponentFixture<InicioConductorPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[SQLite, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
