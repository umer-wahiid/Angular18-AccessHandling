import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  GetAll() {
    return this.http.get<customer[]>(this.baseUrl + 'Customer/GetAll');
  }

}