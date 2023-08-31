import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RegistrocPage } from './registroc.page';

describe('RegistrocPage', () => {
  let component: RegistrocPage;
  let fixture: ComponentFixture<RegistrocPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
