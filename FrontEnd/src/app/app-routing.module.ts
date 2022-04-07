import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GroceryListComponent } from './grocery/grocery-list/grocery-list.component';
import { GroceryDetailComponent } from './grocery/grocery-detail/grocery-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', canActivate: [AuthGuard], children: [
      {
        path: '', component: DashboardComponent, children: [
          { path: '', component: GroceryListComponent, pathMatch:"full" },
          { path: 'edit/:grocerylist_id', component: GroceryDetailComponent },
          { path: 'create', component: GroceryDetailComponent },
        ]
      },
    ]
  },
  // { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
