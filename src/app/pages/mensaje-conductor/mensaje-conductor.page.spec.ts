import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MensajeConductorPage } from './mensaje-conductor.page';

describe('MensajeConductorPage', () => {
  let component: MensajeConductorPage;
  let fixture: ComponentFixture<MensajeConductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MensajeConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
