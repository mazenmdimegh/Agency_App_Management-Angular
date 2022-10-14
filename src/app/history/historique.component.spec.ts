import { ComponentFixture, TestBed } from '@angular/core/testing';

import { historiqueComponent } from './historique.component';

describe('historyComponent', () => {
  let component: historiqueComponent;
  let fixture: ComponentFixture<historiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ historiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(historiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
