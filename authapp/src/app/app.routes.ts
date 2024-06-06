import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ConfirmotpComponent } from './component/confirmotp/confirmotp.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { UpdatepasswordComponent } from './component/updatepassword/updatepassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { CustomerComponent } from './component/customer/customer.component';
import { UserComponent } from './component/user/user.component';
import { authGuard } from './_guard/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'confirmotp', component: ConfirmotpComponent },
    { path: 'forgetpassword', component: ForgetpasswordComponent },
    { path: 'updatepassword', component: UpdatepasswordComponent },
    { path: 'resetpassword', component: ResetpasswordComponent },
    { path: 'customer', component: CustomerComponent, canActivate: [authGuard] },
    { path: 'user', component: UserComponent, canActivate: [authGuard] }
];
