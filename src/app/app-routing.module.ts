import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { 
    path: '', redirectTo: 'user-list', pathMatch: 'full'
  },
  { 
    path: 'user-list', component: UserListComponent, data: { animation: 'UsersListPage' }
  },
  { 
    path: 'user-details/:id', component: UserDetailsComponent, data: { animation: 'UserDetailsPage' }
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
