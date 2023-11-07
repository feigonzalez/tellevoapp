import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RegistropPage } from './registrop.page';

describe('RegistropPage', () => {
  let component: RegistropPage;
  let fixture: ComponentFixture<RegistropPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[MatSnackBar,SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
