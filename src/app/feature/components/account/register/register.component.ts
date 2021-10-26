
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserForRegistrationDto } from 'src/app/shared/models/user/userForRegistrationDto';
import { AccountService } from '../account.service';
import {PasswordConfirmationValidatorService} from 'src/app/shared/custom-validators/password-confirmation-validator.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _authService: AccountService,  
    private _passConfValidator: PasswordConfirmationValidatorService,
    private _toastr: ToastrService,
    private _router : Router
    ) { }

  public registerForm!: FormGroup;
  ngOnInit(): void {
    this._authService.authChanged.subscribe(res => {
      if(res === true){
          this._router.navigateByUrl('/');
      }
    })
    this.registerForm = new FormGroup({
      firstName: new FormControl,
      lastName: new FormControl,
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
      confirm: new FormControl('')
    })

    if(this.registerForm !==null){
        this.registerForm.get('confirm')?.setValidators([Validators.required, 
    
      this._passConfValidator.validateConfirmPassword(this.registerForm.get('password'))
    ])
    }
  
    
  }


  public validateControl(controlName: string) {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  registerUser(registerFormValue: any) {
    const userRegistration: UserForRegistrationDto = {
      firstName: registerFormValue.firstName,
      lastName: registerFormValue.lastName,
      password: registerFormValue.password,
      confirmPassword: registerFormValue.confirm,
      email: registerFormValue.email,
      clientURI:'http://localhost:4200/account/emailconfirmation'
    }
    this._authService.registerUser(userRegistration).subscribe(r => {
      this._toastr.success("Registration Sucessful ","Please Check your Email")
      this._router.navigateByUrl("account/login")
    })
  }

}
