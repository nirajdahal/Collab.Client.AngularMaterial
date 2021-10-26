import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';

const routes : Routes =[
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'forgotpassword', component: ForgotPasswordComponent},
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'emailconfirmation', component: EmailConfirmationComponent },
  { path: 'twostepverification', component: TwoStepVerificationComponent }

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
