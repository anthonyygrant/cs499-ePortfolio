import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyfillTestComponent } from './polyfill-test.component';

describe('PolyfillTestComponent', () => {
  let component: PolyfillTestComponent;
  let fixture: ComponentFixture<PolyfillTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolyfillTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolyfillTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
