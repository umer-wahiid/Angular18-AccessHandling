import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { userregister } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseUrl=environment.apiUrl;

  Userregisteration(_data:userregister){
    return this.http.post(this.baseUrl+'User/userregisteration',_data)
  }
}
