import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { TestComponent } from './feature/components/test/test.component';

const routes: Routes = [
  {path:'',component:TestComponent, canActivate:[AuthGuard]},
  {path:'test',component:TestComponent, canActivate:[AuthGuard]},
  { path: 'account', loadChildren: () => import('./feature/components/account/account.module').then(mod => mod.AccountModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
