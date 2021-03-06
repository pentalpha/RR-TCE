import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TccPageComponent } from './tcc-page.component';

describe('TccPageComponent', () => {
  let component: TccPageComponent;
  let fixture: ComponentFixture<TccPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TccPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TccPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
