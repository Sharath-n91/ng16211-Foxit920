import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetbasedAdDialogComponent } from './setbased-ad-dialog.component';

describe('SetbasedAdDialogComponent', () => {
  let component: SetbasedAdDialogComponent;
  let fixture: ComponentFixture<SetbasedAdDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetbasedAdDialogComponent]
    });
    fixture = TestBed.createComponent(SetbasedAdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
