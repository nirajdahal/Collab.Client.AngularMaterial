import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponseDto, UserForAuthenticationDto } from 'src/app/shared/models/user/userForAuthenticationDto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  private _returnUrl!: string;
  constructor(
    private _toastr: ToastrService,
    private _authService: AccountService, 
    private _router: Router, 
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._authService.authChanged.subscribe(res => {
      if(res === true){
          this._router.navigateByUrl('/');
      }
    })


  }

  public validateControl(controlName: string) {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (loginFormValue:any) => {
   
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password,
      clientURI: 'http://localhost:4200/account/forgotpassword'
    }
    this._authService.loginUser('api/accounts/login', userForAuth)
    .subscribe((res:any) => {
      if(res.is2StepVerificationRequired) {
        this._router.navigate(['/account/twostepverification'], 
          { queryParams: { returnUrl: this._returnUrl, provider: res.provider, email: userForAuth.email }});
      }
      else {
        localStorage.setItem("token", res.token);
        this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this._router.navigate([this._returnUrl]);
      }
     
       
    })
  }

}
