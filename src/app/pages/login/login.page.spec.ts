import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
