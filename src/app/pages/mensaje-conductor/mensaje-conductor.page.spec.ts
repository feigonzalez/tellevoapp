import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensajeConductorPage } from './mensaje-conductor.page';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('MensajeConductorPage', () => {
  let component: MensajeConductorPage;
  let fixture: ComponentFixture<MensajeConductorPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[ RouterTestingModule ],
      providers:[ SQLite ]
    }).compileComponents();
    fixture = TestBed.createComponent(MensajeConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
