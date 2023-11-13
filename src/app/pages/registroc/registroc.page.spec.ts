import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrocPage } from './registroc.page';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RegistrocPage', () => {
  let component: RegistrocPage;
  let fixture: ComponentFixture<RegistrocPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[ MatSnackBar, SQLite ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistrocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
