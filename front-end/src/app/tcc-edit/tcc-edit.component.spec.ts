import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TccEditComponent } from './tcc-edit.component';

describe('TccEditComponent', () => {
  let component: TccEditComponent;
  let fixture: ComponentFixture<TccEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TccEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TccEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
