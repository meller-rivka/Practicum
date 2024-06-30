import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditRoleComponent } from './add-and-edit-role.component';

describe('AddAndEditRoleComponent', () => {
  let component: AddAndEditRoleComponent;
  let fixture: ComponentFixture<AddAndEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAndEditRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAndEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
