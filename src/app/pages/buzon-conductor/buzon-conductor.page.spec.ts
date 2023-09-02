import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuzonConductorPage } from './buzon-conductor.page';

describe('BuzonConductorPage', () => {
  let component: BuzonConductorPage;
  let fixture: ComponentFixture<BuzonConductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuzonConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
