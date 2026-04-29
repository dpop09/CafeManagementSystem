import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { Admin } from './admin/admin';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'home', component: Home },
    { path: 'admin', component: Admin },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
