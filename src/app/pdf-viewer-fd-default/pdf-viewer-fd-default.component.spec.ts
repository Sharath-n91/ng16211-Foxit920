import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerFdDefaultComponent } from './pdf-viewer-fd-default.component';

describe('PdfViewerFdDefaultComponent', () => {
  let component: PdfViewerFdDefaultComponent;
  let fixture: ComponentFixture<PdfViewerFdDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfViewerFdDefaultComponent]
    });
    fixture = TestBed.createComponent(PdfViewerFdDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
