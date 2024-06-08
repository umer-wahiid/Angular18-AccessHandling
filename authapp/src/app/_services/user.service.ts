import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { loginresp, menu, menupermission, registerconfirm, resetpassword, roles, updatepassword, updateuser, usercred, userregister, users } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  _registerresp = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: ''
  })

  _menuList = signal<menu[]>([]);
  _username = signal('');

  Userregisteration(_data: userregister) {
    return this.http.post(this.baseUrl + 'User/userregisteration', _data)
  }

  Confirmregisteration(_data: registerconfirm) {
    return this.http.post(this.baseUrl + 'User/confirmregisteration', _data)
  }

  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(this.baseUrl + 'Authorize/GenerateToken', _data)
  }

  Loadmenubyrole(role: string) {
    return this.http.get<menu[]>(this.baseUrl + 'UserRole/GetAllMenusbyrole?userrole=' + role)
  }

  Resetpassword(_data: resetpassword) {
    return this.http.post(this.baseUrl + 'User/resetpassword', _data)
  }

  Forgetpassword(username: string) {
    return this.http.get(this.baseUrl + 'User/forgetpassword?username=' + username)
  }

  Updatepassword(_data: updatepassword) {
    return this.http.post(this.baseUrl + 'User/updatepassword', _data)
  }

  Getmenupermission(role: string, menuname: string) {
    return this.http.get<menupermission>(this.baseUrl + 'UserRole/GetMenupermissionbyrole?userrole=' + role + '&menucode=' + menuname)
  }

  GetAll() {
    return this.http.get<users[]>(this.baseUrl + 'User/GetAll');
  }

  GetByCode(code: string) {
    return this.http.get<users>(this.baseUrl + 'User/Getbycode?code=' + code);
  }

  UpdateRole(_data: updateuser) {
    return this.http.post(this.baseUrl + 'User/updaterole', _data);
  }

  UpdateStatus(_data: updateuser) {
    return this.http.post(this.baseUrl + 'User/updatestatus', _data);
  }

  GetAllRoles() {
    return this.http.get<roles[]>(this.baseUrl + 'UserRole/GetAllRoles');
  }
}
