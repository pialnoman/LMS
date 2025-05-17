import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEnrollmentComponent } from './my-enrollment.component';

describe('MyEnrollmentComponent', () => {
  let component: MyEnrollmentComponent;
  let fixture: ComponentFixture<MyEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyEnrollmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
