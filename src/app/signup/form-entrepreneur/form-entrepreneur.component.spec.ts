import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntrepreneurComponent } from './form-entrepreneur.component';

describe('FormEntrepreneurComponent', () => {
  let component: FormEntrepreneurComponent;
  let fixture: ComponentFixture<FormEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntrepreneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
