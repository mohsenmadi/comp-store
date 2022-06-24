import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnMapsComponent } from './on-maps.component';

describe('OnMapsComponent', () => {
  let component: OnMapsComponent;
  let fixture: ComponentFixture<OnMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnMapsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
