import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { BuzonConductorPage } from './buzon-conductor.page';

describe('BuzonConductorPage', () => {
  let component: BuzonConductorPage;
  let fixture: ComponentFixture<BuzonConductorPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[SQLite]
    }).compileComponents();
    TestBed.configureTestingModule({
      declarations: [BuzonConductorPage], 
    }).compileComponents();
    
    fixture = TestBed.createComponent(BuzonConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
