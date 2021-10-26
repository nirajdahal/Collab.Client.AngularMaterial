import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';

const routes : Routes =[
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'forgotpassword', component: ForgotPasswordComponent},
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'emailconfirmation', component: EmailConfirmationComponent }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AccountRoutingModule { }
