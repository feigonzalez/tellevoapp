import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MenurePage } from './menure.page';

describe('MenurePage', () => {
  let component: MenurePage;
  let fixture: ComponentFixture<MenurePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
