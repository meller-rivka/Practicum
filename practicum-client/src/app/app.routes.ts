import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent},
    { path: 'employee', loadChildren: () => import('./employee.routes').then(m => m.EmployeeRoutes) },
    { path: '**', component:NotFoundComponent }
  
   
];
