import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheterComponent } from './acheter.component';

describe('AlternanceComponent', () => {
  let component: AcheterComponent;
  let fixture: ComponentFixture<AcheterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcheterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
