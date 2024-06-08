import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { roles, updateuser, users } from '../../_model/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-userupdate',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './userupdate.component.html',
  styleUrl: './userupdate.component.css'
})

export class UserupdateComponent implements OnInit {

  dialogdata: any;
  _response: any;
  userdata!: users;
  rolelist!: roles[];
  type = '';

  constructor(private builder: FormBuilder, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any, private service: UserService, private ref: MatDialogRef<UserupdateComponent>, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadRoleList();
    this.dialogdata = this.data;
    this.type = this.dialogdata.type;
    if (this.dialogdata.username !== '') {
      this.service.GetByCode(this.dialogdata.username).subscribe(item => {
        this.userdata = item;
        this.userform.setValue({ username: this.userdata.username, role: this.userdata.role, status: this.userdata.isactive })
      })
    }
  }

  loadRoleList() {
    this.service.GetAllRoles().subscribe(item => {
      this.rolelist = item;
    })
  }

  userform = this.builder.group({
    username: this.builder.control({ value: '', disabled: true }),
    role: this.builder.control('', Validators.required),
    status: this.builder.control(true)
  })

  proceedChange() {
    if (this.userform.valid) {
      let _obj: updateuser = {
        username: this.dialogdata.username,
        role: this.userform.value.role as string,
        status: this.userform.value.status as boolean
      }
      if (this.type === 'role') {
        this.service.UpdateRole(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Role Updated')
            this.closepopup();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Role Update')
          }
        });
      }
      else {
        this.service.UpdateStatus(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Status Updated')
            this.closepopup();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Status Update')
          }
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}