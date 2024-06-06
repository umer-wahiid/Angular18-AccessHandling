import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../_services/customer.service';
import { customer } from '../../_model/customer.model';
import { MatTableDataSource } from '@angular/material/table';

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
    "isActive",
    "statusname"
  ]
  datasource:any;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.LoadCustomer();
  }

  LoadCustomer() {
    this.service.GetAll().subscribe(item => {
      this.customerlist = item;
      console.log(this.customerlist);
      this.datasource=new MatTableDataSource<customer>(this.customerlist);
    })
  }

}
