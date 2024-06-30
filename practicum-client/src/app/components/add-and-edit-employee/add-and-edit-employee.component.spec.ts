import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditEmployeeComponent } from './add-and-edit-employee.component';

describe('EditEmployeeComponent', () => {
  let component: AddAndEditEmployeeComponent;
  let fixture: ComponentFixture<AddAndEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAndEditEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAndEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
