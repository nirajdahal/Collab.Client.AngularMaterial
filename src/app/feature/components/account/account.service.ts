import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserForRegistrationDto } from 'src/app/shared/models/user/userForRegistrationDto';
import { AuthResponseDto, UserForAuthenticationDto } from 'src/app/shared/models/user/userForAuthenticationDto';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAddress = environment.apiUrl;
  private _authChangeSub = new BehaviorSubject<boolean>(false)
  public authChanged = this._authChangeSub.asObservable();
  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) { }


  public isUserAuthenticated = (): boolean => {
    var token = localStorage.getItem("token");
    console.log(this._jwtHelper.decodeToken(token?.toString()))
    let tokenPresent = true; 
    if(token === null){
      tokenPresent = false;
    }
    let tokenExpired = this._jwtHelper.isTokenExpired(token?.toString())
    console.log("tokenPresent", tokenPresent)
    console.log("tokenExpired", tokenExpired )
    console.log(tokenPresent && !tokenExpired)
    return (tokenPresent && !tokenExpired) ;
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  registerUser(user: UserForRegistrationDto){
    return this._http.post(this.urlAddress+"accounts/registration", user);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this._http.post<AuthResponseDto>(this.urlAddress+"accounts/login", body).pipe(
      map((res: AuthResponseDto) => {
        localStorage.setItem("token", res.token);
       
       this.sendAuthStateChangeNotification(true);
      })
    )
    ;
  }

  public getCurrentUserValue(){
    return this._authChangeSub.value;
  }

}
