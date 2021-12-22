import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoptrainingDialogueComponent } from './stoptraining-dialogue.component';

describe('StoptrainingDialogueComponent', () => {
  let component: StoptrainingDialogueComponent;
  let fixture: ComponentFixture<StoptrainingDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoptrainingDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoptrainingDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
