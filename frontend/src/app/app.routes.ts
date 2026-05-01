import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { Users } from './users/users';
import { Categories } from './categories/categories';
import { Products } from './products/products';
import { Bills } from './bills/bills';
import { adminGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'home', component: Home },
    { path: 'admin', component: Admin, canActivate: [adminGuard] },
    { path: 'admin/users', component: Users, canActivate: [adminGuard] },
    { path: 'admin/categories', component: Categories, canActivate: [adminGuard] },
    { path: 'admin/products', component: Products, canActivate: [adminGuard] },
    { path: 'admin/bills', component: Bills, canActivate: [adminGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
