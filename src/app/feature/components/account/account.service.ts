import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserForRegistrationDto } from 'src/app/shared/models/user/userForRegistrationDto';
import { AuthResponseDto, UserForAuthenticationDto } from 'src/app/shared/models/user/userForAuthenticationDto';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ForgotPassword } from 'src/app/shared/models/user/forgotPassword';
import { ResetPasswordDto } from 'src/app/shared/models/user/resetPasswordDto';
import { CustomEncoder } from 'src/app/shared/customEncoder';
import { TwoFactorDto } from 'src/app/shared/models/user/twoFactorDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAddress = environment.apiUrl;
  private _authChangeSub = new BehaviorSubject<boolean>(false)
  public authChanged = this._authChangeSub.asObservable();
  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }


  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    console.log(this._jwtHelper.decodeToken(token?.toString()))
    let tokenPresent = true;
    if (token === null) {
      tokenPresent = false;
      this.sendAuthStateChangeNotification(false);
    }
    let tokenExpired = this._jwtHelper.isTokenExpired(token?.toString())
    if (tokenExpired) {
      this.sendAuthStateChangeNotification(false);
    }
    return (tokenPresent && !tokenExpired);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  registerUser(user: UserForRegistrationDto) {
    
    return this._http.post(this.urlAddress + "accounts/registration", user);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post<AuthResponseDto>(this.urlAddress + "accounts/login", body);
  }

  public logout() {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public getCurrentUserName() {
    const name = this.decodeJwtToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    return name;
  }
  public getCurrentUserEmail() {
    const email = this.decodeJwtToken()['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return email;
  }
  public getCurrentUserRole() {
    const role = this.decodeJwtToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role;
  }
  private decodeJwtToken() {
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token!);
    return decodedToken;
  }

  public forgotPassword(body: ForgotPassword) {
    return this._http.post(this.urlAddress+"accounts/forgotpassword", body);
  }

  public resetPassword = (body : ResetPasswordDto) => {
    return this._http.post(this.urlAddress+"accounts/resetpassword", body);
  }

  public confirmEmail = (token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    return this._http.get(this.urlAddress +"accounts/emailconfirmation", { params: params });
  }

  public twoStepLogin = ( body: TwoFactorDto) => {
    return this._http.post<AuthResponseDto>(this.urlAddress + "accounts/twostepverification", body);
  }
}
