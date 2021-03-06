import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TccsComponent } from './tccs.component';

describe('TccsComponent', () => {
  let component: TccsComponent;
  let fixture: ComponentFixture<TccsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TccsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TccsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
