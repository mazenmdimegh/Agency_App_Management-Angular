import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreManagerComponent } from './offre-manager.component';

describe('OffreManagerComponent', () => {
  let component: OffreManagerComponent;
  let fixture: ComponentFixture<OffreManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
