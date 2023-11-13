import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeConductorPage } from './viaje-conductor.page';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ViajeConductorPage', () => {
  let component: ViajeConductorPage;
  let fixture: ComponentFixture<ViajeConductorPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, RouterModule],
      providers:[ SQLite ]
    }).compileComponents();
    fixture = TestBed.createComponent(ViajeConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
