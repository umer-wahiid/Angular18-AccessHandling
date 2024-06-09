import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Form, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_services/user.service';
import { menu, menupermission, menus, roles } from '../../_model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userrole',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './userrole.component.html',
  styleUrl: './userrole.component.css'
})
export class UserroleComponent implements OnInit {

  rolelist!: roles[];
  menulist!: menus[];
  accessArray!: FormArray<any>;
  useraccess!: menupermission;
  _response: any;

  roleform = this.builder.group({
    userrole: this.builder.control('', Validators.required),
    access: this.builder.array([])
  })

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: UserService) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadMenus('');
  }

  loadRoles() {
    this.service.GetAllRoles().subscribe(item => {
      this.rolelist = item;
    })
  }

  loadMenus(userrole: string) {
    this.accessArray = this.roleform.get('access') as FormArray;
    this.accessArray.clear();
    this.service.GetAllMenus().subscribe(item => {
      this.menulist = item;
      if (this.menulist.length > 0) {
        this.menulist.map((o: menus) => {
          if (userrole != '') {
            this.service.Getmenupermission(userrole, o.code).subscribe(item => {
              this.useraccess = item;
              this.addNewRow(o, this.useraccess, userrole);
            })
          } else {
            this.addNewRow(o, {
              code: '',
              name: '',
              haveview: false,
              haveadd: false,
              haveedit: false,
              havedelete: false,
              userrole: '',
              menucode: ''
            }, '');
          }
        })
      }
    })
  }

  generateMenuRows(input: menus, _access: menupermission, role: string) {
    return this.builder.group({
      menucode: this.builder.control(input.code),
      haveview: this.builder.control(_access.haveview),
      haveadd: this.builder.control(_access.haveadd),
      haveedit: this.builder.control(_access.haveedit),
      havedelete: this.builder.control(_access.havedelete),
      userrole: this.builder.control(role)
    })
  }

  addNewRow(input: menus, _access: menupermission, role: string) {
    this.accessArray.push(this.generateMenuRows(input, _access, role));
  }

  get getRows() {
    return this.roleform.get('access') as FormArray;
  }

  roleChange(event: any) {
    let selectedRole = event.value;
    this.loadMenus(selectedRole);
  }

  SaveRoles() {
    if (this.roleform.valid) {
      let formarray = this.roleform.value.access as menupermission[];
      // formarray.map((o: menupermission) => {
      //   o.userrole = this.roleform.value.userrole as string
      // })
      this.service.AssignRolePermission(formarray).subscribe(item => {
        this._response = item;
        if (this._response.result == 'pass') {
          this.toastr.success('Permissions assigned successfully', 'Saved');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Menu access assignment.');
        }
      })
    }
  }

}
