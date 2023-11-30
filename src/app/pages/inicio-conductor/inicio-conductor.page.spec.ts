import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { InicioConductorPage } from './inicio-conductor.page';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('InicioConductorPage', () => {
  let component: InicioConductorPage;
  let fixture: ComponentFixture<InicioConductorPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, RouterModule],
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
