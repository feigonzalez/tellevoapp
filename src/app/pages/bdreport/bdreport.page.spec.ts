import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BdreportPage } from './bdreport.page';

describe('BdreportPage', () => {
  let component: BdreportPage;
  let fixture: ComponentFixture<BdreportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BdreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
