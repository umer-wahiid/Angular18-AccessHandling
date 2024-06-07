import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../_services/customer.service';
import { customer } from '../../_model/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { menupermission } from '../../_model/user.model';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  customerlist!: customer[];

  displayColumns: string[] = [
    "code",
    "name",
    "email",
    "phone",
    "creditlimit",
    "statusname",
    "action"
  ];
  datasource: any;
  _permission: menupermission = {
    code: '',
    name: '',
    haveview: false,
    haveadd: false,
    haveedit: false,
    havedelete: false
  };

  constructor(private service: CustomerService, private userservice: UserService, private toastr: ToastrService) {
    this.Setaccess();
  }

  ngOnInit(): void {
    this.LoadCustomer();
  }

  Setaccess() {
    let role = localStorage.getItem('userrole') as string;
    this.userservice.Getmenupermission(role, 'customer').subscribe(item => {
      this._permission = item;
      console.log(this._permission);
    })
  }

  LoadCustomer() {
    this.service.GetAll().subscribe(item => {
      this.customerlist = item;
      this.datasource = new MatTableDataSource<customer>(this.customerlist);
    })
  }

  functionedit(code: string) {
    if (this._permission.haveedit) {

    } else {
      this.toastr.warning('Access denied', 'warning')
    }
  }

  functiondelete(code: string) {
    if (this._permission.havedelete) {

    } else {
      this.toastr.warning('Access denied', 'warning')
    }
  }
}
