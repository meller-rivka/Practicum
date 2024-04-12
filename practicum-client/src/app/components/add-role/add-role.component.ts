import { Component, Input, Inject } from '@angular/core';
import { Role } from '../../Entities/Role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

export interface DialogData {
  roleName: string;
  startRole: string;
  manager: string;
} 

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,MatSelectModule,
    MatDialogClose,MatButtonToggleModule
  ],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {

  roles:Role[]=[];
  visible: boolean = true;
constructor( public dialogRef: MatDialogRef<AddRoleComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
) {}

onNoClick(): void {
  this.dialogRef.close();
}
}
